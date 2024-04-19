import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number,
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already Connected to DB")
        return
    }

    // In Case not connected
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {})

        console.log(`DB: ${db}`)

        connection.isConnected = db.connections[0].readyState

        console.log('DB Connected Successfully')
    } catch (error) {
        console.log(`Err connecting DB: ${error}`)
        process.exit(1)
    }
}

export default dbConnect;