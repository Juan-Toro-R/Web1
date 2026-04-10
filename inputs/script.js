const btnCrear = document.getElementById('btnCrear');
const contenedor = document.getElementById('contenedorProductos');

btnCrear.addEventListener('click', () => {
    const nombreInput = document.getElementById('nombre');
    const precioInput = document.getElementById('precio');
    const imagenInput = document.getElementById('imagen');

    const nombre = nombreInput.value;
    const precio = precioInput.value;
    const imagen = imagenInput.value;

    // Validación
    if (!nombre || !precio || !imagen) {
        alert('Por favor, completa todos los campos del sistema.');
        return;
    }

    // Estructura de la tarjeta
    const nuevaTarjeta = `
        <div class="col">
            <div class="card h-100 product-card">
                <img src="${imagen}" class="card-img-top" alt="${nombre}" 
                     onerror="this.src='https://via.placeholder.com/400x250/111/444?text=ERROR+SOURCE'">
                <div class="card-body">
                    <h6 class="text-uppercase text-secondary small mb-1">${nombre}</h6>
                    <h5 class="fw-bold mb-0 text-white">$${precio}</h5>
                </div>
            </div>
        </div>
    `;

    // Inyectar en el HTML
    contenedor.innerHTML += nuevaTarjeta;

    // Limpiar formulario
    nombreInput.value = '';
    precioInput.value = '';
    imagenInput.value = '';
});