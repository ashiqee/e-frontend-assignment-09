import { z } from "zod";


const registrationValidation = z.object({
    fullName: z.string().min(1, "Please enter your name!"),
    email:z.string().email("Please enter a valid email address!"),
    contactNumber: z.string().optional(),
    address: z.string().optional(),
    role: z.string({
        required_error: "Role is required!"
      }),
    password: z.string().min(6,"Must be at least 6 characters.")
})


export default registrationValidation;