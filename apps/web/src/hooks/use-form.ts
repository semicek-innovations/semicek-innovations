import { FieldValues, Resolver, useForm as useReactHookForm, UseFormProps, UseFormReturn } from 'react-hook-form'

import { getValidationError } from '@/lib/validation'

// this helper takes any existing resolver and returns a new one
// that pipes its messages through your `getValidationError` function
function withI18n<TFieldValues extends FieldValues = FieldValues, TContext = any, TTransformedValues = TFieldValues>(
  baseResolver: Resolver<TFieldValues, TContext, TTransformedValues>
): Resolver<TFieldValues, TContext, TTransformedValues> {
  return async (values, context, options) => {
    const result = await baseResolver(values, context, options)

    for (const key in result.errors) {
      const err = result.errors[key as keyof typeof result.errors] as any
      if (err?.message && typeof err.message === 'string') {
        err.message = getValidationError(err.message)
      }
    }

    return result
  }
}

export function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues
>(
  props?: UseFormProps<TFieldValues, TContext, TTransformedValues> & {
    i18n?: boolean
  }
): UseFormReturn<TFieldValues, TContext, TTransformedValues> {
  const { i18n = true, resolver, ...rest } = props || {}
  const wrappedResolver = resolver && i18n ? withI18n(resolver) : resolver

  return useReactHookForm<TFieldValues, TContext, TTransformedValues>({
    ...rest,
    resolver: wrappedResolver
  })
}
