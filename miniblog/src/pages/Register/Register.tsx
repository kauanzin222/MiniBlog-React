import { useState, useEffect } from 'react'

const Register = () => {
    return (
        <div className="auth-page">
            <h1>Cadastre-se para postar</h1>
            <p>Crie seu usuário e compartilhe suas histórias</p>
            <form>
                <div className="section-form">
                    <label>Nome: </label>
                    <input type="text" name='displayName' required placeholder='Nome do usuário' />
                </div>

                <div className="section-form">
                    <label>E-mail: </label>
                    <input type="email" name='email' required placeholder='E-mail do usuário' />
                </div>

                <div className="section-form">
                    <label>Senha: </label>
                    <input type="password" name='password' required placeholder='Insira sua senha' />
                </div>

                <div className="section-form">
                    <label>Confirmação de senha: </label>
                    <input type="password" name='confirmPassword' required placeholder='Confirme sua senha' />
                </div>

                <button type='submit'>Cadastrar</button>
            </form>
        </div>
    )
}

export default Register