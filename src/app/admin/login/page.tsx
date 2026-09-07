import Image from "next/image";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata = {
  title: "Entrar | Admin Multiplic",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-neutral-50 px-6 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
        <div className="flex justify-center">
          <Image
            src="/brand/symbol.png"
            alt="Multiplic Imóveis"
            width={56}
            height={56}
          />
        </div>
        <h1 className="mt-4 text-center font-heading text-xl font-bold text-brand-gray">
          Painel administrativo
        </h1>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
