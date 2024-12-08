import { z } from "zod";


const loginValidation = z.object({
    email:z.string().trim().email("Please enter a valid email address!"),
    password: z.string().trim().min(6,"Must be at least 6 characters.")
})


export default loginValidation;