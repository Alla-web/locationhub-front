import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();

  try {
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`;

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Помилка проксі-запиту рефрешу:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
