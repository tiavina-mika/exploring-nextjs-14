import { Attributes } from "parse";
import { IUploadedFile } from "./app.type";

export type IAuthProvider = "credentials" | "google"
export interface IUser extends Attributes {
  objectId: string;
  email: string;
  username?: string;
  updatedAt?: string;
  createdAt?: string;
  firstName?: string;
  lastName: string;
  banned?: boolean;
  image?: IUploadedFile;
  authProvider?: IAuthProvider;
}

export enum PlatformEnum {
  WEB = 'web',
  BO = 'bo',
  ANDROID = 'android',
  IOS = 'ios',
}

export type IPlatform = PlatformEnum.WEB | PlatformEnum.BO | PlatformEnum.ANDROID | PlatformEnum.IOS;
