/**
 * Middletrans Security Utilities
 * Anti-Social Engineering & Anti-Scam Detection
 */

// Regex patterns to detect potential "Off-Platform" luring
const SUSPICIOUS_PATTERNS = {
    // Detect WhatsApp, Telegram, or generic phone numbers
    // Matches: 0812..., +62..., WA, Tele, hubungi
    PHONE_NUMBERS: /(\+62|08)[0-9]{8,}/,
    OFF_PLATFORM_KEYWORDS: /(wa|whatsapp|telegram|tele|ig|instagram|hubungi|chat manual|transfer langsung)/i,

    // Detect External Links (Standard URL regex)
    EXTERNAL_LINKS: /(https?:\/\/[^\s]+)/g,

    // Detect Banking/Wallet keywords (for directing direct transfer)
    DIRECT_TRANSFER: /(bca|mandiri|bri|dana|gopay|ovo|shopeepay|rek|rekening)/i
};

export interface SecurityCheckResult {
    isSafe: boolean;
    flags: string[];
    warningMessage?: string;
}

export function checkMessageSafety(content: string): SecurityCheckResult {
    const flags: string[] = [];

    if (SUSPICIOUS_PATTERNS.PHONE_NUMBERS.test(content)) {
        flags.push("PHONE_NUMBER_DETECTED");
    }

    if (SUSPICIOUS_PATTERNS.OFF_PLATFORM_KEYWORDS.test(content)) {
        flags.push("OFF_PLATFORM_ATTEMPT");
    }

    if (SUSPICIOUS_PATTERNS.EXTERNAL_LINKS.test(content)) {
        // Allow internal links (middletrans.com or localhost) if needed, but for now block all
        if (!content.includes("middletrans.com")) {
            flags.push("EXTERNAL_LINK_DETECTED");
        }
    }

    if (SUSPICIOUS_PATTERNS.DIRECT_TRANSFER.test(content)) {
        flags.push("DIRECT_TRANSFER_ATTEMPT");
    }

    if (flags.length > 0) {
        return {
            isSafe: false,
            flags,
            warningMessage: "⚠️ SECURITY WARNING: Dealing outside the app or sending personal contacts is HIGH RISK. Transaction protection is VOID if you leave this chat.",
        };
    }

    return { isSafe: true, flags: [] };
}
