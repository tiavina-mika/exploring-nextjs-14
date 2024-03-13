'use server';

import { action } from "@/config/safeAction";
import { PlatformEnum } from "@/types/user.type";
import { collections } from "@/utils/constants";
import { setValues } from "@/utils/parse.utils";
import { ContactSchema } from "@/validations/app.validations";
import { SafeAction } from "next-safe-action";

const CONTACT_PROPERTIES = new Set(['email', 'name', 'message', 'platform']);

const Contact = Parse.Object.extend(collections.Contact);

type ContactOutput = {
  success: boolean;
};
export const createContact = action(
  ContactSchema,
  async (values): Promise<SafeAction<typeof ContactSchema, ContactOutput> | ContactOutput> => {
    // create the new user with corresponding fields
    const contact = new Contact();
    const newValues = { ...values, platform: PlatformEnum.WEB };
    setValues(contact, newValues, CONTACT_PROPERTIES);

    // sign up to parse server, by default it's a login
    await contact.save();

    return {
      success: true
    }
  },
);
