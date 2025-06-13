import { AppSidebar } from "@/components/global/app-sidebar";
import HeaderProfile from "@/components/global/header-profile";
import Box from "@/components/ui/box";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider open={true}>
      <AppSidebar />

      <main className="flex-1 flex flex-col bg-gray-100">
        <HeaderProfile />

        <Box className="p-6">{children}</Box>
      </main>
    </SidebarProvider>
  );
}
