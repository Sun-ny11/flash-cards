import { useForm } from 'react-hook-form'

import { TrashOutline } from '@/assets/components'
import { Button, Slider, Tabs, TabsList, TabsTrigger, Typography } from '@/components/ui'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'

import s from './decksFilter.module.scss'

type Props = {
  cardsRange: (number | undefined)[]
  currentTab: string
  handleTabChange: (value: string) => void
  maxRange?: number
  minRange?: number
  resetAllFilters: () => void
  searchValue: null | string
  setCardsRange: (value: number[]) => void
  setSearchValue: (value: string) => void
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
  const { control, setValue } = useForm({
    defaultValues: {
      search: '',
    },
  })

  if (minRange === undefined || maxRange === undefined) {
    return null
  }
  const reset = () => {
    resetAllFilters()
    setValue('search', '')
  }

  return (
    <div className={s.container}>
      <div className={s.search}>
        <Typography className={s.label} variant={'body2'}>
          Search by name
        </Typography>
        <ControlledTextField
          control={control}
          name={'search'}
          onValueChange={setSearchValue}
          placeholder={'Search...'}
        />
      </div>
      <div className={s.tabsContainer}>
        <Typography className={s.label} variant={'body2'}>
          Show decks cards
        </Typography>
        <Tabs asChild onValueChange={handleTabChange} value={currentTab}>
          <TabsList>
            <TabsTrigger value={'my'}>My decks</TabsTrigger>
            <TabsTrigger value={'all'}>All decks</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className={s.sliderContainer}>
        <Typography className={s.label} variant={'body2'}>
          Number of cards
        </Typography>
        <Slider max={maxRange} min={minRange} onValueChange={setCardsRange} value={cardsRange} />
      </div>
      <Button onClick={reset} variant={'secondary'}>
        <TrashOutline />
        <Typography variant={'subtitle2'}>Clear filter</Typography>
      </Button>
    </div>
  )
}

export default DecksFilter
