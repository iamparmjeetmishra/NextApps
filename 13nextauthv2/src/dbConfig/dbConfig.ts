import mongoose from "mongoose";


export async function connect(): Promise<void> {
   try {
      await mongoose.connect(process.env.MONGO_URI!)
      const connection = mongoose.connection

      connection.on('connected', () => {
         console.log('MongoDB Connected')
      })

      connection.on('error', (err) => {
         console.log('DB conn error, please make sure db is up and running' + err)
         process.exit()

      })

   } catch (error) {
      console.log('Something wrong-DB Connection', error)
      console.log(error)
   }
}