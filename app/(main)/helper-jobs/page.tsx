"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface HelperJob {
  id: string;
  title: string;
  seller: { id: string; name: string };
  ratePerPerson: number;
  helpersNeeded: number;
  helpersFilled: number;
  startTime: string;
  endTime: string;
  status: string;
}

export default function HelperJobsPage() {
  const [jobs, setJobs] = useState<HelperJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("OPEN");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`/api/helper-jobs?status=${filter}`);
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

  const handleApply = async (jobId: string) => {
    try {
      const response = await fetch(`/api/helper-jobs/${jobId}/apply`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Gagal apply job");

      // Refresh list
      const listRes = await fetch(`/api/helper-jobs?status=${filter}`);
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Helper Jobs</h1>
          <p className="text-gray-600 dark:text-gray-400">Bantu dan dapatkan penghasilan tambahan</p>
        </div>

        {/* Filter */}
        <div className="mb-6 flex gap-2">
          {["OPEN", "APPLYING", "COMPLETED"].map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(status)}
            >
              {status === "OPEN" ? "Tersedia" : status === "APPLYING" ? "Melamar" : "Selesai"}
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
                        <p className="font-semibold text-lg">{job.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">dari {job.seller.name}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 uppercase">Waktu</p>
                        <p className="text-sm">
                          {new Date(job.startTime).toLocaleString("id-ID")} -{" "}
                          {new Date(job.endTime).toLocaleTimeString("id-ID")}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Badge variant="blue">
                          {job.helpersFilled}/{job.helpersNeeded} Asisten
                        </Badge>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex flex-col justify-between items-end">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-xiao-green">
                          Rp{(job.ratePerPerson / 100).toLocaleString("id-ID")}
                        </p>
                        <p className="text-xs text-gray-500">/Asisten</p>
                      </div>

                      {job.status === "OPEN" && job.helpersFilled < job.helpersNeeded && (
                        <Button onClick={() => handleApply(job.id)} className="mt-4">
                          Lamar Sekarang
                        </Button>
                      )}

                      {job.helpersFilled >= job.helpersNeeded && (
                        <Badge variant="yellow">Kuota Penuh</Badge>
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
