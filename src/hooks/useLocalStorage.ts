import { useState, useEffect } from 'react'

export function useLocalStorage(key: string, initialValue: string = '') {
   const [value, setValue] = useState(() => {
      return localStorage.getItem(key) || initialValue
   })

   useEffect(() => {
      localStorage.setItem(key, value)
   }, [value, key])

   return [value, setValue]
}
