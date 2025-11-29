"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

interface Wallet {
  balanceCents: number;
  totalEarned: number;
  totalSpent: number;
}

interface Transaction {
  id: string;
  type: string;
  amountCents: number;
  createdAt: string;
  description?: string;
}

export default function WalletPage() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [topupAmount, setTopupAmount] = useState("");
  const [topupLoading, setTopupLoading] = useState(false);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const [walletRes, historyRes] = await Promise.all([
          fetch("/api/wallet/balance"),
          fetch("/api/wallet/history"),
        ]);

        if (walletRes.ok) {
          const data = await walletRes.json();
          setWallet(data);
        }

        if (historyRes.ok) {
          const data = await historyRes.json();
          setTransactions(data);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, []);

  const handleTopup = async (e: React.FormEvent) => {
    e.preventDefault();
    setTopupLoading(true);

    try {
      const response = await fetch("/api/wallet/topup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseInt(topupAmount) * 100 }),
      });

      if (!response.ok) throw new Error("Gagal top-up");

      setTopupAmount("");
      // Refresh wallet
      const walletRes = await fetch("/api/wallet/balance");
      if (walletRes.ok) {
        const data = await walletRes.json();
        setWallet(data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setTopupLoading(false);
    }
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-linear-to-br from-xiao-pink/5 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Balance Card */}
        <Card className="border-2 border-xiao-pink">
          <CardHeader>
            <CardTitle>Saldo Wallet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-4xl font-bold text-xiao-pink">
              Rp{wallet ? (wallet.balanceCents / 100).toLocaleString("id-ID") : "0"}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Dikeluarkan</p>
                <p className="text-lg font-semibold">
                  Rp{wallet ? (wallet.totalSpent / 100).toLocaleString("id-ID") : "0"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Diterima</p>
                <p className="text-lg font-semibold text-xiao-green">
                  Rp{wallet ? (wallet.totalEarned / 100).toLocaleString("id-ID") : "0"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top-up Form */}
        <Card>
          <CardHeader>
            <CardTitle>Top-up Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTopup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Jumlah (Rp)</label>
                <Input
                  type="number"
                  value={topupAmount}
                  onChange={(e) => setTopupAmount(e.target.value)}
                  placeholder="50000"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={topupLoading || !topupAmount}>
                {topupLoading ? "Memproses..." : "Top-up Sekarang"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Transaksi</CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Belum ada transaksi</p>
            ) : (
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-medium text-sm">{tx.type}</p>
                      {tx.description && <p className="text-xs text-gray-500">{tx.description}</p>}
                    </div>
                    <span
                      className={`font-semibold ${
                        tx.type.includes("earn") || tx.type.includes("topup") ? "text-xiao-green" : "text-xiao-red"
                      }`}
                    >
                      {tx.type.includes("earn") || tx.type.includes("topup") ? "+" : "-"}
                      Rp{(tx.amountCents / 100).toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
