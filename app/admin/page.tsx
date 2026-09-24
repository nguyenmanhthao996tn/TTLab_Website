import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/session";
import { repo } from "@/lib/posts-repo";
import AdminPanel from "./AdminPanel";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  return <AdminPanel posts={await repo.list()} />;
}
