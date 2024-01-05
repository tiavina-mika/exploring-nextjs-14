import { ButtonVariantType, ButtonPaletteColor } from '@/types/component.type';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { VariantProps, cva } from "class-variance-authority";
import { cn } from '@/utils/utils';

export const buttonVariants = cva(
  "rounded-md font-primary px-4 py-3",
  {
    variants: {
      variant: {
        contained: "text-white",
        outlined: "border-solid border",
      },
      color: {
        primary: "",
        secondary: "",
        success: "",
        error: "",
        info: "",
        warning: "",
        default: "",
      },
    },
    compoundVariants: [
      {
        variant: "contained",
        color: "primary",
        class: "bg-primary",
      },
      {
        variant: "contained",
        color: "secondary",
        class: "bg-secondary",
      },
      {
        variant: "contained",
        color: "error",
        class: "bg-error",
      },
      {
        variant: "contained",
        color: "success",
        class: "bg-success",
      },
      {
        variant: "contained",
        color: "info",
        class: "bg-info",
      },
      {
        variant: "contained",
        color: "warning",
        class: "bg-warning",
      },
      {
        variant: "contained",
        color: "default",
        class: "bg-gray-400",
      },
      // outlined
      {
        variant: "outlined",
        color: "primary",
        class: "border-primary text-primary",
      },
      {
        variant: "outlined",
        color: "secondary",
        class: "border-secondary text-secondary",
      },
      {
        variant: "outlined",
        color: "error",
        class: "border-error text-error",
      },
      {
        variant: "outlined",
        color: "success",
        class: "border-success text-success",
      },
      {
        variant: "outlined",
        color: "info",
        class: "border-info text-info",
      },
      {
        variant: "outlined",
        color: "warning",
        class: "border-warning text-warning",
      },
      {
        variant: "outlined",
        color: "default",
        class: "border-gray-400 text-gray-400",
      },
    ],
  }
);

type Props = {
  variant?: ButtonVariantType;
  children: ReactNode;
  color?: ButtonPaletteColor;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

const Button = ({ variant = 'contained', children, color = "primary", className, ...props }: Props) => {
  return (
    <button
      className={cn(buttonVariants({ variant, color }), className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
