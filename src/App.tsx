import * as React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Dashboard from './components/domains/Dashboard'
import CadastrarPessoaFisica from './components/pages/clientes/pessoa-fisica/CadastrarPessoaFisica'
import ConsultarPessoaFisica from './components/pages/clientes/pessoa-fisica/ConsultarPessoaFisica'
import SignIn from './components/shared/sign-in/SignIn'
import SignUp from './components/shared/sign-up/SignUp'

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/pessoa-fisica" element={<ConsultarPessoaFisica />} />
        <Route path="/pessoa-fisica/cadastro" element={<CadastrarPessoaFisica />} />
      </Routes>
    </div>
  )
}
