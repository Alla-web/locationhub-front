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
    const body = await req.json();

    const payload = {
      locationId,
      rate: body.rate,
      description: body.description,
    };

    const apiRes = await api.post("/feedbacks", payload);

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
