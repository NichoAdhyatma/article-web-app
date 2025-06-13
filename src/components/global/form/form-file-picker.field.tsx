import * as React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";
import { FilePicker } from "../file-picker";

type FormFilePickerFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
};

export function FormFilePickerField<T extends FieldValues>({
  control,
  name,
  label,
  description,
}: FormFilePickerFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full gap-[6px]">
          {label && (
            <FormLabel className="text-sm font-medium">{label}</FormLabel>
          )}
          <FormControl>
            <FilePicker
              value={field.value}
              onFileSelect={field.onChange}
              disabled={field.disabled}
              onBlur={field.onBlur}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
