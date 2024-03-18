import Button from "@/components/buttons/Button"
import {
  Dialog as UIDialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/Dialog"
import { useTranslations } from "next-intl";
import { ReactNode } from "react"

type Props = {
  children: ReactNode;
  title?: boolean;
  description?: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
  withCancelButton?: boolean;
  trigger?: ReactNode;
}
const Dialog = ({ children, title, description, trigger, cancelButtonText, confirmButtonText, withCancelButton = true }: Props) => {
  const t = useTranslations("Common");

  return (
    <UIDialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {children}
        </div>
        <DialogFooter>
        < DialogClose asChild>
            {withCancelButton && <Button variant="text">{cancelButtonText || t("cancel")}</Button>}
          </DialogClose>
          <Button type="submit">{confirmButtonText || t('confirm')}</Button>
        </DialogFooter>
      </DialogContent>
    </UIDialog>
  )
}

export default Dialog;
