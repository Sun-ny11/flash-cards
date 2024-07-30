import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

import clsx from 'clsx'

import s from './controlled-fileUploader.module.scss'

import defaultImage from '../../../../assets/images/defaultCard.webp'
import { Button } from '../../button'
import { FileUploader } from '../../fileUploader'
export type ControlledFileUploaderProps<T extends FieldValues> = {
  accept: string
  children: ReactNode
  className?: string
  control: Control<T>
  imgFromCard?: null | string
  mode?: string
  name: Path<T>
  onUpdate?: (data: { avatar: any }) => void
}

export const ControlledFileUploader = <T extends FieldValues>({
  accept,
  children,
  className,
  control,
  imgFromCard,
  mode = 'default',
  name,
  onUpdate,
}: ControlledFileUploaderProps<T>) => {
  const {
    field: { onChange },
  } = useController({
    control,
    name,
  })

  const [fileURL, setFileURL] = useState<string>()

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]

      onChange(file)

      setFileURL(URL.createObjectURL(file))

      if (onUpdate) {
        onUpdate({ avatar: file })
      }
      // Сброс значения input, чтобы можно было выбрать тот же файл снова
      e.target.value = ''
    }
  }

  const deleteImageHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onChange('delete')
    setFileURL(defaultImage)
  }

  return (
    <>
      <img
        alt={'img'}
        className={clsx(className, s.image)}
        src={fileURL || imgFromCard || defaultImage}
      />

      <div className={s.buttons}>
        {mode !== 'profile' && (fileURL || imgFromCard) && fileURL !== defaultImage ? (
          <Button fullWidth onClick={deleteImageHandler} variant={'secondary'}>
            Delete Image
          </Button>
        ) : (
          ''
        )}

        <FileUploader accept={accept} name={name} onChange={onChangeHandler}>
          {fileURL ? (mode !== 'profile' ? 'Change Image' : children) : children}
        </FileUploader>
      </div>
    </>
  )
}
