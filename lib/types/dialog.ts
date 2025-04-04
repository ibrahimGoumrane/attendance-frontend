export interface AppDialogProps {
  trigger: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode;
  contentClassName?: string,
  footer?: React.ReactNode;
  header?: React.ReactNode;
  open?: boolean
  onOpenChange?: (open: boolean) => void
}
