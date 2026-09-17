import type { User as FirebaseUser } from 'firebase/auth'
import { createContext, useContext, type ReactNode } from 'react'

type AuthContextValue = {
    user: FirebaseUser | null
}

const AuthContext = createContext<AuthContextValue | null>(null)

type AuthProviderProps = {
    children: ReactNode
    value: AuthContextValue
}

export function AuthProvider({ children, value }: AuthProviderProps) {
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthValue() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuthValue deve ser usado dentro de AuthProvider')
    }

    return context
}