import { ReactNode } from 'react'

import { Typography } from '@/components/ui/typography'
import * as TabsRadixUI from '@radix-ui/react-tabs'

import s from './tabs.module.scss'

export type TabType = {
  disabled?: boolean
  /** title - Название таба */
  title: string
  /** value - Уникальный идентификатор таба, который используется для связи триггера и контента таба */
  value: string
}

type Props = {
  /** TabContent будет передаваться как children */
  children?: ReactNode
  tabs: TabType[]
}

export const Tabs = ({ children, tabs }: Props) => (
  <TabsRadixUI.Root>
    <TabsRadixUI.List className={s.tabs}>
      {tabs.map(tab => {
        return (
          <TabsRadixUI.Trigger key={tab.value} value={tab.value}>
            <Typography className={s.trigger} variant={'body1'}>
              {tab.title}
            </Typography>
          </TabsRadixUI.Trigger>
        )
      })}
    </TabsRadixUI.List>
    {children}
  </TabsRadixUI.Root>
)
