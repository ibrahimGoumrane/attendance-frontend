"use client";

import React from "react";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { State } from "@/lib/schemas/base";
import { getErrorMessage } from "@/lib/utils";

interface FileFieldProps {
  label: string;
  field: ControllerRenderProps<FieldValues, string>;
  state: State;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;
  helpText?: React.ReactNode;
}

export function FileField({
  label,
  field,
  state,
  className,
  required,
  disabled,
  multiple,
  accept,
  helpText,
}: FileFieldProps) {
  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>{" "}
      <FormControl>
        <Input
          type="file"
          disabled={disabled}
          required={required}
          multiple={multiple}
          accept={accept}
          name={field.name}
          onChange={(e) => {
            const files = e.target.files;
            if (multiple) {
              field.onChange(files);
            } else {
              field.onChange(files?.[0] || null);
            }
          }}
          onBlur={field.onBlur}
          ref={field.ref}
        />
      </FormControl>
      {helpText && (
        <div className="text-sm text-muted-foreground">{helpText}</div>
      )}
      <FormMessage>{getErrorMessage(state, field.name)}</FormMessage>
    </FormItem>
  );
}
