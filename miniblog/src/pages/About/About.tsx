import { Link } from "react-router-dom"

const About = () => {
  return (
    <main className="mx-auto max-w-xl px-6 py-20 text-center">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
        Sobre o Mini BLOG
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-slate-500">
        Este projeto consiste em um blog feito com React no Front-End e Firebase no Back-End
      </p>
      <Link
        to='/posts/create'
        className="mt-8 inline-block rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
      >
        Criar post
      </Link>
    </main>
  )
}

export default About