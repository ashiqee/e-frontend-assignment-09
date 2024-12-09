import { z } from "zod";



const registrationValidation =  z.object({
  password: z.string({
    required_error: "Full Name is required!"
}),
      fullName: z.string({
          required_error: "Full Name is required!"
      }),
      email: z.string({
          required_error: "Email is required!"
      }),
      contactNumber: z.string().optional(),
      address: z.string().optional(),
     
  })




export default registrationValidation;