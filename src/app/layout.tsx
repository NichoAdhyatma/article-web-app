import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { AlertDialogProvider } from "@/context/alert-dialog-context";
import { ReactQueryClientProvider } from "@/components/provider/react-query-provider";
import { AuthProvider } from "@/context/auth-context";
import { Toaster } from "react-hot-toast";
import { ArticlePreviewProvider } from "@/context/article-preview-context";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Article Web App",
  description: "A article web app with multi role support",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={`${archivo.className} antialiased min-h-screen`}>
          <AuthProvider>
            <ArticlePreviewProvider>
              <AlertDialogProvider>{children}</AlertDialogProvider>
            </ArticlePreviewProvider>
          </AuthProvider>
        </body>
      </html>
      <Toaster />
    </ReactQueryClientProvider>
  );
}
