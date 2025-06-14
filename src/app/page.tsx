import { authRoleName, authTokenName } from "@/lib/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const cookieStore = await cookies();
  const authUser = cookieStore.get(authTokenName);
  const role = cookieStore.get(authRoleName);

  if (authUser) {
    if (role && role.value === "Admin") {
      redirect("/admin/article");
    } else if (role && role.value === "User") {
      redirect("/article");
    }
  } else {
    redirect("/auth/login");
  }
}
