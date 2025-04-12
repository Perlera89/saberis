"use client";

import * as React from "react";
import { PlusCircle, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CustomSelectProps {
  placeholder: string;
  emptyMessage: string;
  disabled?: boolean;
  options: { value: string; label: string }[];
  value: string;
  onChange: (
    value: string,
    options?: { value: string; label: string }[]
  ) => void;
  addOptionToServer: (name: string) => Promise<boolean>;
}

export default function CustomSelect({
  placeholder,
  emptyMessage,
  disabled = false,
  options,
  value,
  onChange,
  addOptionToServer,
}: CustomSelectProps) {
  const [newOption, setNewOption] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const handleAddOption = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (newOption.trim() !== "") {
      const newOptionObject = {
        value: newOption.toLowerCase().replace(/\s+/g, "-"),
        label: newOption.trim(),
      };

      const result = await addOptionToServer(newOptionObject.label);
      if (result) {
        const newOptions = [...options, newOptionObject];
        onChange(newOptionObject.value, newOptions);
        setNewOption("");
        setIsOpen(false);
      }
    }
  };

  const handleSelectOption = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className="w-full justify-between"
          >
            {value
              ? options.find((option) => option.value === value)?.label
              : placeholder}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <div className="max-h-[300px] overflow-y-auto m-1">
            {options.length > 0 ? (
              options.map((option) => (
                // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                <div
                  key={option.value}
                  className="flex items-center px-2 py-2 text-sm cursor-pointer hover:bg-muted"
                  onClick={() => handleSelectOption(option.value)}
                >
                  <div className="flex items-center justify-center w-6">
                    {option.value === value && <Check className="h-4 w-4" />}
                  </div>
                  <span className="pl-2">{option.label}</span>
                </div>
              ))
            ) : (
              <div className="py-4 text-center">{emptyMessage}</div>
            )}
          </div>
          {!disabled && (
            <div className="flex items-center gap-2 p-2 border-t">
              <Input
                type="text"
                placeholder="Nueva opción"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                className="flex-grow w-full"
              />
              <Button onClick={handleAddOption} type="button" size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Agregar
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
