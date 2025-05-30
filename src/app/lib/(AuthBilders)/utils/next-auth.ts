import { signIn } from "next-auth/react";
import { extractErrorDetails } from "./errors";

export async function handleNextAuthSignIn({
    email, password, redirectTo
}: {
    email: string;
    password: string;
    redirectTo?: string;
}) {
    try {
        const res = await signIn("credentials", {
            email,
            password,
            callbackUrl: redirectTo || "/",
            redirect: false,
        });

        if (res?.error) {
            return { error: "Invalid email or password", }
        }

        return { error: null };
    } catch (error) {
        const { message } = extractErrorDetails(error);
        return { error: message || "An unexpected error occurred during sign-in." };
    }
}