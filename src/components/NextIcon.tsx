import Image, { ImageProps } from 'next/image';

type Props = {
  width?: number;
  height?: number;
  src: string;
  className?: string;
} & ImageProps;

const NextIcon = ({
  src,
  className,
  width = 24,
  height = 24,
  ...props
}: Props) => (
  <Image
    {...props}
    src={src}
    height={height}
    width={width}
    alt={props.alt || ''}
    className={className}
  />
);

export default NextIcon;
