const Filters = ({ filter, setFilter }) => {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label>Filtrar gastos</label>
          <select 
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="">-- Todas las categorías --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="hogar">Hogar</option>
            <option value="gastos varios">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud y bienestar">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
      </form>
    </div>
  )
}
export default Filters