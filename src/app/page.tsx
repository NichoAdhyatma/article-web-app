import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const cookieStore = await cookies();
  const authUser = cookieStore.get("authUser");

  if (authUser) {
    redirect("/article");
  } else {
    redirect("/auth/login");
  }
}
