import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../../../api";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await req.json();
    const cookieHeader = req.headers.get("cookie") || "";

    const payload = {
      ...body,
      locationId: id,
    };

    const apiRes = await api.post("/feedbacks", payload, {
      headers: {
        cookie: cookieHeader,
      },
    });

    return NextResponse.json(apiRes.data, { status: 201 });
  } catch (error) {
    const err = error as ApiError;

    return NextResponse.json(
      {
        error: err.response?.data?.error ?? err.message,
      },
      {
        status: err.response?.status || 500,
      },
    );
  }
}
