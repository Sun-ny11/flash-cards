// import { ReactNode } from 'react'
//
// import { Typography } from '@/components/ui/typography'
// import * as TabsRadixUI from '@radix-ui/react-tabs'
//
// import s from './tabs.module.scss'
//
// export type TabType = {
//   disabled?: boolean
//   /** title - Название таба */
//   title: string
//   /** value - Уникальный идентификатор таба, который используется для связи триггера и контента таба */
//   value: string
// }
//
// type Props = {
//   /** TabContent будет передаваться как children */
//   children?: ReactNode
//   tabs: TabType[]
// }
//
// export const Tabs = ({ children, tabs }: Props) => (
//   <TabsRadixUI.Root>
//     <TabsRadixUI.List className={s.tabs}>
//       {tabs.map(tab => {
//         return (
//           <TabsRadixUI.Trigger key={tab.value} value={tab.value}>
//             <Typography className={s.trigger} variant={'body1'}>
//               {tab.title}
//             </Typography>
//           </TabsRadixUI.Trigger>
//         )
//       })}
//     </TabsRadixUI.List>
//     {children}
//   </TabsRadixUI.Root>
// )

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

import s from './tabs.module.scss'

const Tabs = TabsPrimitive.Root

const TabsList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List className={clsx(s.list, className)} ref={ref} {...props} />
))

TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger className={clsx(s.trigger, className)} ref={ref} {...props} />
))

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content className={clsx(s.content, className)} ref={ref} {...props} />
))

TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }
