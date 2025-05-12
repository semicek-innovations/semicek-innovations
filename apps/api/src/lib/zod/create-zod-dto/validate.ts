import { BadRequestException } from '@nestjs/common'
import { Language, multiLangText } from '@semicek-innovations/i18n'
import { validationsMessages } from '@semicek-innovations/shared-schemas'
import { ZodType } from 'zod'

export function validate<T extends ZodType<any, any>>(schema: T, data: any, lang?: Language): T['_output'] {
  const result = schema.safeParse(data)

  if (!result.success) {
    // Map errors into a user-friendly format.
    const { fieldErrors } = result.error.flatten()
    const errors = Object.entries(fieldErrors).reduce((acc, [key, value]) => {
      if (value) {
        acc[key] = value.map(error =>
          error in validationsMessages ? multiLangText(validationsMessages[error], { lang }) : error
        )
      }
      return acc
    }, {})
    throw new BadRequestException({ message: 'Validation failed', errors })
  }

  return result.data
}
