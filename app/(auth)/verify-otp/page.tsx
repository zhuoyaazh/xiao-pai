"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function VerifyOTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(600); // 10 minutes
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!email) router.push("/signup");

    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [email, router]);

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (otp.length !== 6) {
      setError("OTP harus 6 digit");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "OTP salah");
      }

      router.push("/upload-ktm");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("Gagal mengirim ulang OTP");
      setTimer(600);
      setOtp("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const isExpired = timer === 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-xiao-pink/10 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="card-xiao w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-xiao-pink mb-2">小派</h1>
          <p className="text-gray-600 dark:text-gray-400">Verifikasi OTP</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{email}</p>
        </div>

        <form onSubmit={handleVerifyOTP} className="space-y-4">
          {error && <div className="p-3 bg-xiao-red/10 border border-xiao-red text-xiao-red rounded-lg text-sm">{error}</div>}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kode OTP</label>
            <Input
              type="text"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              maxLength={6}
              disabled={isExpired}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Kadaluarsa dalam: {minutes}:{seconds.toString().padStart(2, "0")}
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={loading || isExpired}>
            {loading ? "Memverifikasi..." : "Verifikasi"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Button variant="ghost" size="sm" onClick={handleResendOTP} disabled={loading || !isExpired}>
            Kirim Ulang OTP
          </Button>
        </div>
      </div>
    </div>
  );
}
