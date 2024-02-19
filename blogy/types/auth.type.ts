import { SignUpSchema } from "@/validations/auth.validations";
import { IPlatform } from "./user.type";
import { z } from "zod";

export type ISignUpInput = z.infer<typeof SignUpSchema>;


export interface SignUpI extends Partial<ISignUpInput> {
  username: string;
  platform: IPlatform;
}