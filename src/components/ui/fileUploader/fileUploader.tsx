import { ChangeEvent, ReactNode, useRef } from 'react'

import s from './fileUploader.module.scss'

import { Button } from '../button'
export type Props = {
  accept: string
  children: ReactNode
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const FileUploader = ({ accept, children, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const uploadFileHandler = () => {
    inputRef.current?.click()
  }

  return (
    <>
      <Button onClick={uploadFileHandler} variant={'secondary'}>
        {children}
      </Button>
      <input
        accept={accept}
        className={s.hidden}
        onChange={onChange}
        ref={inputRef}
        type={'file'}
      />
    </>
  )
}
