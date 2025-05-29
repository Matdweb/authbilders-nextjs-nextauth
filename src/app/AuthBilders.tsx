import "./globals.css";
import { Providers } from "./providers";
import { CountDownTimer } from "@/components/(AuthBilders)/CountDownTimer";
import { UserInfo } from "@/components/(AuthBilders)/UserInfo";
import SessionErrorToastHandler from "@/components/(AuthBilders)/Handlers/SessionErrorToastHandler";
import { getServerSession } from "next-auth";

export async function AuthBilders({ children }: { children: React.ReactNode }) {
    const session = await getServerSession();

    return (
        <Providers session={session}>
            {children}
            {<SessionErrorToastHandler />}
            {<CountDownTimer />}
            {<UserInfo />}
        </Providers>
    );
}