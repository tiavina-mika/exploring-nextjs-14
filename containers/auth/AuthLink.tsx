import TextLink from '@/components/typography/TextLink';
import Text from '@/components/typography/Text';

type Props = {
  text: string;
  url: string;
  label: string;
};

const AuthLink = ({ text, url, label }: Props) => {
  return (
    <Text as="p" className="md:flex text-sm md:text-md">{label} <TextLink href={url} className="md:pl-2 text-sm md:text-md">{text}</TextLink></Text>
  );
};

export default AuthLink;
