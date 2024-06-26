import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";


export async function GET(request: Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user:User = session?.user as User

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: 'Not authenticated'
        }, {status: 401})
    }

    
    // We conver user into string [..nextAuth] -> it would be a issue in mongo aggregation pipeline while getting userId. As a result we have to convert it again
    
    // We new mongoose id

    const userId = new mongoose.Types.ObjectId(user._id)

    try {
        const user = await UserModel.aggregate([
            { $match: { id: userId } },
            { $unwind: '$messages' },
            { $sort: { 'messages.createdAt': -1 } },
            {$group: {_id: '$_id', messges: {$push: '$messages'}}}
        ])

        if (!user || user.length === 0) {
            return Response.json({
                success: false,
                messages: user[0].messages
            }, { status: 401})
        }

        return Response.json({
            success: true,
            message: 'User found'
        }, {status: 200})

    } catch (error) {
        console.log('Unable to get messages', error)
        return Response.json({
            success: false,
            message: 'Unable to get messages'
        }, { status: 401})
    }

}