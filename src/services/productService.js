// Capa de servicios: los componentes piden los datos aquí.
// Hoy leemos db.json local (el taller no permite backend).
import db from '../data/db.json'

// Arte de respaldo (SVG) por si una foto no carga
const arte = (emoji, color) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750"><rect width="600" height="750" fill="${color}"/><text x="300" y="440" font-size="220" text-anchor="middle">${emoji}</text></svg>`
  )

export const getProducts = async () => {
  await new Promise(r => setTimeout(r, 350)) // simula una API
  return db.products.map(p => ({
    id: p.id,
    nombre: p.name,
    precio: p.price,
    categoria: p.category,
    etiqueta: p.tag,
    descripcion: p.desc,
    // 1) tu foto en public/img/productos  2) foto de internet  3) arte SVG
    foto: `/img/productos/${p.file}`,
    fotoRemota: `https://loremflickr.com/600/750/${p.kw}?lock=${p.id}`,
    arte: arte(p.emoji, p.color)
  }))
}
