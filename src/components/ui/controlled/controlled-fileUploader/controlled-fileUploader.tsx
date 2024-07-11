import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

import s from './controlled-fileUploader.module.scss'

import defaultImage from '../../../../assets/images/defaultCard.webp'
import { Button } from '../../button'
import { FileUploader } from '../../fileUploader'
export type ControlledFileUploaderProps<T extends FieldValues> = {
  accept: string
  children: ReactNode
  control: Control<T>
  imgFromCard?: null | string
  name: Path<T>
}

export const ControlledFileUploader = <T extends FieldValues>({
  accept,
  children,
  control,
  imgFromCard,
  name,
}: ControlledFileUploaderProps<T>) => {
  const {
    field: { onChange },
  } = useController({
    control,
    name,
  })

  const [fileURL, setFileURL] = useState<string>()
  // const formData = new FormData()

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]

      // formData.append('cover', file)

      onChange(file)

      setFileURL(URL.createObjectURL(file))
    }
  }

  const deleteImageHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onChange('')
    setFileURL('')
  }

  return (
    <>
      <img alt={'img'} className={s.image} src={fileURL || imgFromCard || defaultImage} />

      <div className={s.buttons}>
        {fileURL ? (
          <Button fullWidth onClick={deleteImageHandler} variant={'secondary'}>
            Delete Image
          </Button>
        ) : (
          ''
        )}

        <FileUploader accept={accept} name={name} onChange={onChangeHandler}>
          {fileURL ? 'Change Image' : children}
        </FileUploader>
      </div>
    </>
  )
}
