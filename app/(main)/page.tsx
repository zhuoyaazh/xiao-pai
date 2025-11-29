"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import { Search, TrendingUp } from "lucide-react";
import { useState } from "react";

const mockPOs = [
  { id: 1, title: "PO Bakso Malang", seller: "Adi Seller", price: 35000, participants: 12, deadline: "18:00", status: "open", badge: "green" },
  { id: 2, title: "Jasa Tulis Jurnal", seller: "Sarah Helper", price: 50000, participants: 8, deadline: "22:00", status: "needs_driver", badge: "red" },
  { id: 3, title: "PO Stiker Custom", seller: "Budi Kreasi", price: 25000, participants: 20, deadline: "20:00", status: "open", badge: "green" },
];

const mockJobs = [
  { id: 1, type: "driver", title: "Antar Pesanan 50 Box", location: "GKU → Asrama", reward: 15000, rating: 4.8 },
  { id: 2, type: "helper", title: "Bantu Masak Nasi Kuning", location: "Dapur", reward: 40000, rating: 4.9 },
  { id: 3, type: "driver", title: "Big Split: 200 Box (4 Slot)", location: "Warehouse → Campus", reward: 12000, rating: 5.0 },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = ["all", "Makanan", "Barang", "Jasa", "Helper"];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="container-xiao py-12">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            小派 XIAO PAI
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Satu kampus, satu geng. Apa aja dibantuin.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari PO, driver jobs, atau jasa titip..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-base placeholder-gray-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <Link href="/create">
            <Button size="md">+ Buat</Button>
          </Link>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`whitespace-nowrap rounded-full px-4 py-2 font-medium transition-colors ${
                categoryFilter === cat
                  ? "bg-pink-500 text-white"
                  : "border border-gray-300 text-gray-700 hover:border-pink-500 dark:border-gray-600 dark:text-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Hot POs Section */}
      <section className="container-xiao mb-12">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-pink-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🔥 Hot PO Sekarang</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockPOs.map((po) => (
            <Link key={po.id} href={`/browse/${po.id}`}>
              <Card className="cursor-pointer">
                <div className="mb-4 h-40 bg-gradient-to-br from-pink-300 to-pink-500 rounded-lg"></div>
                <CardContent>
                  <div className="mb-2 flex items-start justify-between">
                    <CardTitle className="line-clamp-2 text-base">{po.title}</CardTitle>
                    <Badge variant={po.badge as any} className="whitespace-nowrap ml-2">
                      {po.status === "open" && "Terbuka"}
                      {po.status === "needs_driver" && "Butuh Driver"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    oleh {po.seller} • {po.participants} peserta
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-pink-500">Rp {po.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-500">Tutup {po.deadline}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Driver & Helper Jobs Section */}
      <section className="container-xiao mb-12">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">💼 Job Board</h2>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Driver Jobs */}
          <div>
            <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">🚗 Kerja Antar</h3>
            <div className="space-y-2">
              {mockJobs
                .filter((j) => j.type === "driver")
                .map((job) => (
                  <Link key={job.id} href={`/driver-jobs/${job.id}`}>
                    <Card className="cursor-pointer">
                      <CardContent className="py-3">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-gray-900 dark:text-white">{job.title}</span>
                          <Badge variant="red">Rp {job.reward.toLocaleString()}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{job.location}</p>
                        <div className="mt-2 text-xs text-gray-500">⭐ {job.rating}</div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>

          {/* Helper Jobs */}
          <div>
            <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">🤝 Butuh Helper</h3>
            <div className="space-y-2">
              {mockJobs
                .filter((j) => j.type === "helper")
                .map((job) => (
                  <Link key={job.id} href={`/helper-jobs/${job.id}`}>
                    <Card className="cursor-pointer">
                      <CardContent className="py-3">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-gray-900 dark:text-white">{job.title}</span>
                          <Badge variant="yellow">Rp {job.reward.toLocaleString()}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{job.location}</p>
                        <div className="mt-2 text-xs text-gray-500">⭐ {job.rating}</div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-xiao py-12 text-center">
        <div className="rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 p-8 text-white">
          <h2 className="mb-4 text-3xl font-bold">Mulai Sekarang!</h2>
          <p className="mb-6 text-lg opacity-90">Jadi seller, driver, atau helper dan mulai earning hari ini.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/signup">
              <Button className="bg-white text-pink-500 hover:bg-gray-100">Daftar Sekarang</Button>
            </Link>
            <Link href="/browse">
              <Button variant="outline" className="border-white text-white hover:bg-pink-700">Jelajahi PO</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
