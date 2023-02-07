import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import Filters from './components/Filters'
import ExpensesList from './components/ExpensesList'
import { generateId } from './helpers'
import IconNewBudget from './img/nuevo-gasto.svg'

function App() {

  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem('expenses')) ? JSON.parse(localStorage.getItem('expenses')) : []
  )

  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0
  )
  const [isValidBudget, setIsValidBudget] = useState(false)

  const [modal, setModal] = useState(false)
  const [animateModal, setAnimateModal] = useState(false)

  const [editExpense, setEditExpense] = useState({})

  const [filter, setFilter] = useState('')
  const [filterExpenses, setFilterExpenses] = useState([])

  useEffect(() => {
    if (Object.keys(editExpense).length > 0) {
      setModal(true)
      setTimeout(() => {
        setAnimateModal(true)
      }, 500)
    }
  }, [editExpense])

  useEffect(() => {
    if (filter) {
      const newFilterExpenses = expenses.filter(expense => expense.category === filter)
      setFilterExpenses(newFilterExpenses)
    } else {
      setFilterExpenses([])
    }
  }, [filter])

  useEffect(() => {
    localStorage.setItem('budget', JSON.stringify(budget) ?? JSON.stringify(0))
  }, [budget])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? JSON.stringify([]))
  }, [expenses])

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem('budget'))
    if (budgetLS > 0) {
      setIsValidBudget(true)
    }
  }, [])

  const handleNewBudget = () => {
    setModal(true)
    setEditExpense({})
    setTimeout(() => {
      setAnimateModal(true)
    }, 500)
  }

  const deleteExpense = id => {
    const updatedExpense = expenses.filter(expenseState => expenseState.id !== id)
    setExpenses(updatedExpense)
  }

  const saveExpenses = expense => {
    if (expense.id) {
      // Actualizar
      setEditExpense({})
      const updatedExpense = expenses.map(expenseState => expenseState.id === editExpense.id ? expense : expenseState)
      setExpenses(updatedExpense)
    } else {
      // Nuevo Gasto
      expense.id = generateId()
      expense.date = Date.now()
      setExpenses([...expenses, expense])
    }

    setAnimateModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        expenses={expenses}
        setExpenses={setExpenses}
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
      />

      {
        isValidBudget && (
          <>
            <main>
              <Filters
                filter={filter}
                setFilter={setFilter}
              />
              <ExpensesList
                expenses={expenses}
                setEditExpense={setEditExpense}
                deleteExpense={deleteExpense}
                filter={filter}
                filterExpenses={filterExpenses}
              />
            </main>
            <div className="nuevo-gasto">
              <img
                onClick={handleNewBudget}
                src={IconNewBudget}
                alt="icono nuevo gasto"
              />
            </div>
          </>
        )
      }

      {
        modal && (
          <Modal
            setModal={setModal}
            animateModal={animateModal}
            setAnimateModal={setAnimateModal}
            saveExpenses={saveExpenses}
            editExpense={editExpense}
            setEditExpense={setEditExpense}
          />
        )
      }
    </div>
  )
}

export default App
