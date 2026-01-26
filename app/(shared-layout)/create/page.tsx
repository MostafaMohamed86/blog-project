import CreateForm from "@/components/web/CreateForm";
import { isAuthenticated } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function CreatePage() {
  const auth = await isAuthenticated();

  if (!auth) {
    redirect("/auth/login");
  }

  return <CreateForm />;
}
