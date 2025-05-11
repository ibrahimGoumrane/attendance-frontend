import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "@/lib/schemas/base";
import { getErrorMessage } from "@/lib/utils";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

interface Options {
  value: string; // Value of the option
  label: string; // Label to display for the option
}

interface SelectFieldsProps {
  label: string; // Field label
  field: ControllerRenderProps<FieldValues, string>; // Field object from form.control
  state: State; // Form state for error handling
  options: Options[]; // Options for the select field
  placeholder?: string; // Optional placeholder
  type?: string; // Input type (text, email, password, etc.)
  autoComplete?: string; // Autocomplete attribute
  className?: string; // Additional CSS classes
  required?: boolean; // If the field is required
  disabled?: boolean; // If the field is disabled
  readOnly?: boolean; // If the field is read-only
  icon?: React.ReactNode; // Optional icon to display
  helpText?: React.ReactNode; // Optional help text
}

export function SelectField({
  label,
  field,
  state,
  options,
  className,
  required,
  disabled,
  icon,
  helpText,
  ...props
}: SelectFieldsProps) {
  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <div className="relative">
        <FormControl>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={disabled}
            required={required}
            {...props}
          >
            <SelectTrigger className={"w-full " + (icon ? "pl-10" : "")}>
              {icon && (
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  {icon}
                </div>
              )}
              <SelectValue placeholder={"choose a value"} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
        {helpText}
      </div>
      <FormMessage>{getErrorMessage(state, field.name)}</FormMessage>
    </FormItem>
  );
}
