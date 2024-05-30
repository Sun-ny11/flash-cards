import { ComponentPropsWithoutRef } from 'react'

import { ChevronUp } from '@/assets/icons/iconForSelect/chevronUp'
import { Typography } from '@/components/ui/typography'
import * as SelectRadix from '@radix-ui/react-select'

import s from './select.module.scss'

type Props = {
  label?: string
} & ComponentPropsWithoutRef<typeof SelectRadix.Root>

export const Select = ({}: Props) => {
  return (
    <>
      <Typography>Select Box</Typography>

      <SelectRadix.Root>
        <SelectRadix.Trigger
          style={{
            alignItems: 'center',
            backgroundColor: 'inherit',
            border: '1px solid white',
            display: 'flex',
            // height: '36px',
            justifyContent: 'space-between',
            maxWidth: '210px',
            padding: '5px',
            width: '100%',
          }}
        >
          <SelectRadix.Value style={{ color: 'black' }} />
          <ChevronUp />
          {/*<ChevronDown />*/}
        </SelectRadix.Trigger>

        <SelectRadix.Portal>
          <SelectRadix.Content
            className={s.SelectContent}
            position={'popper'}
            sideOffset={5}
            style={{ border: '1px solid white' }}
          >
            {/*<ChevronUp />*/}
            <SelectRadix.Viewport style={{ background: 'inherit' }}>
              <SelectRadix.Item style={{ color: 'white' }} value={'0'}>
                <SelectRadix.ItemText> 321131654fddff</SelectRadix.ItemText>
              </SelectRadix.Item>

              <SelectRadix.Group>
                <SelectRadix.Label />
                <SelectRadix.Item style={{ color: 'white' }} value={'1'}>
                  <SelectRadix.ItemText> 123</SelectRadix.ItemText>
                </SelectRadix.Item>
                <SelectRadix.Item style={{ color: 'white' }} value={'2'}>
                  <SelectRadix.ItemText> 2423</SelectRadix.ItemText>
                </SelectRadix.Item>
                <SelectRadix.Item style={{ color: 'white' }} value={'3'}>
                  <SelectRadix.ItemText> 3323</SelectRadix.ItemText>
                </SelectRadix.Item>
              </SelectRadix.Group>

              <SelectRadix.Separator />
            </SelectRadix.Viewport>
            <SelectRadix.ScrollDownButton />
            <SelectRadix.Arrow />
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    </>
  )
}

// type Props = {
//   label: string
// } & ComponentPropsWithoutRef<typeof SelectRadix.Root>
//
// const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']
//
// export const Select = forwardRef<ElementRef<typeof SelectRadix.Root>, Props>(
//   ({ children, label, ...props }: Props) => {
//     const [toggled, setToggled] = useState<'closed' | 'open'>('closed')
//
//     return (
//       <>
//         <Typography as={'label'} variant={'body2'}>
//           {label}
//         </Typography>
//         <SelectRadix.Root
//           {...props}
//           defaultValue={items?.[0]}
//           onOpenChange={e => setToggled(e === true ? 'open' : 'closed')}
//         >
//           <SelectRadix.Trigger asChild data-state={toggled} {...props}>
//             <SelectRadix.Value />
//             <SelectRadix.Icon>
//               <ChevronDown />
//             </SelectRadix.Icon>
//           </SelectRadix.Trigger>
//           <SelectRadix.Portal>
//             <SelectRadix.Content position={'popper'} sideOffset={5}>
//               <SelectRadix.ScrollUpButton>
//                 <ChevronUp />
//               </SelectRadix.ScrollUpButton>
//               <SelectRadix.Viewport>
//                 <SelectRadix.Group>12</SelectRadix.Group>
//               </SelectRadix.Viewport>
//               <SelectRadix.ScrollDownButton>
//                 <ChevronDown />
//               </SelectRadix.ScrollDownButton>
//             </SelectRadix.Content>
//           </SelectRadix.Portal>
//         </SelectRadix.Root>
//       </>
//     )
//   }
// )
//
// type ItemProps = ComponentPropsWithoutRef<typeof SelectRadix.Item>
//
// export const SelectItem = forwardRef<ElementRef<typeof SelectRadix.Item>, ItemProps>(
//   ({ children, ...props }, forwardedRef) => {
//     return (
//       <SelectRadix.Item {...props} ref={forwardedRef}>
//         <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
//       </SelectRadix.Item>
//     )
//   }
// )
