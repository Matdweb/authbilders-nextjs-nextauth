// app/lib/actions/signup.ts
'use server'
import path from 'path';
import fs from 'fs/promises';
import bcrypt from 'bcrypt';
import { AuthServerActionState } from './defintions';
import { errorResponse, successResponse } from './utils/response';
import { extractErrorDetails } from './utils/errors';
import { generateUID } from './utils/uuid';

const USERS_PATH = path.join(process.cwd(), 'src/app/lib/data/users.json');

export async function signUp(
    _prev: AuthServerActionState,
    formData: FormData
): Promise<AuthServerActionState> {
    try {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const raw = await fs.readFile(USERS_PATH, 'utf-8');
        const users = JSON.parse(raw);

        const exists = users.find((u: any) => u.email === email);
        if (exists) {
            return errorResponse(['User already exists'], {
                email: ['Email already registered']
            });
        }

        const hash = await bcrypt.hash(password, 10);
        const newUser = {
            id: generateUID(),
            email,
            password: hash,
            email_verified: false,
        };

        users.push(newUser);
        await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2));

        return successResponse(['Account created successfully!']);
    }
    catch (error) {
        const { message = 'Unexpected error occurred' } = extractErrorDetails(error);
        return errorResponse(['Failed to register user'], {
            email: [message || 'Failed to register user']
        });
    }
}

