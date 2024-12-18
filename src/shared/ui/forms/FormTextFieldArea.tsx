"use client"
import React from 'react'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextArea, TextAreaProps } from '@momecap/ui-kit-snapmoment'

export type ControlledInputProps<TFieldValues extends FieldValues> = {
  className?: string
  currentValue?: string
  resize?: boolean
} & {
  currentValue?: TFieldValues[Extract<keyof TFieldValues, string>]
} & Omit<TextAreaProps, 'onChange' | 'value'> &
Omit<UseControllerProps<TFieldValues>, 'defaultValue' | 'disabled' | 'rules'>

export const FormTextfieldArea = <TFieldValues extends FieldValues>({
  control,
  name,
  ...rest
}: ControlledInputProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error }
  } = useController<TFieldValues>({
    control,
    name
  })

  return <TextArea {...rest} {...field} resize={rest.resize} />
}
