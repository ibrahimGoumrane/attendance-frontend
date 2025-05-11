import { UseFormReturn } from "react-hook-form";

export interface FieldConfig {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  className?: string;
  helpText?: React.ReactNode;
  options?: { value: string; label: string }[];
  customRender?: (form: UseFormReturn, state: State) => React.ReactElement;
}
export interface State {
  success: boolean;
  errors: Record<string, string[]>;
}
