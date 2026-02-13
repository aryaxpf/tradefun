"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    role: z.enum(["buyer", "seller"]),
    counterpartyId: z.string().min(3, "Enter your partner's Unique Tag (e.g. User#123)"),
    title: z.string().min(5, "Give your transaction a clear title"),
    amount: z.coerce.number().min(10000, "Minimum transaction is Rp 10.000"),
    description: z.string().optional(),
});

export default function CreateTransactionPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            role: "buyer",
            counterpartyId: "",
            title: "",
            amount: 0,
            description: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        // Simulate API call to create room
        console.log("Creating room...", values);

        setTimeout(() => {
            setIsLoading(false);
            // Redirect to a mock room ID
            router.push("/dashboard/rooms/123-abc-456");
        }, 1500);
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Create Secure Transaction/Room</CardTitle>
                    <CardDescription>
                        Start a new escrow transaction. You will get a secure room link to share.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>I am the...</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your role" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="buyer">Buyer (paying money)</SelectItem>
                                                <SelectItem value="seller">Seller (providing goods/services)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid gap-6 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Transaction Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Buying Account ML Rank Mythic" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Amount (IDR)</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Rp 0" {...field} />
                                            </FormControl>
                                            <FormDescription>Estimated value. Can be adjusted later.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="counterpartyId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Partner Unique Tag (Optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="User#Tag (Leave empty to create invite link)" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            If you don't know yet, leave blank. You can share the link later.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description / Item Details</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Describe the item specs, login method, or specific terms..."
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating Secure Room...
                                    </>
                                ) : (
                                    <>
                                        Create Transaction <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
