import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request: Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    // const user: User = session?.user
    const user: User = session?.user as User // Assertion
    // const user = session?.user

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: 'Not Authenticated'
        }, {status: 401})
    }

    const userId = user._id
    const {acceptMessages } = await request.json()

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessage: acceptMessages },
            {new: true}
        )

        // If user not found
        if (!updatedUser) {
            return Response.json({
                success: false,
                message: 'failed to updated user status to accept messages'
            }, { status: 401})
        }
        return Response.json({
            success: true,
            message: 'Message Acceptance status updated successfully',
            updatedUser
        }, { status: 200})


    } catch (error) {
        console.log('failed to update user status to accept messages', error)
        return Response.json({
            success: false,
            message: 'failed to updated user status to accept messages'
        }, { status: 500})
    }

}


export async function GET(request: Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: 'Not authenticated-get'
        }, {status: 401})
    }

    const userId = user._id

    
    try {
        const foundUser = await UserModel.findById(userId)
        if (!foundUser) {
            return Response.json({
                success: false,
                message: 'User not found'
            }, {status: 404})
        }
    
        return Response.json({
            success: true,
            message: 'User found',
            isAcceptingMessage: foundUser.isAcceptingMessage,
            foundUser,
        }, {status: 200})
    } catch (error) {
        console.log('User not found,', error)
        return Response.json({
            success: false,
            message: 'Error is getting message acceptance status'
        }, { status: 500})
    }
    

}