import Link from "next/link";
import {
    LayoutDashboard,
    MessageSquare,
    Settings,
    ShieldCheck,
    Wallet,
    LogOut,
    User,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen bg-muted/40">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
                <div className="flex h-14 items-center border-b px-6 font-semibold lg:h-[60px]">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                        <ShieldCheck className="h-6 w-6 text-primary" />
                        <span>Middletrans</span>
                    </Link>
                </div>
                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="grid gap-1 px-2 text-sm font-medium">
                        <li>
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary bg-muted transition-all hover:text-primary"
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard/transactions"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                            >
                                <Wallet className="h-4 w-4" />
                                Transactions
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard/messages"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                            >
                                <MessageSquare className="h-4 w-4" />
                                Messages
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard/kyc"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                            >
                                <ShieldCheck className="h-4 w-4" />
                                Verification (KYC)
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard/settings"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                            >
                                <Settings className="h-4 w-4" />
                                Settings
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="border-t p-4">
                    <Button variant="outline" className="w-full justify-start gap-2">
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col sm:pl-64">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:py-4">
                    <div className="flex w-full justify-end items-center gap-4">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <User className="h-5 w-5" />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </div>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
