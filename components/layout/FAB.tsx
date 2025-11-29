"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function FAB() {
  return (
    <div className="fixed bottom-6 right-6 z-40 md:hidden">
      <Link href="/create">
        <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl">
          <Plus className="mr-2 h-5 w-5" />
          Buat PO
        </Button>
      </Link>
    </div>
  );
}
