import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";

export async function POST() {
  const cookieStore = await cookies();
  await api.post("auth/logout", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  //опрацювати помилки - помилка, що прийшла з беку - опрацювали і відобразили цю конкретну помилку

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  return NextResponse.json({ message: "Logged out successfully" });
}
