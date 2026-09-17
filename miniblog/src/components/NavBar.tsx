import { NavLink } from "react-router-dom"

import { useAuthentication } from "../hooks/useAuthentication"

import { useAuthValue } from "../context/AuthContext"
import { Button } from "./Button"

import { SquareArrowRightExit } from 'lucide-react'


const NavBar = () => {
  const { user } = useAuthValue()
  const { logout } = useAuthentication()

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
      ? "bg-slate-900 text-white"
      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
    }`

  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/80 px-8 py-4 backdrop-blur-md">
      <NavLink to="/" className="text-lg font-semibold text-slate-900">
        Mini <span>BLOG</span>
      </NavLink>
      <ul className="flex items-center gap-1">
        <li>
          <NavLink to="/" end className={linkClasses}>
            Home
          </NavLink>
        </li>
        {!user &&
          <>
            <li>
              <NavLink to="/login" className={linkClasses}>
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className={linkClasses}>
                Cadastrar
              </NavLink>
            </li>
          </>
        }
        {user &&
          <>
            <li>
              <NavLink to="/posts/create" className={linkClasses}>
                Novo post
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className={linkClasses}>
                Dashboard
              </NavLink>
            </li>
          </>
        }
        <li>
          <NavLink to="/about" className={linkClasses}>
            Sobre
          </NavLink>
        </li>
        {user &&
          <li>
            <Button
              onClick={logout}
              type="button"
              className="flex items-center justify-center rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 cursor-pointer" 
            >
              <SquareArrowRightExit className="h-5 w-5" />
            </Button>
          </li>
        }
      </ul>
    </nav>
  )
}

export default NavBar