import type { Auth } from 'firebase/auth'
import { createContext, useContext, type ReactNode } from 'react'

const AuthContext = createContext<Auth | null>(null)

type AuthProviderProps = {
    children: ReactNode
    value: Auth | null
}

export function AuthProvider({ children, value }: AuthProviderProps) {
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthValue() {
    return useContext(AuthContext)
}