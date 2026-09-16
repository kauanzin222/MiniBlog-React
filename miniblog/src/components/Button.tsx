import type { ButtonHTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean
    loadingText?: string
}

export const Button = ({
    children,
    loading = false,
    loadingText = 'Aguarde...',
    disabled,
    type = 'submit',
    ...props
}: ButtonProps) => {
    return (
        <button
            type={type}
            disabled={loading || disabled}
            {...props}
        >
            {loading ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin shrink-0" />
                    <span>{loadingText}</span>
                </>
            ) : (
                children
            )}
        </button>
    )
}