import { auth } from '../firebase/config'

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'
import type { User } from '../interfaces/User'
import type { UserLoginDTO } from '../interfaces/UserLoginDTO'

export const useAuthentication = () => {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    // cleanup
    // deal with memory leak
    const [cancelled, setCancelled] = useState<boolean>(false)

    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }

    const createUser = async (data: User) => {
        checkIfIsCancelled()
        setLoading(true)
        setError(null)

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false)

            return user
        } catch (error: unknown) {
            if (error instanceof Error) {
                const errorCode = 'code' in error && typeof error.code === 'string' ? error.code : undefined

                let systemErrorMessage
                if (errorCode === 'auth/weak-password') {
                    systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres."
                } else if (errorCode === 'auth/email-already-in-use') {
                    systemErrorMessage = "E-mail já cadastrado."
                } else {
                    systemErrorMessage = "Ocorreu um erro, por favor tente novamente mais tarde..."
                }
                setError(systemErrorMessage)
            } else {
                setError('Ocorreu um erro ao criar o usuário.')
            }
            setLoading(false)
        }
    }

    // logout - sign out
    const logout = () => {
        checkIfIsCancelled()
        signOut(auth)
    }
    // login - sig in
    const login = async (data: UserLoginDTO) => {
        checkIfIsCancelled()
        setLoading(true)
        setError(null)

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)
        } catch (error) {
            if (error instanceof Error) {
                const errorCode = 'code' in error && typeof error.code === 'string' ? error.code : undefined

                let systemErrorMessage
                if (errorCode === 'auth/invalid-credential') {
                    systemErrorMessage = "Usuário ou senha inválidos"
                } else {
                    systemErrorMessage = "Ocorreu um erro, por favor tente novamente mais tarde..."
                }
                setError(systemErrorMessage)
            } else {
                setError('Ocorreu um erro ao tentar realizar o login.')
            }
            setLoading(false)
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        logout,
        login,
        error,
        loading
    }
}