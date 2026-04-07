import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../api";
import { isAxiosError } from "axios";

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.toString();
    const url = search ? `/locations?${search}` : "/locations";

    const apiRes = await api.get(url);

    return NextResponse.json(apiRes.data);
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

export async function POST(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";

    const formData = await req.formData();

    const apiRes = await api.post("/locations", formData, {
      headers: {
        cookie: cookieHeader,
      },
    });

    const clientResponse = NextResponse.json(apiRes.data);

    const setCookie = apiRes.headers["set-cookie"];
    if (setCookie) {
      const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];
      cookies.forEach((cookie) => {
        clientResponse.headers.append("set-cookie", cookie);
      });
    }

    return clientResponse;
  } catch (error: unknown) {
    console.error(
      "Next.js Proxy Error:",
      isAxiosError(error) ? error.message : "Unknown error",
    );
    return NextResponse.json(
      {
        error:
          (isAxiosError(error) && error.response?.data?.error) ||
          (error instanceof Error ? error.message : null) ||
          "Помилка сервера",
      },
      { status: (isAxiosError(error) && error.response?.status) || 500 },
    );
  }
}
