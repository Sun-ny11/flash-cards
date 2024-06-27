import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'

import { Slider, Tabs, TabsList, TabsTrigger } from '@/components/ui'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'

import s from './decksFilter.module.scss'

type Props = {
  cardsRange: (number | undefined)[]
  currentTab: string
  handleTabChange: (value: string) => void
  maxRange: number
  minRange: number
  setCardsRange: Dispatch<SetStateAction<number[]>>
}

const DecksFilter = ({
  cardsRange,
  currentTab,
  handleTabChange,
  maxRange,
  minRange,
  setCardsRange,
}: Props) => {
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
      <Slider max={maxRange} min={minRange} onValueChange={setCardsRange} value={cardsRange} />
    </div>
  )
}

export default DecksFilter
