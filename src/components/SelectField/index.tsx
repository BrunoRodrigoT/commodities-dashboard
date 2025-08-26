/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Control, useController } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface SelectFieldProps<T> {
  name: string;
  control: Control<any>;
  options: T[];
  optionLabelKey: keyof T;
  optionValueKey: keyof T;
  label?: string;
  placeholder?: string;
  className?: string;
}

export function SelectField<T>({
  name,
  control,
  options,
  label,
  optionLabelKey,
  optionValueKey,
  placeholder = "Select an option",
  className,
}: SelectFieldProps<T>) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const selectedValue = value ? String(value) : "";

  const handleChange = (val: string) => {
    const selectedOption = options.find(
      (opt) => String(opt[optionValueKey]) === val
    );
    onChange(selectedOption ? selectedOption[optionValueKey] : val);
  };

  return (
    <div className={className}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Select onValueChange={handleChange} value={selectedValue}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {label && <SelectLabel>{label}</SelectLabel>}
            {options.map((option, index) => (
              <SelectItem
                key={String(option[optionValueKey]) + index}
                value={String(option[optionValueKey])}
              >
                {String(option[optionLabelKey])}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && <p className="text-destructive text-sm">{error.message}</p>}
    </div>
  );
}
