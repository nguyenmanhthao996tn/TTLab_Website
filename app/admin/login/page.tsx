"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!pw) return;
    setBusy(true);
    setErr("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (res.ok) {
        router.replace("/admin");
        router.refresh();
        return;
      }
      setErr((await res.json().catch(() => ({}))).error ?? "Đăng nhập thất bại");
    } catch {
      setErr("Không kết nối được máy chủ");
    }
    setBusy(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm"
      >
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">TTLab Admin</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 mb-6">Đăng nhập để quản lý tin tức</p>

        <div className="space-y-2">
          <Label htmlFor="password">Mật khẩu</Label>
          <Input
            id="password"
            type="password"
            autoFocus
            autoComplete="current-password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            aria-invalid={!!err}
          />
        </div>

        {err && <p className="text-sm text-red-600 dark:text-red-400 mt-3">{err}</p>}

        <Button type="submit" className="w-full mt-6" disabled={busy || !pw}>
          {busy ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
      </form>
    </main>
  );
}
