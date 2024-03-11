import { EmailSchema, LoginSchema, SignUpSchema } from "@/validations/auth.validations";
import { IAuthProvider, IPlatform } from "./user.type";
import { z } from "zod";
import { IUploadedFile } from "./app.type";

export type ISignUpInput = z.infer<typeof SignUpSchema>;
export type ILoginInput = z.infer<typeof LoginSchema>;

interface IExtendedSignUpInput {
  username: string;
  platform: IPlatform;
  authProvider?: IAuthProvider;
}
export interface SignUpI extends Partial<ISignUpInput>, IExtendedSignUpInput {};

export interface SignUpWithGoogleInput extends Omit<ISignUpInput, 'passwordConfirmation'>{
  verified: boolean;
  image: IUploadedFile,
};

export interface SignUpWithGoogleToSaveInput extends SignUpWithGoogleInput, IExtendedSignUpInput {
  authId: string;
};

export type EmailInput = z.infer<typeof EmailSchema>;
