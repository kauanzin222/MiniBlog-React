import { useState, useEffect } from 'react'

const Register = () => {
    return (
        <div>
            <h1>Cadastre-se para postar</h1>
            <p>Crie seu usuário e compartilhe suas histórias</p>
            <form>
                <label>Nome: </label>
                <input type="text" name='displayName' required placeholder='Nome do usuário' />

                <label>E-mail: </label>
                <input type="email" name='email' required placeholder='E-mail do usuário' />

                <label>Senha: </label>
                <input type="password" name='password' required placeholder='Insira sua senha' />

                <label>Confirmação de senha: </label>
                <input type="password" name='confirmPassword' required placeholder='Confirme sua senha' />

                <button type='submit'>Cadastrar</button>
            </form>
        </div>
    )
}

export default Register
