import { useForm } from 'react-hook-form'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'

import s from './decksFilter.module.scss'

type Props = {
  currentTab: string
  handleTabChange: (value: string) => void
}

const DecksFilter = ({ currentTab, handleTabChange }: Props) => {
  const { control } = useForm({
    defaultValues: {
      search: '',
    },
  })

  return (
    <div className={s.container}>
      <ControlledTextField control={control} name={'search'} placeholder={'Search...'} />
      <Tabs asChild onValueChange={handleTabChange} value={currentTab}>
        <TabsList>
          <TabsTrigger value={'my'}>My decks</TabsTrigger>
          <TabsTrigger value={'all'}>All decks</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

export default DecksFilter
