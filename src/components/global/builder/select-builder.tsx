"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReusableSelectProps {
  options: { label: string; value: string }[];
  placeholder?: string;
  value?: string;
  onChange?: (value?: string) => void;
  className?: string;
  withClearOption?: boolean;
  clearLabel?: string;
}

const CLEAR_VALUE = "-";

export default function SelectBuilder({
  options,
  placeholder = "Select an option",
  value,
  onChange,
  className = "max-w-sm w-fit",
  withClearOption = true,
  clearLabel = "All",
}: ReusableSelectProps) {
  const finalOptions = withClearOption
    ? [{ label: clearLabel, value: CLEAR_VALUE }, ...options]
    : options;

  const handleValueChange = (selectedValue: string) => {
    if (selectedValue === CLEAR_VALUE) {
      onChange?.(undefined);
    } else {
      onChange?.(selectedValue);
    }
  };

  return (
    <Select value={value ?? CLEAR_VALUE} onValueChange={handleValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {finalOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
