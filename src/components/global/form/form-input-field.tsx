import * as React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";

type FormInputFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  type?: string;
};

export function FormInputField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  type = "text",
}: FormInputFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full gap-[6px]">
          {label && <FormLabel className="text-sm font-medium">{label}</FormLabel>}
          <FormControl>
            <Input {...field} placeholder={placeholder} type={type} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
