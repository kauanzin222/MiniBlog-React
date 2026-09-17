import { XCircle } from "lucide-react"
import { useState, type FormEvent, useEffect } from "react"
import { Button } from "../../components/Button"
import { useAuthentication } from "../../hooks/useAuthentication"
import type { UserLoginDTO } from "../../interfaces/UserLoginDTO"

const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const { error: authError, loading, login } = useAuthentication()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    const user: UserLoginDTO = {
      email,
      password
    }
    
    const res = await login(user)

    console.log(res)
  }

  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])

  return (
    <div className="auth-page">
      <h1>Entrar</h1>
      <p>Faça o login para poder utilizar o sistema</p>
      <form onSubmit={handleSubmit}>
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

        <Button loading={loading}>
          Entrar
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

export default Login
