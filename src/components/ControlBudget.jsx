import { useEffect, useState } from "react"
import { numberFormat } from "../helpers"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlBudget = ({
  expenses,
  setExpenses,
  budget,
  setBudget,
  setIsValidBudget
}) => {

  const [percent, setPercent] = useState(0)
  const [available, setAvailable] = useState(0)
  const [spent, setSpent] = useState(0)

  useEffect(() => {
    const totalSpent = expenses.reduce((total, expense) => expense.amount + total, 0)
    const totalAvaible = budget - totalSpent

    //calcular porcentaje
    const newPercent = (((budget - totalAvaible) / budget) * 100).toFixed(2)
    setTimeout(() => {
      setPercent(newPercent)
    }, 1500)

    setSpent(totalSpent)
    setAvailable(totalAvaible)
  }, [expenses])

  const handleResetApp = () => {
    const result = confirm('¿Realmente deseas resetear tu lista de gastos y valor de presupuesto?')
    if (result) {
      setBudget(0)
      setExpenses([])
      setIsValidBudget(false)
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: percent > 100 ? '#dc2626' : '#3b82f6',
            trailColor: '#f5f5f5',
            textColor: percent > 100 ? '#dc2626' : '#3b82f6',
          })}
          value={percent}
          text={`${percent}% gastado`}
        />
      </div>

      <div className="contenido-presupuesto">
        <button
          className="reset-app"
          onClick={handleResetApp}
        >Resetear App</button>
        <p>
          <span>Presupuesto: </span> {numberFormat(budget)}
        </p>
        <p className={`${available < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span> {numberFormat(available)}
        </p>
        <p>
          <span>Gastado: </span> {numberFormat(spent)}
        </p>
      </div>
    </div>
  )
}
export default ControlBudget