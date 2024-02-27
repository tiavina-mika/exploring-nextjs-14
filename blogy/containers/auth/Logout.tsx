'use client';

import { logout } from "@/server/mutations/auth.mutations";
import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    const init = async () => {
      await logout()
    };

    init();
  }, [])

  return (
    <div>Loading</div>
  );
};

export default Logout;
