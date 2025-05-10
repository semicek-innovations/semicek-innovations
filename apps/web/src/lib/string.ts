import { isArray, isNullOrEmpty, isObject } from './assertions'

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const toCamelCase = (key: string) => key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
export const toKebabCase = (string: string) =>
  string
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .trim()
export const removeAccents = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
export const escapeRegex = (value: string): string => value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
export const normalizeString = (string: string) => removeAccents(string).toLowerCase()
export const normalizeStrings = (...strings: string[]) => strings.map(normalizeString)

export function replaceNonDigits<T extends string | undefined = undefined>(
  input: string,
  replacement: string = '',
  split?: T
): T extends undefined ? string : string[] {
  // Remove leading and trailing non-digit characters
  input = input.replace(/^\D+|\D+$/g, '')
  // Replace sequences of non-digit characters with the replacement
  const result = input.replace(/\D+/g, replacement)
  return (split ? result.split(split) : result) as any
}

export function replaceNonAlphabets<T extends string | undefined = undefined>(
  input: string,
  replacement: string = '',
  split?: T,
  exceptions: string = ''
): T extends undefined ? string : string[] {
  // Remove leading and trailing non-alphabetical characters
  const regexForTrim = new RegExp(`^[^a-zA-Z${exceptions}]+|[^a-zA-Z${exceptions}]+$`, 'g')
  input = input.replace(regexForTrim, '')
  // Replace sequences of non-alphabetical characters with the replacement
  const regexForReplace = new RegExp(`[^a-zA-Z${exceptions}]+`, 'g')
  const result = input.replace(regexForReplace, replacement)
  return (split ? result.split(split) : result) as any
}

export const defaultStringValue = (value?: string | null, defaultValue?: string | null) =>
  !isNullOrEmpty(value) ? value : defaultValue

export type OrderBy = 'asc' | 'desc'

export function search<T, K extends keyof T>(
  array: T[] | undefined,
  searchParam: K | K[],
  searchTerm: string,
  shouldSort: boolean = true,
  orderBy?: OrderBy
) {
  if (!array) return []

  const searchParams = isArray(searchParam) ? searchParam : [searchParam]
  const filteredItems = array.filter(item => {
    const values = searchParams.map(searchParam => String(item[searchParam]))
    const [t, ...v] = normalizeStrings(String(searchTerm), ...values)
    return v.some(value => value.includes(t))
  })

  if (shouldSort) {
    return sort(filteredItems, searchParams[0], orderBy, searchTerm)
  }

  return filteredItems
}

export function sort<T, K extends keyof T>(array: T[], sortBy: K, orderBy: OrderBy = 'asc', value?: string): T[] {
  if (!value) {
    return array.sort((a, b) => {
      const value1 = isObject(a) ? String(a?.[sortBy] ?? '') : String(a)
      const value2 = isObject(b) ? String(b?.[sortBy] ?? '') : String(b)

      if (orderBy === 'asc') {
        return value1.localeCompare(value2)
      } else {
        return value2.localeCompare(value1)
      }
    })
  }

  return array.sort((a, b) => {
    const value1 = isObject(a) ? String(a?.[sortBy] ?? '') : String(a)
    const value2 = isObject(b) ? String(b?.[sortBy] ?? '') : String(b)

    const [nA, nB, nS] = normalizeStrings(value1, value2, value)
    const indexA = nA.indexOf(nS)
    const indexB = nB.indexOf(nS)

    if (indexA === indexB) {
      // If value is at the same position or absent in both
      if (orderBy === 'asc') {
        return value1.localeCompare(value2)
      } else {
        return value2.localeCompare(value1)
      }
    } else if (indexA === -1) {
      // value is not in A, B should come first
      return 1
    } else if (indexB === -1) {
      // value is not in B, A should come first
      return -1
    } else {
      // If value is in different positions, sort based on its position
      return indexA - indexB
    }
  })
}
