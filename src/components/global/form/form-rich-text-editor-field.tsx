"use client";

import * as React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { RichTextEditor } from "../text-editor";

interface FormRichTextEditorFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  description?: string;
}

export function FormRichTextEditorField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
}: FormRichTextEditorFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({
        field,
      }: {
        field: ControllerRenderProps<T, FieldPath<T>>;
      }) => (
        <FormItem className="w-full gap-[6px]">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RichTextEditor
              initialValue={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder={placeholder}
              disabled={field.disabled}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
