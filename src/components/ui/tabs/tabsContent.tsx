import { ReactNode } from 'react'

import * as TabsRadixUI from '@radix-ui/react-tabs'

type Props = {
  children?: ReactNode
  value: string
}

export const TabsContent = ({ children, value }: Props) => (
  <TabsRadixUI.Content value={value}>{children}</TabsRadixUI.Content>
)
