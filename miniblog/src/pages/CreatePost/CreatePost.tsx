import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthValue } from "../../context/AuthContext"
import { Button } from "../../components/Button"


const CreatePost = () => {
  const [title, setTitle] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [formError, setFormError] = useState<string>('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="auth-page">
      <h1>Criar post</h1>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <div className="section-form">
          <label>Título: </label>
          <input
            type="text"
            name='title'
            required
            placeholder='Ex: Viagem'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="section-form">
          <label>URL de imagem: </label>
          <input
            type="text"
            name='image'
            required
            placeholder='Ex: https://imagem_brasil'
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div className="section-form">
          <label>Conteúdo: </label>
          <textarea
            name='body'
            required
            placeholder='Ex: Viagem ao Brasil muito cultural'
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <div className="section-form">
          <label>Tags: </label>
          <input
            type="text"
            name='tags'
            required
            placeholder='Insira as tags separadas por vírgula'
            value={tags}
            onChange={(e) => setTags(e.target.value.split(','))}
          />
        </div>

        <Button>
          Criar
        </Button>

        {/* {error &&
          <p className='form-error'>
            <XCircle className="h-4 w-4 shrink-0" />
            {error}
          </p>} */}
      </form>
    </div>
  )
}

export default CreatePost
