import { useState, useEffect, type FormEvent } from 'react'
import type { User } from '../../interfaces/User'
import { XCircle } from 'lucide-react'
import { useAuthentication } from '../../hooks/useAuthentication'
import { Button } from '../../components/Button'



const Register = () => {
    const [displayName, setDisplayName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [error, setError] = useState<string>('')

    const { createUser, error: authError, loading } = useAuthentication()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError('')

        const user: User = {
            displayName,
            email,
            password
        }

        if (password !== confirmPassword) {
            setError('As senhas precisam ser iguais')
            return
        }

        const res = await createUser(user)

        console.log(res)
    }

    useEffect(() => {
        if (authError) {
            setError(authError)
        }
    }, [authError])

    return (
        <div className="auth-page">
            <h1>Cadastre-se para postar</h1>
            <p>Crie seu usuário e compartilhe suas histórias</p>
            <form onSubmit={handleSubmit}>
                <div className="section-form">
                    <label>Nome: </label>
                    <input
                        type="text"
                        name='displayName'
                        required
                        placeholder='Nome do usuário'
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                </div>

                <div className="section-form">
                    <label>E-mail: </label>
                    <input
                        type="email"
                        name='email'
                        required
                        placeholder='E-mail do usuário'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="section-form">
                    <label>Senha: </label>
                    <input
                        type="password"
                        name='password'
                        required
                        placeholder='Insira sua senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="section-form">
                    <label>Confirmação de senha: </label>
                    <input
                        type="password"
                        name='confirmPassword'
                        required
                        placeholder='Confirme sua senha'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <Button loading={loading}>
                    Cadastrar
                </Button>

                {error &&
                    <p className='form-error'>
                        <XCircle className="h-4 w-4 shrink-0" />
                        {error}
                    </p>}
            </form>
        </div>
    )
}

export default Register