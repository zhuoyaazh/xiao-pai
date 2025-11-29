"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/notifications");
        if (!response.ok) throw new Error("Gagal fetch notifications");
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkRead = async (notificationId: string) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (notificationId: string) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-linear-to-br from-xiao-pink/5 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Notifikasi</h1>

        {notifications.length === 0 ? (
          <div className="text-center py-12 text-gray-500">Tidak ada notifikasi</div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notif) => (
              <Card key={notif.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-semibold">{notif.title}</p>
                        {!notif.read && (
                          <Badge variant="green" className="text-xs">
                            Baru
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(notif.createdAt).toLocaleString("id-ID")}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      {!notif.read && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleMarkRead(notif.id)}
                        >
                          ✓
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(notif.id)}
                        className="text-xiao-red"
                      >
                        ✕
                      </Button>
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
