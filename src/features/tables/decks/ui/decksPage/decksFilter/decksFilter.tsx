import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'

import { Button, Slider, Tabs, TabsList, TabsTrigger } from '@/components/ui'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'

import s from './decksFilter.module.scss'

type Props = {
  cardsRange: (number | undefined)[]
  currentTab: string
  handleTabChange: (value: string) => void
  maxRange: number
  minRange: number
  resetAllFilters: () => void
  searchValue: string
  setCardsRange: Dispatch<SetStateAction<number[]>>
  setSearchValue: Dispatch<SetStateAction<string>>
}

const DecksFilter = ({
  cardsRange,
  currentTab,
  handleTabChange,
  maxRange,
  minRange,
  resetAllFilters,
  setCardsRange,
  setSearchValue,
}: Props) => {
  const { control } = useForm({
    defaultValues: {
      search: '',
    },
  })

  const reset = () => {
    resetAllFilters()
  }

  return (
    <div className={s.container}>
      <ControlledTextField
        control={control}
        name={'search'}
        onValueChange={setSearchValue}
        placeholder={'Search...'}
      />
      <Tabs asChild onValueChange={handleTabChange} value={currentTab}>
        <TabsList>
          <TabsTrigger value={'my'}>My decks</TabsTrigger>
          <TabsTrigger value={'all'}>All decks</TabsTrigger>
        </TabsList>
      </Tabs>
      <Slider max={maxRange} min={minRange} onValueChange={setCardsRange} value={cardsRange} />
      <Button onClick={reset} variant={'secondary'}>
        Clear filter
      </Button>
    </div>
  )
}

export default DecksFilter
