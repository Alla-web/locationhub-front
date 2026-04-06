// import { NextResponse } from "next/server";
import { api, ApiError } from "../../api";
// import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";

export async function GET() {
  const cookieStore = await cookies();

  try {
    const { data } = await api.get("/users/me", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data?.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    // Дістаємо FormData, яку прислав фронтенд
    const formData = await request.formData();

    const res = await api.patch("/users/edit", formData, {
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "multipart/form-data",
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Помилка бекенду при апдейті:", error.response?.data);
      return NextResponse.json(
        { error: error.response?.data?.message || "Помилка оновлення профілю" },
        { status: error.response?.status || 500 },
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
