export type FieldErrorsShape = {
  errors: {
    [key: string | number | symbol]: string[] | undefined
  }
}

export function isFieldErrorsShape(data: any): data is FieldErrorsShape {
  if (typeof data !== 'object' || data == null || typeof data.errors !== 'object' || data.errors == null) {
    return false
  }

  for (const key of Reflect.ownKeys(data.errors)) {
    const value = data.errors[key as keyof typeof data.errors]
    if (value !== undefined && !Array.isArray(value)) return false
    if (Array.isArray(value) && !value.every(v => typeof v === 'string')) return false
  }

  return true
}
