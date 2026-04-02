import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { api, ApiError } from "../../api";

export async function POST(req: NextRequest) {
  try {
    // беремо cookies з запиту
    const cookieHeader = req.headers.get("cookie");

    const apiRes = await api.post("/auth/refresh", null, {
      headers: {
        cookie: cookieHeader || "",
      },
    });

    const res = NextResponse.json(apiRes.data);

    // прокидуємо нові cookies (access / refresh)
    const setCookie = apiRes.headers["set-cookie"];

    if (setCookie) {
      if (Array.isArray(setCookie)) {
        setCookie.forEach((cookie) => {
          res.headers.append("set-cookie", cookie);
        });
      } else {
        res.headers.set("set-cookie", setCookie);
      }
    }

    return res;
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
