"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const CATEGORIES = ["Semua", "Makanan", "Barang", "Layanan", "Kos", "Tiket", "Lainnya"];

interface PO {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  currentQty: number;
  maxQty: number;
  deadline: string;
  seller: { id: string; name: string; rating: number };
}

export default function BrowsePOPage() {
  const [pos, setPos] = useState<PO[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("Semua");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPOs = async () => {
      try {
        const params = new URLSearchParams();
        if (category !== "Semua") params.append("category", category);
        if (search) params.append("search", search);

        const response = await fetch(`/api/po?${params}`);
        if (!response.ok) throw new Error("Gagal fetch POs");
        const data = await response.json();
        setPos(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPOs();
  }, [category, search]);

  return (
    <div className="min-h-screen bg-linear-to-br from-xiao-pink/5 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Jelajahi Open PO</h1>
          <p className="text-gray-600 dark:text-gray-400">Hemat bersama teman-teman</p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 space-y-4">
          <Input
            type="search"
            placeholder="Cari PO..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />

          <div className="flex gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={category === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(cat)}
                className="whitespace-nowrap"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : pos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Tidak ada PO tersedia</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pos.map((po) => (
              <Link key={po.id} href={`/browse/${po.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start gap-2">
                      <CardTitle className="text-lg line-clamp-2">{po.title}</CardTitle>
                      <Badge variant="green">{po.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-2xl font-bold text-xiao-pink">Rp{(po.price / 100).toLocaleString("id-ID")}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{po.description}</p>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {po.currentQty}/{po.maxQty} orang
                      </span>
                      <span className="text-gray-500">⭐ {po.seller.rating.toFixed(1)}</span>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Penjual: {po.seller.name}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
