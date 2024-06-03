import { ReactNode } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

import { Card } from '../card'
import { Close } from './../../../assets/components'

export type Props = {
  children: ReactNode
  onOpenChange: (open: boolean) => void
  open: boolean
  title?: string
}

export const Modal = ({ children, onOpenChange, open, title }: Props) => {
  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content className={s.content}>
          <Card className={s.card}>
            <div className={s.header}>
              <Dialog.Title className={s.headerTitle}>{title}</Dialog.Title>
              <Dialog.Close className={s.headerClose}>
                <Close />
              </Dialog.Close>
            </div>

            <div className={s.body}>{children}</div>
          </Card>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
