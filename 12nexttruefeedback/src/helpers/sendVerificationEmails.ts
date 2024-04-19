import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string,
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'info@parmjeetmishra.com',
            to: 'iamparmjeetmishra@gmail.com',
            subject: 'Mystry Message Verification Email',
            react: VerificationEmail({username, otp: verifyCode}),
        });
        return {success: true, message: 'Verification email sent successfully'}
    } catch (emailError) {
        console.error(`Email Error: ${emailError}`)
        return {success: false, message: 'Failed to Send Verification Email'}
    }
}