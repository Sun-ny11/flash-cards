import { ChangeEvent, MouseEvent, ReactNode, useRef } from 'react'

import s from './fileUploader.module.scss'

import { Button } from '../button'
export type FileUploaderProps = {
  accept: string
  children: ReactNode
  name: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const FileUploader = ({ accept, children, name, onChange }: FileUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const uploadFileHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    inputRef.current?.click()
  }

  return (
    <>
      <Button fullWidth onClick={uploadFileHandler} variant={'secondary'}>
        {children}
      </Button>
      <input
        accept={accept}
        className={s.hidden}
        name={name}
        onChange={onChange}
        ref={inputRef}
        type={'file'}
      />
    </>
  )
}
