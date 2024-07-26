import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { MoreVerticalOutline, PlayCircleOutline, TrashOutline } from '@/assets/components'
import { Button } from '@/components/ui'
import { DropDown, DropDownItem, DropDownSeparator } from '@/components/ui/dropdown'
import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { HandleDeckComponent } from '@/features/tables/decks/ui/decksPage/HandleDeckComponent/HandleDeckComponent'
import { Deck } from '@/services/decks/decks.types'
import { useDeleteDeckMutation } from '@/services/decks/decksApi'
import clsx from 'clsx'

import s from './card-dropdown.module.scss'

type Props = {
  deck: Deck
}

export const CardDropdown = ({ deck }: Props) => {
  const [deleteDeck, { isLoading: deleteDeckIsLoading }] = useDeleteDeckMutation()
  const [open, setOpen] = useState(false)

  return (
    <>
      <DropDown trigger={<MoreVerticalOutline />}>
        <DropDownItem>
          <Button
            as={NavLink}
            className={clsx(deleteDeckIsLoading ? s.disabled : '', s.option)}
            to={`/decks/${deck.id}/learn`}
            variant={'withSVG'}
          >
            <PlayCircleOutline />
            <Typography as={'div'} variant={'caption'}>
              Learn
            </Typography>
          </Button>
        </DropDownItem>
        <DropDownSeparator></DropDownSeparator>
        <DropDownItem asChild>
          <HandleDeckComponent
            className={s.option}
            deckId={deck.id}
            defaultValues={deck}
            isEditMode
            label={'Edit'}
          />
        </DropDownItem>
        <DropDownSeparator></DropDownSeparator>
        <DropDownItem asChild>
          <>
            <Button className={s.option} onClick={() => setOpen(true)} variant={'withSVG'}>
              <TrashOutline />
              <Typography as={'div'} variant={'caption'}>
                Delete
              </Typography>
            </Button>
            <Modal
              onOpenChange={() => {
                setOpen(false)
              }}
              open={open}
              title={`Delete ${deck.name}`}
            >
              <div className={s.content}>
                <Typography>
                  Do you really want to remove deck {deck.name}?
                  <br />
                  All cards will be deleted.
                </Typography>
                <div className={s.buttons}>
                  <Button onClick={() => setOpen(false)} variant={'secondary'}>
                    Cancel
                  </Button>
                  <Button disabled={deleteDeckIsLoading} onClick={() => deleteDeck(deck.id)}>
                    Delete {deck.name}
                  </Button>
                </div>
              </div>
            </Modal>
          </>
        </DropDownItem>
      </DropDown>
    </>
  )
}
