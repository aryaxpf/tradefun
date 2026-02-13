"use client";

import { useState } from "react";
import {
    Send,
    ShieldCheck,
    Lock,
    CheckCircle2,
    AlertTriangle,
    FileText,
    CreditCard,
    Upload,
    ShieldAlert
} from "lucide-react";

import { checkMessageSafety } from "@/lib/security";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

// Mock Data
const MOCK_MESSAGES = [
    { id: 1, sender: "System", content: "Room Created. Waiting for agreement.", type: "system", timestamp: "10:00 AM" },
    { id: 2, sender: "You", content: "Hi, I am ready to buy your account.", type: "text", timestamp: "10:01 AM" },
    { id: 3, sender: "Seller#123", content: "Great. The price is Rp 500.000 as agreed?", type: "text", timestamp: "10:02 AM" },
];

export default function RoomPage({ params }: { params: { id: string } }) {
    // States: CREATED -> AGREED -> LOCKED -> DELIVERED -> COMPLETED
    const [status, setStatus] = useState("CREATED");
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState(MOCK_MESSAGES);

    // Security State
    const [securityWarning, setSecurityWarning] = useState<string | null>(null);

    // Mock security check function
    // const checkMessageSafety = (message: string) => { // This function is now imported
    //     const unsafeKeywords = ["password", "account", "login", "bank", "credit card", "ssn", "secret", "private key"];
    //     const foundKeyword = unsafeKeywords.find(keyword => message.toLowerCase().includes(keyword));

    //     if (foundKeyword) {
    //         return { isSafe: false, warningMessage: `Potential sensitive information detected: "${foundKeyword}". Avoid sharing personal credentials.` };
    //     }
    //     return { isSafe: true, warningMessage: null };
    // };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const content = e.target.value;
        setMessageInput(content);

        // Real-time check
        if (content.length > 5) {
            const check = checkMessageSafety(content);
            if (!check.isSafe) {
                setSecurityWarning(check.warningMessage || "Potential security risk detected.");
            } else {
                setSecurityWarning(null);
            }
        } else {
            setSecurityWarning(null);
        }
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageInput.trim()) return;

        // Final security block before sending
        const check = checkMessageSafety(messageInput);
        if (!check.isSafe) {
            // In a real app, you might block it or flag it.
            // For simulation, we'll append a "Red Flag" system note or block it.
            // Let's block it for "Hard Protection" demo.
            alert("Action Blocked: " + check.warningMessage);
            return;
        }

        const newMsg = {
            id: messages.length + 1,
            sender: "You",
            content: messageInput,
            type: "text",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMsg]);
        setMessageInput("");
        setSecurityWarning(null);
    };

    const handleAgreement_Buyer = () => {
        // In real app, both need to agree. mocking it here.
        setStatus("AGREED");
        setMessages(prev => [...prev, { id: Date.now(), sender: "System", content: "Both parties AGREED to terms. Please deposit funds.", type: "system", timestamp: "Now" }]);
    };

    const handleDeposit = () => {
        setStatus("LOCKED");
        setMessages(prev => [...prev, { id: Date.now(), sender: "System", content: "FUNDS LOCKED. Seller, please deliver the item via Secret Box.", type: "system", timestamp: "Now" }]);
    };

    const handleRelease = () => {
        setStatus("COMPLETED");
        setMessages(prev => [...prev, { id: Date.now(), sender: "System", content: "FUNDS RELEASED to Seller. Transaction Complete.", type: "system", timestamp: "Now" }]);
    };

    return (
        <div className="grid h-[calc(100vh-8rem)] grid-cols-1 gap-6 lg:grid-cols-3">
            {/* LEFT COLUMN: Transaction Status & Actions */}
            <div className="space-y-6 lg:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Transaction Status</CardTitle>
                        <CardDescription>Order ID: {params.id}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Stepper (Simplified) */}
                        <div className="relative border-l border-muted pl-4 ml-2 space-y-6">
                            <div className="relative">
                                <div className={`absolute -left-[21px] flex h-3 w-3 items-center justify-center rounded-full ${status !== 'CREATED' ? 'bg-green-500' : 'bg-primary'}`} />
                                <p className="text-sm font-medium leading-none">Agreement</p>
                                <p className="text-xs text-muted-foreground">Define terms & price</p>
                            </div>
                            <div className="relative">
                                <div className={`absolute -left-[21px] flex h-3 w-3 items-center justify-center rounded-full ${['LOCKED', 'DELIVERED', 'COMPLETED'].includes(status) ? 'bg-green-500' : 'bg-muted'}`} />
                                <p className="text-sm font-medium leading-none">Secure Funds</p>
                                <p className="text-xs text-muted-foreground">Buyer deposits money</p>
                            </div>
                            <div className="relative">
                                <div className={`absolute -left-[21px] flex h-3 w-3 items-center justify-center rounded-full ${['COMPLETED'].includes(status) ? 'bg-green-500' : 'bg-muted'}`} />
                                <p className="text-sm font-medium leading-none">Release & Complete</p>
                                <p className="text-xs text-muted-foreground">Verify item & release</p>
                            </div>
                        </div>

                        <Separator />

                        {/* Dynamic Action Buttons */}
                        {status === "CREATED" && (
                            <div className="space-y-2">
                                <Alert>
                                    <FileText className="h-4 w-4" />
                                    <AlertTitle>Review Agreement</AlertTitle>
                                    <AlertDescription>
                                        Price: Rp 500.000 <br /> Item: Mobile Legends Account
                                    </AlertDescription>
                                </Alert>
                                <Button onClick={handleAgreement_Buyer} className="w-full" size="sm">
                                    I Agree to Terms
                                </Button>
                            </div>
                        )}

                        {status === "AGREED" && (
                            <div className="space-y-2">
                                <Alert variant="default" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10">
                                    <Lock className="h-4 w-4 text-yellow-600" />
                                    <AlertTitle className="text-yellow-600">Waiting for Payment</AlertTitle>
                                    <AlertDescription className="text-yellow-600">
                                        Please deposit Rp 500.000 to Escrow Account.
                                    </AlertDescription>
                                </Alert>
                                <Button onClick={handleDeposit} className="w-full bg-green-600 hover:bg-green-700" size="sm">
                                    <CreditCard className="mr-2 h-4 w-4" /> Pay & Lock Funds
                                </Button>
                            </div>
                        )}

                        {status === "LOCKED" && (
                            <div className="space-y-2">
                                <Alert className="border-green-500 bg-green-50 dark:bg-green-900/10">
                                    <ShieldCheck className="h-4 w-4 text-green-600" />
                                    <AlertTitle className="text-green-600">Funds Secured</AlertTitle>
                                    <AlertDescription className="text-green-600">
                                        Money is held by Middletrans. Seller can now send the item.
                                    </AlertDescription>
                                </Alert>
                                <Button variant="outline" className="w-full" disabled>
                                    Waiting for Seller...
                                </Button>
                            </div>
                        )}

                        {status === "LOCKED" && (
                            // Cheat button for demo: simulate seller delivery
                            <Button onClick={() => setStatus("DELIVERED")} variant="ghost" size="sm" className="w-full text-xs text-muted-foreground">
                                (Demo: Simulate Seller Delivery)
                            </Button>
                        )}

                        {status === "DELIVERED" && (
                            <div className="space-y-2">
                                <Alert>
                                    <CheckCircle2 className="h-4 w-4" />
                                    <AlertTitle>Item Delivered</AlertTitle>
                                    <AlertDescription>
                                        Seller has sent the data. Please check "Secret Box".
                                    </AlertDescription>
                                </Alert>
                                <Button onClick={handleRelease} className="w-full" size="sm">
                                    Release Funds to Seller
                                </Button>
                                <Button variant="destructive" className="w-full" size="sm">
                                    Report / Dispute
                                </Button>
                            </div>
                        )}

                        {status === "COMPLETED" && (
                            <Alert className="border-green-500">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                <AlertTitle>Transaction Complete</AlertTitle>
                                <AlertDescription>
                                    Funds released. Thank you for using Middletrans.
                                </AlertDescription>
                            </Alert>
                        )}

                    </CardContent>
                </Card>

                {/* Secret Box (Credential Delivery) */}
                <Card className="border-dashed border-2">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Lock className="h-4 w-4" /> Secret Box
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {status === "DELIVERED" || status === "COMPLETED" ? (
                            <div className="p-3 bg-muted rounded-md font-mono text-sm break-all">
                                User: mythic_glory<br />Pass: hunter2
                            </div>
                        ) : (
                            <div className="text-xs text-muted-foreground text-center py-4">
                                Hidden until funds are locked & seller sends data.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* RIGHT COLUMN: Chat Interface */}
            <div className="lg:col-span-2 h-[600px] flex flex-col">
                <Card className="flex-1 flex flex-col">
                    <CardHeader className="py-3 px-4 border-b">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src="" />
                                <AvatarFallback>S1</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium">Seller#123</p>
                                <Badge variant="outline" className="text-[10px] h-4 px-1">Verified</Badge>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="flex-1 p-0 overflow-hidden">
                        <ScrollArea className="h-full p-4">
                            <div className="space-y-4">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.type === 'system' ? 'justify-center' : msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {msg.type === 'system' ? (
                                            <div className="bg-muted text-xs py-1 px-3 rounded-full text-muted-foreground flex items-center gap-1">
                                                <ShieldCheck className="h-3 w-3" /> {msg.content}
                                            </div>
                                        ) : (
                                            <div className={`max-w-[80%] rounded-lg p-3 text-sm ${msg.sender === 'You'
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-secondary text-secondary-foreground'
                                                }`}>
                                                <p>{msg.content}</p>
                                                <span className="text-[10px] opacity-70 block text-right mt-1">{msg.timestamp}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>

                    <CardFooter className="p-3 border-t">
                        <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
                            <Button type="button" size="icon" variant="ghost">
                                <Upload className="h-4 w-4" />
                            </Button>
                            <Input
                                placeholder="Type a message... (Don't share WA numbers)"
                                className="flex-1"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                            />
                            <Button type="submit" size="icon" disabled={!!securityWarning} className={securityWarning ? "opacity-50 cursor-not-allowed" : ""}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                        {securityWarning && (
                            <div className="mt-2 text-xs text-red-500 font-medium flex items-center gap-1 animate-pulse">
                                <ShieldAlert className="h-3 w-3" />
                                {securityWarning}
                            </div>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
