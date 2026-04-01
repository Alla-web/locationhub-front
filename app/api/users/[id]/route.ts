import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const cookieStore = await cookies();

  try {
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`;

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: { Cookie: cookieStore.toString() },
    });

    const data = await response.json();

    if (!response.ok)
      return NextResponse.json(data, { status: response.status });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
