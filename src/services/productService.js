// Capa de servicios (patrón de la práctica "repositorio JSON"):
// los componentes NO leen los datos directamente, los piden aquí.
// Hoy leemos db.json local (el taller no permite backend); si luego se usa
// json-server o una API Node, solo se cambia el cuerpo de getProducts().
import db from '../data/db.json'

const makeImage = (emoji, color) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="${color}"/><text x="200" y="185" font-size="120" text-anchor="middle">${emoji}</text></svg>`
  )

export const getProducts = async () => {
  await new Promise(r => setTimeout(r, 400)) // simula la espera de una API
  return db.products.map(p => ({
    id: p.id,
    nombre: p.name,
    precio: p.price,
    categoria: p.category,
    imagen: makeImage(p.emoji, p.color)
  }))
}
