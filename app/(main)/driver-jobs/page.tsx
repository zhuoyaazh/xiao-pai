"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface DriverJob {
  id: string;
  po: { id: string; title: string; seller: { name: string } };
  reward: number;
  pickupAddress: string;
  deliveryAddress: string;
  status: string;
  isBigSplitSlot: boolean;
  bigSplitSlotNumber?: number;
  bigSplitTotalSlots?: number;
}

export default function DriverJobsPage() {
  const [jobs, setJobs] = useState<DriverJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("OPEN");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`/api/driver-jobs?status=${filter}`);
        if (!response.ok) throw new Error("Gagal fetch jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filter]);

  const handleAccept = async (jobId: string) => {
    try {
      const response = await fetch(`/api/driver-jobs/${jobId}/accept`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Gagal accept job");

      // Refresh list
      const listRes = await fetch(`/api/driver-jobs?status=${filter}`);
      if (listRes.ok) {
        const data = await listRes.json();
        setJobs(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-xiao-pink/5 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Driver Jobs</h1>
          <p className="text-gray-600 dark:text-gray-400">Terima job delivery dan dapatkan hadiah</p>
        </div>

        {/* Filter */}
        <div className="mb-6 flex gap-2">
          {["OPEN", "ACCEPTED", "COMPLETED"].map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(status)}
            >
              {status === "OPEN" ? "Tersedia" : status === "ACCEPTED" ? "Diterima" : "Selesai"}
            </Button>
          ))}
        </div>

        {/* Jobs List */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">Tidak ada job tersedia</div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <Card key={job.id}>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left */}
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-lg">{job.po.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">dari {job.po.seller.name}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 uppercase">Pickup</p>
                        <p className="text-sm">{job.pickupAddress}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 uppercase">Delivery</p>
                        <p className="text-sm">{job.deliveryAddress}</p>
                      </div>

                      {job.isBigSplitSlot && (
                        <Badge variant="blue">
                          Big Split {job.bigSplitSlotNumber}/{job.bigSplitTotalSlots}
                        </Badge>
                      )}
                    </div>

                    {/* Right */}
                    <div className="flex flex-col justify-between items-end">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-xiao-pink">
                          Rp{(job.reward / 100).toLocaleString("id-ID")}
                        </p>
                        <p className="text-xs text-gray-500">Hadiah Driver</p>
                      </div>

                      {job.status === "OPEN" && (
                        <Button
                          onClick={() => handleAccept(job.id)}
                          className="mt-4"
                        >
                          Terima Job
                        </Button>
                      )}

                      {job.status === "ACCEPTED" && (
                        <Badge variant="green">✓ Diterima</Badge>
                      )}

                      {job.status === "COMPLETED" && (
                        <Badge variant="green">✓ Selesai</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
