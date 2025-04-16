import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { AppDialogProps } from "@/lib/types/dialog";

/**
 * A reusable dialog component that wraps the Radix UI Dialog.
 * Supports optional header, content, footer, and controlled open state.
 *
 * @param trigger - The element that triggers the dialog to open.
 * @param title - Optional title shown in the dialog header.
 * @param description - Optional description shown below the title.
 * @param content - The main content of the dialog.
 * @param contentClassName - Optional className for styling the dialog content.
 * @param footer - Optional footer, typically for action buttons.
 * @param header - Optional custom header to override the default title/description block.
 * @param open - Optional controlled open state.
 * @param onOpenChange - Optional handler for open state changes.
 */
export default function AppDialog({ 
  trigger, 
  title, 
  description, 
  content,
  contentClassName, 
  footer, 
  header,
  open,
  onOpenChange
}: AppDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={contentClassName}>
        {header}
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        {content}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
