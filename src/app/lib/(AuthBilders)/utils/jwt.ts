"use server";
import { SignJWT, jwtVerify } from "jose";
import type { Session } from "../defintions";
import jwt from "jsonwebtoken";

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

const RESET_SECRET = process.env.RESET_TOKEN_SECRET!;
const RESET_TOKEN_EXP = '5m'; // 15 minutes

export async function createResetPasswordToken(email: string) {
  return jwt.sign({ email }, RESET_SECRET, { expiresIn: RESET_TOKEN_EXP });
}

export async function verifyResetPasswordToken(token: string) {
  try {
    const payload = jwt.verify(token, RESET_SECRET) as { email: string };
    if (payload) {
      return payload.email;
    }
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function createVerificationEmailToken(email: string) {
  return jwt.sign({ email }, RESET_SECRET, { expiresIn: RESET_TOKEN_EXP });
}

export async function verifyVerificationEmailToken(token: string) {
  try {
    const payload = jwt.verify(token, RESET_SECRET) as { email: string };
    if (payload) {
      return payload.email;
    }
  } catch (error) {
    console.log(error);
    return;
  }
}
