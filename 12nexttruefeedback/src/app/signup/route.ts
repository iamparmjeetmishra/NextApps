import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from 'bcryptjs'

import { sendVerificationEmail } from "@/helpers/sendVerificationEmails";

export async function POST(request: Request) {
    await dbConnect()

    try {
        const { username, email, password } = await request.json()

        const existingVerifiedUserByUsername = await UserModel.findOne({
            username,
            isVerified: true,
        })

        if (existingVerifiedUserByUsername) {
            return Response.json(
                {
                    success: false,
                    message: 'Username is already taken',
                },
                {
                    status: 400
                }
            )
        }

        const existingUserByEmail = await UserModel.findOne({ email })
        let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json(
                    {
                        success: false,
                        message: 'User already exists with this email',
                    },
                    {
                        status: 400
                    }
                )
            } else {
                const hashedPassword = await bcrypt.hash(password, 10)
                const expiryDate = new Date();
                expiryDate.setHours(expiryDate.getHours() + 1)

                const newUser = new UserModel({
                    username,
                    email,
                    password: hashedPassword,
                    verifyCode,
                    verifyCodeExpiry: expiryDate,
                    isVerified: false,
                    isAcceptingMessage: true,
                    messages: []
                })

                await newUser.save()
            }

            // Send Verification Email
            const emailResponse = await sendVerificationEmail(
                email,
                username,
                verifyCode
            );
            if (!emailResponse.success) {
                return Response.json(
                    {
                        success: false,
                        message: emailResponse.message,
                    },
                    { status: 500}
                )
            }

            return Response.json(
                {
                    success: true,
                    message: 'User Registered successfully, Please verify your account.',
                },
                { status: 201 }
            );
        }

    } catch (error) {
        console.error(`Error Registering user, ${error}`)
        return Response.json(
            {
            success: false,
            message: 'Error Registering User',
            },
            {
                status: 500
            }
        )
        
    }
}