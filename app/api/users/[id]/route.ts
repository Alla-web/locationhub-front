// import { NextRequest, NextResponse } from "next/server";
// import { cookies } from "next/headers";

// export async function GET(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   const { id } = await params;
//   const cookieStore = await cookies();

//   try {
//     const backendUrl = `${process.env.BACKEND_URL}/api/users/${id}`;

//     const response = await fetch(backendUrl, {
//       method: "GET",
//       headers: { Cookie: cookieStore.toString() },
//     });

//     const data = await response.json();

//     if (!response.ok)
//       return NextResponse.json(data, { status: response.status });
//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 },
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { logErrorResponse } from "../../_utils/utils";
import { api } from "../../api";
import { isAxiosError } from "axios";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { id } = await params;
    const res = await api(`/api/users/${id}`, {
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
