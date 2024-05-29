import * as SelectRadix from "@radix-ui/react-select";
import { ComponentPropsWithoutRef, ElementRef, forwardRef, useState } from "react";
import { ChevronDown } from "@/assets/icons/iconForSelect/chevronDown";
import { ChevronUp } from "@/assets/icons/iconForSelect/chevronUp";
import { Typography } from "@/components/ui/typography";

type Props = ComponentPropsWithoutRef<typeof SelectRadix.Root> & {
  label: string
}

const items = ["Item 1", "Item 2", "Item 3", "Item 4"];
export const Select = (
  ({ children, label, ...props }: Props) => {
    const [toggled, setToggled] = useState<"open" | "closed">("closed");

    return (
      <>
        <Typography as="label" variant="body2">
          {label}
        </Typography>
        <SelectRadix.Root {...props} defaultValue={items?.[0]}
                          onOpenChange={(e) => setToggled(e === true ? "open" : "closed")}>
          <SelectRadix.Trigger asChild data-state={toggled}  {...props} >
            <SelectRadix.Value />
            <SelectRadix.Icon>
              <ChevronDown />
            </SelectRadix.Icon>
          </SelectRadix.Trigger>
          <SelectRadix.Portal>
            <SelectRadix.Content>
              <SelectRadix.ScrollUpButton>
                <ChevronUp />
              </SelectRadix.ScrollUpButton>
              <SelectRadix.Viewport>{children}</SelectRadix.Viewport>
              <SelectRadix.ScrollDownButton>
                <ChevronDown />
              </SelectRadix.ScrollDownButton>
            </SelectRadix.Content>
          </SelectRadix.Portal>
        </SelectRadix.Root>
      </>
    );
  }
);


type ItemProps = ComponentPropsWithoutRef<typeof SelectRadix.Item>

export const SelectItem = forwardRef<ElementRef<typeof SelectRadix.Item>, ItemProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <SelectRadix.Item {...props} ref={forwardedRef}>
        <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
        <SelectRadix.ItemIndicator>
          {"children"}
        </SelectRadix.ItemIndicator>
      </SelectRadix.Item>
    );
  }
);