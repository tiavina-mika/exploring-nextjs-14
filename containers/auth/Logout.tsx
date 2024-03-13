'use client';

import { logout } from "@/server/mutations/auth.mutations";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Logout = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const init = async () => {
      await logout(searchParams?.get("redirect"))
    };

    init();
  }, [searchParams])

  return (
    <div>Loading</div>
  );
};

export default Logout;
