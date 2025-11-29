"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface ProxyRequest {
  id: string;
  requester: { name: string; rating: number };
  title: string;
  details: string;
  estimatedBudget: number;
  deadline: string;
  status: string;
  offers?: number;
}

export default function JasaTitipPage() {
  const router = useRouter();
  const [view, setView] = useState<"browse" | "create">("browse");
  const [requests, setRequests] = useState<ProxyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [budget, setBudget] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/proxy-requests");
        if (!response.ok) throw new Error("Gagal fetch requests");
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (view === "browse") {
      setLoading(true);
      fetchRequests();
    }
  }, [view]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const response = await fetch("/api/proxy-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          details,
          estimatedBudget: parseInt(budget) * 100,
        }),
      });

      if (!response.ok) throw new Error("Gagal membuat request");

      setTitle("");
      setDetails("");
      setBudget("");
      setView("browse");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setCreating(false);
    }
  };

  const handleMakeOffer = (requestId: string) => {
    router.push(`/jasa-titip/${requestId}/offer`);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-xiao-pink/5 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Jasa Titip (Proxy)</h1>
          <p className="text-gray-600 dark:text-gray-400">Bantu teman membelikan sesuatu, dapatkan komisi</p>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={view === "browse" ? "default" : "outline"}
            onClick={() => setView("browse")}
          >
            Cari Request
          </Button>
          <Button
            variant={view === "create" ? "default" : "outline"}
            onClick={() => setView("create")}
          >
            Buat Request
          </Button>
        </div>

        {/* Browse View */}
        {view === "browse" && (
          <>
            {loading ? (
              <div className="text-center py-12">Loading...</div>
            ) : requests.length === 0 ? (
              <div className="text-center py-12 text-gray-500">Tidak ada request</div>
            ) : (
              <div className="space-y-4">
                {requests.map((req) => (
                  <Card key={req.id}>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold text-lg">{req.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">dari {req.requester.name}</p>
                          <p className="text-xs text-gray-500 mt-2 line-clamp-2">{req.details}</p>
                        </div>

                        <div className="flex flex-col justify-between items-end">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-xiao-pink">
                              Rp{(req.estimatedBudget / 100).toLocaleString("id-ID")}
                            </p>
                            <p className="text-xs text-gray-500">Budget</p>
                          </div>

                          {req.status === "OPEN" && (
                            <Button
                              size="sm"
                              onClick={() => handleMakeOffer(req.id)}
                              className="mt-4"
                            >
                              Buat Penawaran
                            </Button>
                          )}

                          {req.status === "COMPLETED" && (
                            <Badge variant="green">✓ Selesai</Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {/* Create View */}
        {view === "create" && (
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>Buat Permintaan Jasa Titip</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Apa yang diminta?</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Belikan buku di toko buku Sudirman"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Detail Permintaan</label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Jelaskan detail yg dibutuhkan..."
                    className="w-full border border-gray-300 rounded-lg p-2 dark:bg-gray-800 dark:border-gray-600"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Budget Estimasi (Rp)</label>
                  <Input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="100000"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={creating}>
                  {creating ? "Membuat..." : "Buat Request"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
