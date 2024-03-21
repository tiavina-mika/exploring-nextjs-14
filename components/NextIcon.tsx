import Image, { ImageProps } from 'next/image';

type Props = {
  width?: number;
  height?: number;
  size?: number;
  src: string;
  alt?: string;
  className?: string;
} & Omit<ImageProps, 'alt'>;

const NextIcon = ({
  src,
  className,
  width = 24,
  height = 24,
  size = 24,
  alt="icon",
  ...props
}: Props) => (
  <Image
    {...props}
    src={src}
    height={size}
    width={size}
    alt={alt}
    className={className}
  />
);

export default NextIcon;
