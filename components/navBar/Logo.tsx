import Image from "next/image";
import TextLink from "../typography/TextLink";

const Logo = () => {
  return (
    <TextLink
      href="/"
      className="flex items-center space-x-3 rtl:space-x-reverse"
    >
      {/* light logo */}
      <Image
        src="logo-white.svg"
        alt="Tiavina Michael Ralainirina"
        width={62}
        height={22}
        className="dark:block hidden"
      />
      {/* dark logo */}
      <Image
        src="logo.svg"
        alt="Tiavina Michael Ralainirina"
        width={62}
        height={22}
        className="dark:hidden block"
      />
    </TextLink>
  );
};

export default Logo;
