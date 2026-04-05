"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((state) => state.user);
  const isAuthReady = useAuthStore((state) => state.isAuthReady);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
     const isPublicProfile =
     pathname.startsWith("/profile/") && pathname.length > 9;

    const isPrivateProfile = pathname === "/profile";

    if (isAuthReady && !user && isPrivateProfile) {
      router.push("/login");
    }
  }, [isAuthReady, user, router, pathname]);

  if (!isAuthReady && pathname === "/profile") {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        Перевірка доступу...
      </div>
    );
  }

  return <div className="layout-wrapper">{children}</div>;
}
