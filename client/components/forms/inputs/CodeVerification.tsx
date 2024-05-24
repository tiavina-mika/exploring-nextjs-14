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
                container: "flex space-x-2 md:justify-center items-center self-stretch flex-1",
                character: "border h-12 w-12 text-center flex justify-center items-center form-control rounded text-xl dark:bg-muted-foreground dark:border-muted-foreground dark:text-gray-300",
                characterSelected: "dark:border dark:border-primary",
                characterFilled: "dark:border dark:border-primary"
            }}
        />
    )
}

export default CodeVerification
