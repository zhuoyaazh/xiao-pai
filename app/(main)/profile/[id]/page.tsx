"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  rating: number;
  verificationStatus: string;
  wallet?: { balanceCents: number };
  reviews?: Array<{ rating: number; text: string }>;
}

export default function ProfilePage() {
  const params = useParams();
  const userId = params.id as string;
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error("User tidak ditemukan");
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchProfile();
  }, [userId]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-center text-xiao-red">{error}</div>;
  if (!user) return <div className="p-4 text-center">User tidak ditemukan</div>;

  return (
    <div className="min-h-screen bg-linear-to-br from-xiao-pink/5 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{user.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
              </div>
              <Badge variant={user.verificationStatus === "VERIFIED" ? "green" : "yellow"}>
                {user.verificationStatus === "VERIFIED" ? "✓ Terverifikasi" : "Menunggu verifikasi"}
              </Badge>
            </div>

            <div className="flex gap-6">
              <div>
                <p className="text-2xl font-bold">⭐ {user.rating.toFixed(1)}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Rating</p>
              </div>
              {user.wallet && (
                <div>
                  <p className="text-2xl font-bold text-xiao-pink">Rp{(user.wallet.balanceCents / 100).toLocaleString("id-ID")}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Saldo Wallet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Reviews */}
        {user.reviews && user.reviews.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Ulasan ({user.reviews.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {user.reviews.map((review, idx) => (
                <div key={idx} className="border-b last:border-b-0 pb-4 last:pb-0">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">⭐ {review.rating}/5</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{review.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
