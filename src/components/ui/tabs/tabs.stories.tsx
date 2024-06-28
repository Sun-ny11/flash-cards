import type { Meta, StoryObj } from '@storybook/react'

import { TabsContent } from '@/components/ui/tabs/tabsContent'

import { Tabs } from './'

const meta = {
  //   argTypes: {
  //     variant: {
  //       control: { type: 'radio' },
  //       options: ['primary', 'secondary'],
  //     },
  //   }, Нужна для кастомизации управления истории

  component: Tabs, // Компонент для истории
  tags: ['autodocs'], // Автогенерация документации
  title: 'Components/Tabs', // Имена папок в истории
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta> // Тип истории

// История
export const Primary: Story = {
  // args - пропсы
  args: {
    children: (
      <>
        <TabsContent value={'tab1'}>
          <p>
            First tab content: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus,
            nulla.
          </p>
        </TabsContent>
        <TabsContent value={'tab2'}>
          <p>
            Second tab content: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus,
            nulla.
          </p>
        </TabsContent>
        <TabsContent value={'tab3'}>
          <p>
            Third tab content: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus,
            nulla.
          </p>
        </TabsContent>
      </>
    ),
    value: 'tab1',
  },
}

// tabs: [
//   {
//     title: 'First tab',
//     value: 'tab1',
//   },
//   {
//     title: 'Second tab',
//     value: 'tab2',
//   },
//   {
//     title: 'Third tab',
//     value: 'tab3',
//   },
// ],
