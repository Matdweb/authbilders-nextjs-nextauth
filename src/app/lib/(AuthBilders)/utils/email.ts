'use server';
import { createVerificationEmailToken } from "./jwt";
import { extractErrorDetails } from "./errors";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function sendEmailVerification(email: string) {

    const token = await createVerificationEmailToken(email);

    try {
        const response = await fetch(`${baseUrl}/api/verify-email/send`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                redirectUrl: `${baseUrl}/verify-email?token=${token}`,
            }),
        });

        const result = await response.json();
        return {
            success: response.ok,
            message: [result?.message || "Unknown server response"],
            data: result?.data ?? null,
        };
    } catch (error) {
        const { message } = extractErrorDetails(error)

        return {
            success: false,
            message: ["Email server error", message],
            data: null,
        };
    }
}

export async function verifyEmail(email: string) {
    try {
        const response = await fetch(`${baseUrl}/api/verify-email`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        return response.ok;
    } catch (error) {
        console.log(error);
        return false;
    }
}
