'use client';

import VerificationInput from "react-verification-input";

type Props = {
    onComplete: (code: string) => void;
}
const CodeVerification = ({ onComplete }: Props) => {
    return (
        <VerificationInput
            onComplete={onComplete}
            placeholder=" "
            classNames={{
                container: "flex space-x-2 justify-center items-center self-stretch flex-1",
                character: "border h-12 w-12 text-center flex justify-center items-center form-control rounded text-xl",
                // characterActive: "border border-blue-500",
                // characterSuccess: "border border-green-500",
                // characterError: "border border-red-500",
            }}
        />
    )
}

export default CodeVerification