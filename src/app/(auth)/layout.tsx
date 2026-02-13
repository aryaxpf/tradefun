import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Middletrans",
  description: "Secure Login and Registration",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 p-4 dark:bg-neutral-900">
      <div className="w-full max-w-md space-y-8">
        {children}
      </div>
    </div>
  );
}
