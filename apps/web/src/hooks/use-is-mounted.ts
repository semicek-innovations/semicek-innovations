import { MaybePromise, maybePromise } from '@semicek-innovations/shared-utils'
import { useEffect, useState } from 'react'

export function useIsMounted(fn: MaybePromise = () => {}, deps: React.DependencyList = []) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    maybePromise(fn).finally(() => {
      !isMounted && setIsMounted(true)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return isMounted
}
