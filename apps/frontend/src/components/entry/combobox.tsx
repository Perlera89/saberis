"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type ComboboxOption = {
  value: string;
  label: string;
};

interface SearchableComboboxProps {
  title: string;
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
  disabled?: boolean;
}

export function Combobox({
  title,
  options,
  value,
  onChange,
  placeholder = "Search options...",
  emptyMessage = "No results found.",
  className,
  disabled = false,
}: SearchableComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const selectedOption = React.useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  const filterOptions = React.useCallback(
    (value: string) => {
      return options.filter((option) =>
        option.label.toLowerCase().includes(value.toLowerCase())
      );
    },
    [options]
  );

  return (
    <div className={cn("grid w-full gap-1.5", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-muted-foreground font-medium"
            disabled={disabled}
            id={title}
          >
            {selectedOption ? selectedOption.label : title}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-2xl p-0">
          <Command
            filter={(value, search) => {
              if (value.toLowerCase().includes(search.toLowerCase())) return 1;
              return 0;
            }}
          >
            <CommandInput
              placeholder={placeholder}
              value={inputValue}
              onValueChange={setInputValue}
            />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-auto">
                {filterOptions(inputValue).map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    className="flex justify-between"
                    onSelect={() => {
                      onChange(option.value);
                      setOpen(false);
                      setInputValue("");
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
