import { db } from '../firebase/config'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'
import type { User } from '../interfaces/User'

export const useAuthentication = () => {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    // cleanup
    // deal with memory leak
    const [cancelled, setCancelled] = useState<boolean>(false)

    const auth = getAuth()

    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }

    const createUser = async (data: User) => {
        checkIfIsCancelled()

        setLoading(true)

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
                console.log(error.message)
                setError(error.message)

                let systemErrorMessage 
                if (error.message.includes('Password')) {
                    systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres."
                } else if (error.message.includes('email-already')) {
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

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        error,
        loading
    }
}