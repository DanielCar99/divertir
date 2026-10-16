import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "dist");
const products = JSON.parse(fs.readFileSync(path.join(root, "products.json"), "utf8"));
if (products.length !== 40) throw new Error(`Se esperaban 40 productos y hay ${products.length}`);
const refs = new Set(products.map((item) => item.ref));
if (refs.size !== products.length) throw new Error("Hay referencias de producto repetidas");
for (const product of products) {
  const image = path.join(root, "assets", "products", product.source);
  if (!fs.existsSync(image)) throw new Error(`Falta la imagen ${product.source}`);
}
for (const file of ["index.html", "styles.css", "app.js", "assets/Catalogo_Divertir.pdf", ".openai/hosting.json"]) {
  if (!fs.existsSync(path.join(root, file)) && !fs.existsSync(path.resolve(import.meta.dirname, file))) {
    throw new Error(`Falta ${file}`);
  }
}
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
for (const required of ["id=\"catalogo\"", "id=\"contacto\"", "product-modal", "Catalogo_Divertir.pdf", "573108856165"]) {
  if (!html.includes(required)) throw new Error(`No se encontró ${required} en la página`);
}
console.log(`Sitio validado: ${products.length} productos, ${refs.size} referencias únicas y todos los recursos presentes.`);
