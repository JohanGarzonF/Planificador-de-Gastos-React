export const generateId = () => {
  const random = Math.random().toString(36).substring(2)
  const date = Date.now().toString(36)

  return random + date
}

export const dateFormat = newDate => {
  const date = new Date(newDate)
  const options = {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }

  return date.toLocaleDateString('es-ES', options)
}

export const numberFormat = num => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num)
}