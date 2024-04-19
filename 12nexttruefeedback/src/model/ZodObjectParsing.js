import { z } from 'zod'

const user = {
    name: 'John',
    age: 30,
    email: 'John@work.com',
    salary: 300,
}

const UserSchema = z.object({
    name: z.string(),
    age: z.number(),
    email: z.string().email(),
    // salary: z.number(),
})

// 1st way
// const validatedUser = UserSchema.parse(user)


// 2nd way with trycatch
// try {
//     const validatedUser = UserSchema.parse(user)
//     console.log(validatedUser)
// } catch (error) {
//     if (error instanceof z.ZodError) {
//         console.log(error.message)
//     }
// }


// 3rd Way with SafeParse

// const validatedUser = UserSchema.parse(user)

const validatedUser = UserSchema.safeParse(user)
console.log(validatedUser)

// With zod Parse - If anyone pollute the input field. It will not save in DB