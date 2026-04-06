import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../../../api";

interface RouteContext {
  params: Promise<{
    locationId: string;
  }>;
}

export async function POST(req: NextRequest, { params }: RouteContext) {
  try {
    const { locationId } = await params;
    const cookieHeader = req.headers.get("cookie") || "";
    const body = await req.json();
    const payload = {
      locationId,
      rate: body.rate,
      description: body.description,
    };

    const apiRes = await api.post("/feedbacks", payload, {
      headers: {
        cookie: cookieHeader,
      },
    });

    const res = NextResponse.json(apiRes.data, { status: 201 });

    const setCookie = apiRes.headers["set-cookie"];
    if (setCookie) {
      const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];
      cookies.forEach((cookie) => {
        res.headers.append("set-cookie", cookie);
      });
    }

    return res;
  } catch (error) {
    const err = error as ApiError;
    const data = err.response?.data as {
      error?: string;
      message?: string;
      errors?: Array<{ message?: string }>;
    };

    return NextResponse.json(
      {
        error: data?.error ?? data?.message ?? err.message,
        message: data?.message ?? data?.error ?? err.message,
        errors: data?.errors ?? [],
      },
      {
        status: err.response?.status || 500,
      },
    );
  }
}
