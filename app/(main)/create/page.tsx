"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

const CATEGORIES = ["Makanan", "Barang", "Layanan", "Kos", "Tiket", "Lainnya"];

export default function CreatePOPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "Makanan",
    description: "",
    price: "",
    minQty: "1",
    maxQty: "10",
    deadline: "",
    needsDriver: false,
    driverSlotsNeeded: "1",
    needsHelper: false,
    helperNeeded: "1",
    helperRatePerPerson: "0",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/po", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseInt(formData.price) * 100, // Convert to cents
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Gagal membuat PO");
      }

      const { id } = await response.json();
      router.push(`/browse/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-xiao-pink/5 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Buat Open PO</h1>
          <p className="text-gray-600 dark:text-gray-400">Ajak teman dan hemat bersama</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="p-3 bg-xiao-red/10 border border-xiao-red text-xiao-red rounded-lg text-sm">{error}</div>}

          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Dasar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Judul</label>
                <Input name="title" value={formData.title} onChange={handleChange} placeholder="Apa yang dijual?" required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Kategori</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 dark:bg-gray-800 dark:border-gray-600"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Jelaskan produk..."
                  className="w-full border border-gray-300 rounded-lg p-2 dark:bg-gray-800 dark:border-gray-600"
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Harga & Jumlah</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Harga per Unit (Rp)</label>
                <Input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Min Qty</label>
                  <Input name="minQty" type="number" value={formData.minQty} onChange={handleChange} min="1" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Max Qty</label>
                  <Input name="maxQty" type="number" value={formData.maxQty} onChange={handleChange} min="1" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Deadline PO</label>
                <Input name="deadline" type="datetime-local" value={formData.deadline} onChange={handleChange} required />
              </div>
            </CardContent>
          </Card>

          {/* Driver */}
          <Card>
            <CardHeader>
              <CardTitle>Butuh Driver? (Big Split)</CardTitle>
              <CardDescription>Pencarian driver untuk pengiriman</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="needsDriver" checked={formData.needsDriver} onChange={handleChange} />
                <span className="text-sm">Ya, saya butuh driver</span>
              </label>

              {formData.needsDriver && (
                <div>
                  <label className="block text-sm font-medium mb-1">Jumlah Driver Slot</label>
                  <Input
                    name="driverSlotsNeeded"
                    type="number"
                    value={formData.driverSlotsNeeded}
                    onChange={handleChange}
                    min="1"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Helper */}
          <Card>
            <CardHeader>
              <CardTitle>Butuh Asisten? (Helper Job)</CardTitle>
              <CardDescription>Pembayaran langsung setelah pekerjaan selesai</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="needsHelper" checked={formData.needsHelper} onChange={handleChange} />
                <span className="text-sm">Ya, saya butuh asisten</span>
              </label>

              {formData.needsHelper && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Jumlah Asisten</label>
                    <Input
                      name="helperNeeded"
                      type="number"
                      value={formData.helperNeeded}
                      onChange={handleChange}
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Bayar Per Asisten (Rp)</label>
                    <Input
                      name="helperRatePerPerson"
                      type="number"
                      value={formData.helperRatePerPerson}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Membuat..." : "Buat PO"}
          </Button>
        </form>
      </div>
    </div>
  );
}
