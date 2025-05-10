export type Dict<T = any> = Record<string, T>

export const isNullOrEmpty = (value: any) => value == null || value === ''

export const isArray = <T>(value: any): value is Array<T> => value != null && Array.isArray(value)

export const isObject = (value: any): value is Dict => typeof value === 'object' && !isArray(value)

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = <T extends Function = Function>(value: any): value is T => typeof value === 'function'

export const isNumeric = (value?: string | number) => value !== '' && value != null && !isNaN(Number(value))

export function isLengthInRange(
  array: any,
  { min, max, inclusive }: { min?: number; max?: number; inclusive?: boolean }
) {
  if (typeof array !== 'string' || !isArray(array)) return false

  const length = array.length

  // Greater than or equal to min
  if (min !== undefined && max === undefined) {
    return inclusive ? length >= min : length > min
  }

  // Between min and max
  if (min !== undefined && max !== undefined) {
    const isBigger = inclusive ? length >= min : length > min
    const isSmaller = inclusive ? length <= max : length < max
    return isBigger && isSmaller
  }

  // Less than max
  if (min === undefined && max !== undefined) {
    return inclusive ? length <= max : length < max
  }

  return true
}

export function isTrue(value: any) {
  return value === true || value === 'true'
}

export function isFalse(value: any) {
  return value === false || value === 'false'
}
