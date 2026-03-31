import { nextServer } from "./api"; // Або імпортуй api, якщо nextServer падає з відносним шляхом
import { cookies } from "next/headers";
import { RegisterPayload } from "@/types/user";
import { AxiosResponse } from "axios";

export const checkSession =
  async (): Promise<AxiosResponse<RegisterPayload> | null> => {
    try {
      const cookieStore = await cookies();

      const res = await nextServer.post<RegisterPayload>(
        "/auth/refresh",
        {},
        {
          headers: {
            Cookie: cookieStore.toString(),
          },
        },
      );

      return res;
    } catch (error) {
      console.log("Серверна перевірка: Сесія відсутня (користувач гість)");
      return null;
    }
  };
