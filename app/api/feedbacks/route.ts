import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../api";

// GET /feedbacks
export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.toString();
    const url = search ? `/feedbacks?${search}` : "/feedbacks";

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
