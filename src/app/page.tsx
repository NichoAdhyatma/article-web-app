import { authRoleName, authTokenName } from "@/lib/constants";
import { ArrowRight, ExternalLink } from "lucide-react";
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
      <div className="text-center space-y-8 max-w-md mx-auto px-6">
        {/* Animated redirect icon */}
        <div className="relative">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
            <ExternalLink className="w-8 h-8 text-white animate-pulse" />
          </div>

          {/* Ripple effect */}
          <div className="absolute inset-0 w-20 h-20 mx-auto bg-blue-400 rounded-full animate-ping opacity-20"></div>
          <div className="absolute inset-0 w-20 h-20 mx-auto bg-blue-300 rounded-full animate-ping opacity-10 delay-75"></div>
        </div>

        {/* Main text with gradient */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Redirecting
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Please wait while we take you to your destination...
          </p>
        </div>

        {/* Animated arrow sequence */}
        <div className="flex items-center justify-center space-x-2">
          <ArrowRight className="w-5 h-5 text-blue-500 animate-bounce" />
          <ArrowRight className="w-5 h-5 text-blue-400 animate-bounce delay-100" />
          <ArrowRight className="w-5 h-5 text-blue-300 animate-bounce delay-200" />
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse"></div>
        </div>

        {/* Subtle message */}
        <p className="text-sm text-gray-400 animate-pulse">
          This should only take a moment
        </p>
      </div>
    </main>
  );
}
