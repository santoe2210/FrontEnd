import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Modal({
  open,
  setOpen,
  triggerItem = false,
  bannerIcon = null,
  title,
  children,
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {triggerItem && <DialogTrigger>Open</DialogTrigger>}
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader className="text-center">
          {bannerIcon && bannerIcon()}
          {title && (
            <DialogTitle className="text-center my-2">{title}</DialogTitle>
          )}
          {/* <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription> */}
          <div className="text-center">{children}</div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
