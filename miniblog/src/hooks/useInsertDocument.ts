import { useEffect, useReducer, useRef } from 'react'
import { db } from '../firebase/config'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

type State = {
    loading: boolean
    error: string | null
}

type Action =
    | { type: 'LOADING' }
    | { type: 'SUCCESS' }
    | { type: 'ERROR'; payload: string }

const initialState: State = {
    loading: false,
    error: null,
}

const insertReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'LOADING':
            return { loading: true, error: null }

        case 'SUCCESS':
            return { loading: false, error: null }

        case 'ERROR':
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const useInsertDocument = (docCollection: string) => {
    const [response, dispatch] = useReducer(insertReducer, initialState)

    const cancelled = useRef(false)

    // deal with memory leak
    const checkCancelBeforeDispatch = (action: Action) => {
        if (!cancelled.current) {
            dispatch(action)
        }
    }

    const insertDocument = async (document: Record<string, unknown>) => {
        checkCancelBeforeDispatch({ type: 'LOADING' })

        try {
            const newDocument = {
                ...document,
                createdAt: Timestamp.now(),
            }

            await addDoc(collection(db, docCollection), newDocument)

            checkCancelBeforeDispatch({ type: 'SUCCESS' })
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Erro ao inserir documento'

            checkCancelBeforeDispatch({ type: 'ERROR', payload: message })
        }
    }

    useEffect(() => {
        cancelled.current = false // reseta no mount/remount

        return () => {
            cancelled.current = true
        }
    }, [])

    return { insertDocument, response }
}