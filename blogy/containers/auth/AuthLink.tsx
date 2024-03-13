import TextLink from '@/components/typography/TextLink';
import Text from '@/components/typography/Text';

type Props = {
  text: string;
  url: string;
  label: string;
};

const AuthLink = ({ text, url, label }: Props) => {
  return (
    <Text as="p" className="flex">{label} <TextLink href={url} className="pl-2">{text}</TextLink></Text>
  );
};

export default AuthLink;
