import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'

import { dateFormat } from "../helpers"
import { numberFormat } from '../helpers/index'

import IconSave from '../img/icono_ahorro.svg'
import IconFood from '../img/icono_comida.svg'
import IconExpense from '../img/icono_gastos.svg'
import IconHome from '../img/icono_hogar.svg'
import IconLeisure from '../img/icono_ocio.svg'
import IconHealth from '../img/icono_salud.svg'
import IconSubscription from '../img/icono_suscripciones.svg'

const iconsDictionary = {
  'ahorro': IconSave,
  'comida': IconFood,
  'gastos varios': IconExpense,
  'ocio': IconLeisure,
  'hogar': IconHome,
  'salud y bienestar': IconHealth,
  'suscripciones': IconSubscription,
}

const Expense = ({ expense, setEditExpense, deleteExpense }) => {

  const { category, name, amount, id, date } = expense

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setEditExpense(expense)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  )
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true }
        onClick={() => deleteExpense(id)}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={iconsDictionary[category]} alt={`icono ${category}`} />
            <div className="descripcion-gasto">
              <p className="categoria">{category}</p>
              <p className="nombre-gasto">{name}</p>
              <p className="fecha-gasto">
                Agredado el: {' '}
                <span>{dateFormat(date)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">{numberFormat(amount)}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}
export default Expense