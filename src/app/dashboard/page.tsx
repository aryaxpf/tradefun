import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Profile Summary Card */}
            <Card className="col-span-full lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                        <CardTitle className="text-2xl font-bold">Welcome back, Aryap</CardTitle>
                        <CardDescription className="text-base">
                            UID: <span className="font-mono font-medium text-foreground">User#9928</span>
                        </CardDescription>
                    </div>
                    <Badge variant="outline" className="h-8 gap-1 px-3 text-sm font-medium border-green-500 text-green-500">
                        <ShieldCheck className="h-4 w-4" />
                        Verified
                    </Badge>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-3 mt-4">
                        <div className="flex flex-col space-y-1.5 rounded-lg border p-3">
                            <span className="text-xs text-muted-foreground">Account Status</span>
                            <span className="font-semibold text-green-600 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4" /> Active
                            </span>
                        </div>
                        <div className="flex flex-col space-y-1.5 rounded-lg border p-3">
                            <span className="text-xs text-muted-foreground">Trust Score</span>
                            <span className="font-semibold">100 / 100</span>
                        </div>
                        <div className="flex flex-col space-y-1.5 rounded-lg border p-3">
                            <span className="text-xs text-muted-foreground">Member Since</span>
                            <span className="font-semibold">Feb 2026</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* KYC Status Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Identity Verification</CardTitle>
                    <CardDescription>Level 1 Verified</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="flex items-center gap-4 rounded-md border p-4">
                        <ShieldCheck className="h-8 w-8 text-green-500" />
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">KYC Verified</p>
                            <p className="text-xs text-muted-foreground">
                                You can transact up to Rp 50.000.000
                            </p>
                        </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                        <AlertTriangle className="h-3 w-3 inline mr-1 text-yellow-500" />
                        Upgrade to Level 2 for unlimited transactions.
                    </div>
                </CardContent>
            </Card>

            {/* Quick Stats or Actions */}
            <Card className="col-span-full">
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest transactions and account events.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed bg-muted/50">
                        <div className="text-center text-muted-foreground">
                            <p>No recent transactions</p>
                            <p className="text-sm">Start a secure transaction to verify funds.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
