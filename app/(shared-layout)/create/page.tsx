import { isAuthenticated } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import CreateForm from "./CreateForm";

export const dynamic = "force-dynamic";

export default async function CreatePage() {
  const auth = await isAuthenticated();

  if (!auth) {
    redirect("/auth/login");
  }

  return <CreateForm />;
}
