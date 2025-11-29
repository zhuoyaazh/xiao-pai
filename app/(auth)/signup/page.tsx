"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email.endsWith(".ac.id")) {
      setError("Gunakan email institusi (.ac.id)");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Gagal mengirim OTP");
      }

      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-xiao-pink/10 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="card-xiao w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-xiao-pink mb-2">小派</h1>
          <p className="text-gray-600 dark:text-gray-400">Daftar dengan email institusi</p>
        </div>

        <form onSubmit={handleSendOTP} className="space-y-4">
          {error && <div className="p-3 bg-xiao-red/10 border border-xiao-red text-xiao-red rounded-lg text-sm">{error}</div>}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Institusi</label>
            <Input
              type="email"
              placeholder="nama@universitas.ac.id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Harus menggunakan domain .ac.id</p>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Mengirim..." : "Kirim OTP"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-xiao-pink hover:underline font-medium">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
