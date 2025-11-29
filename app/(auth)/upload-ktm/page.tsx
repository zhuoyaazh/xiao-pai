"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import Image from "next/image";

export default function UploadKTMPage() {
  const router = useRouter();
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [ktmFile, setKTMFile] = useState<File | null>(null);
  const [selfiePreview, setSelfiePreview] = useState("");
  const [ktmPreview, setKTMPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const selfieRef = useRef<HTMLInputElement>(null);
  const ktmRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "selfie" | "ktm") => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran file maksimal 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const preview = reader.result as string;
      if (type === "selfie") {
        setSelfieFile(file);
        setSelfiePreview(preview);
      } else {
        setKTMFile(file);
        setKTMPreview(preview);
      }
    };
    reader.readAsDataURL(file);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!selfieFile || !ktmFile) {
      setError("Upload kedua foto terlebih dahulu");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("selfie", selfieFile);
      formData.append("ktm", ktmFile);

      const response = await fetch("/api/users/me/upload-ktm", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Gagal upload KTM");
      }

      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-xiao-pink/10 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-xiao-pink mb-2">小派</h1>
          <p className="text-gray-600 dark:text-gray-400">Verifikasi Kartu Tanda Mahasiswa</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="p-3 bg-xiao-red/10 border border-xiao-red text-xiao-red rounded-lg text-sm">{error}</div>}

          {/* Selfie Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Foto Selfie</CardTitle>
              <CardDescription>Selfie dengan jelas menunjukkan wajah Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selfiePreview && (
                <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image src={selfiePreview} alt="Selfie preview" fill className="object-cover" />
                </div>
              )}
              <input
                ref={selfieRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "selfie")}
                className="hidden"
              />
              <Button type="button" variant="outline" className="w-full" onClick={() => selfieRef.current?.click()}>
                {selfieFile ? "Ubah Foto" : "Pilih Foto"}
              </Button>
            </CardContent>
          </Card>

          {/* KTM Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Foto Kartu Tanda Mahasiswa</CardTitle>
              <CardDescription>Foto jelas KTM Anda (depan) yang menunjukkan wajah dan data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {ktmPreview && (
                <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image src={ktmPreview} alt="KTM preview" fill className="object-cover" />
                </div>
              )}
              <input
                ref={ktmRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "ktm")}
                className="hidden"
              />
              <Button type="button" variant="outline" className="w-full" onClick={() => ktmRef.current?.click()}>
                {ktmFile ? "Ubah Foto" : "Pilih Foto"}
              </Button>
            </CardContent>
          </Card>

          <div className="bg-xiao-blue/10 border border-xiao-blue p-4 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              📝 <strong>Catatan:</strong> Tim kami akan memverifikasi KTM Anda dalam 24 jam. Pastikan foto jelas dan terlihat semua data Anda.
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={loading || !selfieFile || !ktmFile}>
            {loading ? "Mengunggah..." : "Upload dan Lanjut"}
          </Button>
        </form>
      </div>
    </div>
  );
}
