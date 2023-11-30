import { createContext } from "react"

type ContextProps = {
  loading: boolean
  user: any | null
  authenticated: boolean
  setUser: any
  isOwner: boolean
}

export const AuthContext = createContext<Partial<ContextProps>>({})

type AuthProviderProps = {
  loading: boolean
  user: any | null
  setUser: any
  isOwner: boolean
  children: React.ReactNode
}

export const AuthProvider = (props: AuthProviderProps) => {
  const { loading, user, setUser, children, isOwner } = props
  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        authenticated: user !== null,
        setUser,
        isOwner,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
