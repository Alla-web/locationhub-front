import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { logErrorResponse } from "../../../_utils/utils";
import { api } from "../../../api";
import { isAxiosError } from "axios";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  // 2. ВИКОРИСТОВУЄМО ТИП Props ОСЬ ТУТ
  { params }: Props,
) {
  try {
    const cookieStore = await cookies();
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "6";

    const { id } = await params;

    const res = await api(`/api/users/${id}/places`, {
      params: {
        page,
        limit,
      },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
