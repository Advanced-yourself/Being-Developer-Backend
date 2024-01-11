const { z } = require("zod");

// Creating object Schema
const userSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(50, { message: "Name must not be more than 50 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email Address" })
    .min(3, { message: "Email must be at least 3 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(5, { message: "Password must be at least 5 characters" })
    .max(255, { message: "Password must not be more than 255 characters" }),

  password_confirmation: z
    .string({ required_error: "Password confirmation is required" })
    .refine((data) => !data || data === data.password, {
      message: "Password confirmation must match the password",
    }),
});

module.exports = userSchema;
//
