import Expense from "./Expense"

const ExpensesList = ({
  expenses,
  setEditExpense,
  deleteExpense,
  filter,
  filterExpenses
}) => {
  return (
    <div className="listado-gastos contenedor">
      {
        filter ? (
          <>
            <h2>{filterExpenses.length ? 'Gastos': 'No hay gastos en esta categoría'}</h2>
            {
              filterExpenses.map(expense => (
                <Expense
                  key={expense.id}
                  expense={expense}
                  setEditExpense={setEditExpense}
                  deleteExpense={deleteExpense}
                />
              ))
            }
          </>
        ) : (
          <>
            <h2>{expenses.length ? 'Gastos' : 'No hay gastos aún'}</h2>
            {
              expenses.map(expense => (
                <Expense
                  key={expense.id}
                  expense={expense}
                  setEditExpense={setEditExpense}
                  deleteExpense={deleteExpense}
                />
              ))
            }
          </>
        )
      }
    </div>
  )
}
export default ExpensesList