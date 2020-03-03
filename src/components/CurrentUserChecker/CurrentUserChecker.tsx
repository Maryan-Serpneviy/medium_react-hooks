import React, { useEffect, useContext } from 'react'
import { useFetch } from '@/hooks/useFetch'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { CurrentUserContext, CurrentUserStateType } from '@/context/currentUser'
import { TOKEN_KEY } from '@/constants'

type Props = {
   children: JSX.Element[] | JSX.Element
}

export default function CurrentUserChecker({ children }: Props) {
   const [{ response }, doFetch] = useFetch('user')
   const [, setCurrentUserState] = useContext(CurrentUserContext)
   const [token] = useLocalStorage(TOKEN_KEY)

   useEffect(() => {
      if (!token) {
         setCurrentUserState((state: CurrentUserStateType) => ({
            ...state,
            isLogggedIn: false
         }))
         return
      }

      doFetch()
      setCurrentUserState((state: CurrentUserStateType) => ({
         ...state,
         isLoading: true
      }))
   }, [])

   useEffect(() => {
      if (!response) {
         return
      }

      setCurrentUserState((state: CurrentUserStateType) => ({
         ...state,
         isLogggedIn: true,
         isLoading: false,
         currentUser: response.user
      }))
   }, [response, setCurrentUserState])

   return children
}
