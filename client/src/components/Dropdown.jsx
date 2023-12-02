import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const doctors = [
  {
    value: "Emily Carter",
    label: "Emily Carter",
  },
  {
    value: "Alexander Patel",
    label: "Alexander Patel",
  },
  {
    value: "Ethan Thompson",
    label: "Ethan Thompson",
  },
  {
    value: "John Doe",
    label: "John Doe",
  },
  {
    value: "Samuel Lee",
    label: "Samuel Lee",
  },
]

export function Dropdown({value, setValue}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? doctors.find((doctor) => doctor.value === value)?.label
            : "Select a Doctor..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search a Doctor..." />
          <CommandEmpty>No Doctors found.</CommandEmpty>
          <CommandGroup>
            {doctors.map((doctor) => (
              <CommandItem
                key={doctor.value}
                value={doctor.value}
                onSelect={(currentValue) => {
                  setValue(currentValue == value ? "" : doctor.label)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value == doctor.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {doctor.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
