const WHATSAPP = "573108856165";
let products = [];
let activeCategory = "Todos";

const grid = document.querySelector("#product-grid");
const count = document.querySelector("#product-count");
const search = document.querySelector("#search");
const emptyState = document.querySelector("#empty-state");
const modal = document.querySelector("#product-modal");

const imagePath = (source) => `assets/products/${encodeURIComponent(source)}`;
const whatsappLink = (product) => {
  const message = `Hola Vicente, me interesa la máquina ${product.name} (${product.ref}) del catálogo Divertir. ¿Me puedes dar precio, disponibilidad y detalles?`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
};

function renderProducts() {
  const term = search.value.trim().toLocaleLowerCase("es");
  const filtered = products.filter((product) => {
    const categoryMatch = activeCategory === "Todos" || product.category === activeCategory;
    const searchMatch = `${product.name} ${product.ref} ${product.category}`.toLocaleLowerCase("es").includes(term);
    return categoryMatch && searchMatch;
  });
  count.textContent = filtered.length;
  emptyState.hidden = filtered.length > 0;
  grid.innerHTML = filtered.map((product) => `
    <article class="product-card" tabindex="0" role="button" aria-label="Ver ${product.name}" data-ref="${product.ref}">
      <div class="product-image"><img src="${imagePath(product.source)}" alt="${product.name}, máquina infantil" loading="lazy" /></div>
      <div class="product-info">
        <span class="product-arrow" aria-hidden="true">↗</span>
        <span class="product-ref">${product.ref}</span>
        <h3>${product.name}</h3>
        <p>${product.category}</p>
      </div>
    </article>`).join("");
}

function openProduct(ref) {
  const product = products.find((item) => item.ref === ref);
  if (!product) return;
  document.querySelector("#modal-image").src = imagePath(product.source);
  document.querySelector("#modal-image").alt = `${product.name}, máquina infantil`;
  document.querySelector("#modal-ref").textContent = product.ref;
  document.querySelector("#modal-category").textContent = product.category;
  document.querySelector("#modal-title").textContent = product.name;
  document.querySelector("#modal-whatsapp").href = whatsappLink(product);
  modal.showModal();
}

function selectCategory(category) {
  document.querySelector(".filter.active")?.classList.remove("active");

  const matchingFilter = document.querySelector(
    `.filter[data-category="${category}"]`
  );

  matchingFilter?.classList.add("active");
  activeCategory = category;
  search.value = "";
  renderProducts();
}

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    selectCategory(button.dataset.category);
  });
});

document.querySelectorAll(".marquee-filter").forEach((button) => {
  button.addEventListener("click", () => {
    selectCategory(button.dataset.category);

    document.querySelector("#catalogo").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});
search.addEventListener("input", renderProducts);
grid.addEventListener("click", (event) => {
  const card = event.target.closest(".product-card");
  if (card) openProduct(card.dataset.ref);
});
grid.addEventListener("keydown", (event) => {
  if ((event.key === "Enter" || event.key === " ") && event.target.matches(".product-card")) {
    event.preventDefault(); openProduct(event.target.dataset.ref);
  }
});
document.querySelector(".modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", (event) => { if (event.target === modal) modal.close(); });
document.querySelector(".menu-toggle").addEventListener("click", (event) => {
  const header = document.querySelector(".site-header");
  const open = header.classList.toggle("menu-open");
  event.currentTarget.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".site-header nav a").forEach((link) => link.addEventListener("click", () => document.querySelector(".site-header").classList.remove("menu-open")));
document.querySelector("#year").textContent = new Date().getFullYear();

fetch("products.json")
  .then((response) => { if (!response.ok) throw new Error("No se pudo cargar el catálogo"); return response.json(); })
  .then((data) => { products = data; renderProducts(); })
  .catch(() => { grid.innerHTML = '<p class="empty-state">No fue posible cargar el catálogo en este momento.</p>'; });
