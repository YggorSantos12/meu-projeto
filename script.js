// ===== Ys Automóveis - lógica de exibição (somente vitrine) =====

const carsGrid = document.getElementById("carsGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const modal = document.getElementById("carModal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

// Imagem de reserva caso a foto online não carregue
const fallbackImg =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'>
            <rect width='100%' height='100%' fill='#c2cfde'/>
            <text x='50%' y='50%' font-family='Arial' font-size='40' fill='#0a2540'
                  text-anchor='middle' dominant-baseline='middle'>Ys Automóveis</text>
        </svg>`
    );

// Cria o HTML de um card de carro
function createCard(car) {
    return `
        <article class="car-card" data-categoria="${car.categoria}" data-id="${car.id}">
            <div class="car-image">
                <span class="car-badge">${car.badge}</span>
                <img src="${car.imagem}" alt="${car.nome}"
                     onerror="this.onerror=null;this.src='${fallbackImg}'">
            </div>
            <div class="car-info">
                <h3>${car.nome}</h3>
                <div class="car-specs">
                    <span><i class="fa-regular fa-calendar"></i> ${car.ano}</span>
                    <span><i class="fa-solid fa-gauge-high"></i> ${car.km}</span>
                    <span><i class="fa-solid fa-gas-pump"></i> ${car.combustivel}</span>
                </div>
                <div class="car-price">${car.preco}</div>
            </div>
            <div class="car-details-link">Ver detalhes <i class="fa-solid fa-arrow-right"></i></div>
        </article>
    `;
}

// Renderiza a grade de carros (com filtro opcional)
function renderCars(filtro = "todos") {
    const lista =
        filtro === "todos" ? cars : cars.filter((c) => c.categoria === filtro);

    if (lista.length === 0) {
        carsGrid.innerHTML =
            "<p style='text-align:center;grid-column:1/-1;color:#6b7280;'>Nenhum carro nesta categoria no momento.</p>";
        return;
    }

    carsGrid.innerHTML = lista.map(createCard).join("");
}

// Abre o modal com os detalhes do carro
function openModal(car) {
    modalBody.innerHTML = `
        <img src="${car.imagem}" alt="${car.nome}"
             onerror="this.onerror=null;this.src='${fallbackImg}'">
        <div class="modal-text">
            <h2>${car.nome}</h2>
            <span class="car-badge" style="position:static;display:inline-block;">${car.badge}</span>
            <div class="modal-price">${car.preco}</div>
            <div class="modal-specs">
                <div class="modal-spec"><span>Ano</span><strong>${car.ano}</strong></div>
                <div class="modal-spec"><span>Quilometragem</span><strong>${car.km}</strong></div>
                <div class="modal-spec"><span>Câmbio</span><strong>${car.cambio}</strong></div>
                <div class="modal-spec"><span>Combustível</span><strong>${car.combustivel}</strong></div>
                <div class="modal-spec"><span>Motor</span><strong>${car.motor}</strong></div>
                <div class="modal-spec"><span>Cor</span><strong>${car.cor}</strong></div>
            </div>
            <p class="modal-desc">${car.descricao}</p>
        </div>
    `;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
}

// ===== Eventos =====

// Filtros
filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderCars(btn.dataset.filter);
    });
});

// Clique nos cards (delegação de evento)
carsGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".car-card");
    if (!card) return;
    const car = cars.find((c) => c.id === Number(card.dataset.id));
    if (car) openModal(car);
});

// Fechar modal
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});

// Menu mobile
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => navLinks.classList.toggle("show"));
navLinks.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => navLinks.classList.remove("show"))
);

// Inicializa
renderCars();
