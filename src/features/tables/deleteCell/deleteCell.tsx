import { useState } from 'react'

import { TrashOutline } from '@/assets/components'
import { Button, Typography } from '@/components/ui'
import { Modal } from '@/components/ui/modal'
import clsx from 'clsx'

import s from './deleteCell.module.scss'

type Props = {
  className?: string
  deleteThat: 'card' | 'deck'
  isDisabled?: boolean
  name?: string
  onDeleteCallback: () => void
  variant?: 'link' | 'primary' | 'secondary' | 'withSVG'
}

export const DeleteCell = ({
  className,
  deleteThat,
  isDisabled,
  name,
  onDeleteCallback,
  variant,
}: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        className={clsx(s.openModal, className)}
        onClick={() => setOpen(true)}
        variant={variant || 'withSVG'}
      >
        <TrashOutline />
      </Button>
      <Modal
        onOpenChange={() => {
          setOpen(false)
        }}
        open={open}
        title={`Delete ${deleteThat}`}
      >
        <div className={s.content}>
          <Typography>
            Do you really want to remove {deleteThat === 'deck' ? `deck ${name}` : 'this card'}?
            <br />
            {deleteThat === 'deck' && 'All cards will be deleted.'}
          </Typography>
          <div className={s.buttons}>
            <Button onClick={() => setOpen(false)} variant={'secondary'}>
              Cancel
            </Button>
            <Button disabled={isDisabled} onClick={onDeleteCallback}>
              Delete {deleteThat}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
