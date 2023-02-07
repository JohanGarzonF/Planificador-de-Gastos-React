import { useEffect, useState } from 'react'
import Message from './Message'
import CloseBtn from '../img/cerrar.svg'

const Modal = ({
  setModal,
  animateModal,
  setAnimateModal,
  saveExpenses,
  editExpense,
  setEditExpense
}) => {

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [message, setMessage] = useState('')
  const [date, setDate] = useState('')
  const [id, setId] = useState('')

  useEffect(() => {
    if(Object.keys(editExpense).length > 0 ){
      setName(editExpense.name)
      setAmount(editExpense.amount)
      setCategory(editExpense.category)
      setId(editExpense.id)
      setDate(editExpense.date)
    }
  }, [])

  const handleCloseModal = () => {
    setAnimateModal(false)
    setEditExpense({})
    setTimeout(() => {
      setModal(false)
    }, 500)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if([ name, amount, category].includes('')){
      setMessage('Todos los campos son obligatorios')
      setTimeout(() => {
        setMessage('')
      }, 2000)
      return
    }

    saveExpenses({ name, amount, category, id, date })
  }

  return (
    <div className="modal">
      
      <div className="cerrar-modal">
        <img
          onClick={handleCloseModal}
          src={CloseBtn}
          alt="icono Cerrar modal"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`formulario ${animateModal ? 'animar' : 'cerrar'}`}
      >
        <legend>{editExpense.name ? 'Editar Gasto' : 'Nuevo gasto'}</legend>
        {
          message && (
            <Message type='error'>
              {message}
            </Message>
          )
        }

        <div className="campo">
          <label htmlFor="name">Nombre del gasto</label>
          
          <input
            id='name'
            type="text"
            placeholder='Añade el nombre del gasto'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="amount">Cantidad</label>
          
          <input
            id='amount'
            type="number"
            placeholder='Añade la cantidad del gasto: ej. 300'
            value={amount}
            onChange={e => setAmount( + e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="category">Categoría</label>
          
          <select
            name=""
            value={category}
            onChange={e => setCategory(e.target.value)}
            id="category"
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="hogar">Hogar</option>
            <option value="gastos varios">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud y bienestar">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input
          type="submit"
          value={editExpense.name ? 'Guardar cambios' : 'Añadir gasto'}
        />
      </form>

    </div>
  )
}
export default Modal