"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const isAuthenticated = false;

  const handleProtectedAction = () => {
    if (!isAuthenticated) {
      router.push("/auth-prompt");
      return;
    }

    console.log("Protected action");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <div>
        <h1>Location - simple and efficient application design</h1>

        <p>
          Discover locations quickly and manage your experience in a convenient
          and modern interface.
        </p>

        <button
          type="button"
          onClick={handleProtectedAction}
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#c85a2e",
            color: "#fff",
          }}
        >
          Спробувати захищену дію
        </button>
      </div>
    </main>
  );
}