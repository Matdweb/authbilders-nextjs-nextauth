import { SignJWT, jwtVerify } from "jose";
import type { Session } from "../defintions";

const secretKey = process.env.JWT_SECRET_KEY || "";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: Session): Promise<string> {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("100 sec from now")
        .sign(key);
}

export async function decrypt(input: string): Promise<Session | null> {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ["HS256"],
        });
        return payload;

    } catch (error) {
        console.log("Decryption error:", error);
        return null;
    }
}
