import { useState } from "react"
import Message from './Message.jsx'

const NewBudget = ({ budget, setBudget, setIsValidBudget }) => {

  const [message, setMessage] = useState('')

  const handleBudget = e => {
    e.preventDefault()
    
    if(!budget || budget < 0){
      setMessage('No es un presupuesto válido')
      return
    }
    setMessage('')
    setIsValidBudget(true)

    console.log('Budget')
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      
      <form onSubmit={handleBudget} className="formulario">
        <div className="campo">
          <label>Definir Presupuesto</label>

          <input
            className="nuevo-presupuesto"
            type="number"
            placeholder="Añade tu presupuesto"
            value={budget}
            onChange={e => setBudget(Number(e.target.value))}
          />
        </div>
        <input type="submit" value='añadir' />

        {message && <Message type='error'>{message}</Message>}
      </form>
    </div>
  )
}
export default NewBudget