import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
// import { z } from 'zod'
// import { usernameValidation } from "@/schemas/signUpSchema";


export async function GET(request: Request) {
    await dbConnect()

    try {
        const { username, code } = await request.json()

        const decodeUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({username: decodeUsername})

        if (!user) {
            return Response.json({
                success: false,
                message: 'User Not Found',
            }, {status: 500})
        }

        const isCodeValidated = user.verifyCode === code

        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if (isCodeValidated && isCodeNotExpired) {
            user.isVerified = true
            await user.save()

            return Response.json({
                success: true,
                message: 'Account Verified'
            }, {status: 200})
        } else if (!isCodeNotExpired) {
            return Response.json({
                success: false,
                message: 'Account code is expired, Please sign up again'
            }, {status: 400})
        } else // if the code is wrong
        {
            return Response.json({
                success: false,
                message: 'Code is invalid.'
            }, {status: 400})
        }


    } catch (error) {
        console.log("Error Verifying user", error)
        return Response.json({
            success: false,
            message: 'Error Verifying user'
        }, {status: 500})
    }
}