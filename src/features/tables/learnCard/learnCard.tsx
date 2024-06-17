import { useState } from 'react'

import { PlayCircleOutline } from '@/assets/components'
import { Button, Typography } from '@/components/ui'
import { Modal } from '@/components/ui/modal'
import { Deck } from '@/services/decks/decks.types'
import clsx from 'clsx'

import s from './learnCard.module.scss'

type Props = {
  className?: string
  deck: Deck
}

export const LearnCard = ({ className, deck }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        className={clsx(s.openModal, className)}
        onClick={() => setOpen(true)}
        variant={'withSVG'}
      >
        <PlayCircleOutline />
      </Button>
      <Modal
        onOpenChange={() => {
          setOpen(false)
        }}
        open={open}
        title={`Learn "${deck.name}"`}
      >
        <div className={s.content}>
          <Typography>Question</Typography>
          <div className={s.buttons}>
            <Button onClick={() => setOpen(false)} variant={'secondary'}>
              Show Answer
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
