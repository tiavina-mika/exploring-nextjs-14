'use client';

import Button from "@/components/buttons/Button";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const ResendCodeButton = ({ children }: Props) => {
  const handleClick = () => console.log("resend code");

  return (
    <Button variant="text" className="flex items-center cursor-pointer" onClick={handleClick}>
      <span className="font-bold">{children}</span>
    </Button>
  );
};

export default ResendCodeButton;
