import { LoginSchema, SignUpSchema } from "@/validations/auth.validations";
import { IPlatform } from "./user.type";
import { z } from "zod";

export type ISignUpInput = z.infer<typeof SignUpSchema>;
export type ILoginInput = z.infer<typeof LoginSchema>;


export interface SignUpI extends Partial<ISignUpInput> {
  username: string;
  platform: IPlatform;
}