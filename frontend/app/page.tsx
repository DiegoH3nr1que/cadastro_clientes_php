"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/clientes");
  };

  return (
    <main className="h-screen bg-foreground flex items-center justify-center">
      <button
        onClick={handleRedirect}
        className="bg-blue-400 text-black font-sans px-6 py-3 rounded"
      >
        Cadastrar seus clientes
      </button>
    </main>
  );
}
