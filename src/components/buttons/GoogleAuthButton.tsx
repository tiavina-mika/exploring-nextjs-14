'use client';

import { ReactNode } from "react"
import NextIcon from "../NextIcon"
import { nextAuthSignInWithGoogle } from "@/server/mutations/auth.mutations";

type Props = {
  children: ReactNode;
}

const GoogleAuthButton = ({ children }: Props) => {
  const handleGoogleAuthClick = async () => {
    await nextAuthSignInWithGoogle();
  }

  return (
    <button
      className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
      type="button"
      onClick={handleGoogleAuthClick}
    >
      <NextIcon
        alt="Google"
        src="/icons/google.svg"
        width={18}
        height={18}
        className="ml-2"
      />
      {children}
    </button>
  )
}

export default GoogleAuthButton