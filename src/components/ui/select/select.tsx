import * as SelectRadix from '@radix-ui/react-select'

type Props = {}

export const Select = (props: Props) => {
  return (
    <SelectRadix.Root>
      <SelectRadix.Trigger>
        <SelectRadix.Value />
        <SelectRadix.Icon />
      </SelectRadix.Trigger>

      <SelectRadix.Portal>
        <SelectRadix.Content>
          <SelectRadix.ScrollUpButton />
          <SelectRadix.Viewport>
            <SelectRadix.Item>
              <SelectRadix.ItemText />
              <SelectRadix.ItemIndicator />
            </SelectRadix.Item>

            <SelectRadix.Group>
              <SelectRadix.Label />
              <SelectRadix.Item>
                '1'
                {/*<SelectRadix.ItemText/>*/}
                {/*<SelectRadix.ItemIndicator />*/}
              </SelectRadix.Item>
            </SelectRadix.Group>

            <SelectRadix.Separator />
          </SelectRadix.Viewport>
          <SelectRadix.ScrollDownButton />
          <SelectRadix.Arrow />
        </SelectRadix.Content>
      </SelectRadix.Portal>
    </SelectRadix.Root>
  );
};