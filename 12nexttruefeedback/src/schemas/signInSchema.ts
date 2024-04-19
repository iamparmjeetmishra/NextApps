import { z } from 'zod';

export const signInSchema = z.object({
    // email: z.string().length(6, 'Verification code must be 6 digit')
    identifier: z.string(),
    password: z.string()
})