import { ReactNode } from 'react'

import * as TabsRadixUI from '@radix-ui/react-tabs'

type Props = {
  children?: ReactNode
  className?: string
  value: string
}

export const TabsContent = ({ children, className, value }: Props) => (
  <TabsRadixUI.Content className={className} value={value}>
    {children}
  </TabsRadixUI.Content>
)
