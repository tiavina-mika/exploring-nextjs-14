import { Attributes } from "parse";

export interface IUser extends Attributes {
  objectId: string;
  email: string;
  username?: string;
  updatedAt?: string;
  createdAt?: string;
  firstName?: string;
  lastName: string;
  banned?: boolean;
}

export enum PlatformEnum {
  WEB = 'web',
  BO = 'bo',
  ANDROID = 'android',
  IOS = 'ios',
}

export type IPlatform = PlatformEnum.WEB | PlatformEnum.BO | PlatformEnum.ANDROID | PlatformEnum.IOS;
