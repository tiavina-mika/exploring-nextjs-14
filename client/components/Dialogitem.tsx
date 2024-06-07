import { ReactNode, forwardRef } from "react";
import Dialog, { CustomDialogProps } from "./Dialog";
import { DropdownMenuItem } from "./ui/DropdownMenu";
import { DialogProps } from "@radix-ui/react-dialog";
import { DropdownMenuItemProps } from "@radix-ui/react-dropdown-menu";

type Props = {
  children: ReactNode;
  triggerChildren: string; // button label
  onOpenChange: DialogProps["onOpenChange"];
} & DropdownMenuItemProps & Omit<CustomDialogProps, 'children'>;

/**
 * way to use it: https://github.com/radix-ui/primitives/issues/1836
 */
const DialogItem = forwardRef<
  HTMLDivElement,
  Props
>((props, forwardedRef) => {
  const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } = props;

  return (
    <Dialog
      {...itemProps}
      onOpenChange={onOpenChange}
      trigger={(
        <DropdownMenuItem
          {...itemProps}
          ref={forwardedRef}
          className="DropdownMenuItem"
          onSelect={(event) => {
            event.preventDefault();
            onSelect && onSelect(event);
          }}
        >
          {triggerChildren}
        </DropdownMenuItem>
      )}
    >
      {children}
    </Dialog>
  )
});

export default DialogItem;
