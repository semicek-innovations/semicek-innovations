'use client'

import { forwardRef } from 'react'
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form'

export interface FormProps<T extends FieldValues> extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  form: UseFormReturn<T>
  onSubmit: SubmitHandler<T>
}

export const Form = forwardRef(function Form<T extends FieldValues>(
  { children, form, onSubmit, noValidate = true, ...props }: FormProps<T>,
  ref: React.ForwardedRef<HTMLFormElement>
) {
  return (
    <FormProvider {...form}>
      <form ref={ref} onSubmit={form.handleSubmit(onSubmit as any)} noValidate={noValidate} {...props}>
        {children}
      </form>
    </FormProvider>
  )
})
