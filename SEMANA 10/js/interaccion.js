// ==========================================================================
// CALCULADORA INTERACTIVA DE IMPACTO CLIMÁTICO (ODS 13 - CLIMATE TRACE)
// ==========================================================================

// 1. SELECCIÓN DE ELEMENTOS DEL DOM
const selectAccion = document.querySelector('#tipo-accion');
const inputCantidad = document.querySelector('#cantidad-unidades');
const btnCalcular = document.querySelector('#btn-calcular');
const tarjetaResultado = document.querySelector('#tarjeta-resultado');
const mensajeResultado = document.querySelector('#mensaje-resultado');
const bloqueMonto = document.querySelector('#bloque-monto');
const valorCO2 = document.querySelector('#valor-co2');

// 2. FUNCIÓN DE CÁLCULO E INTERACCIÓN
function calcularImpacto() {
  // Convertir los valores ingresados a tipos numéricos
  const factor = parseFloat(selectAccion.value);
  const cantidad = parseInt(inputCantidad.value, 10);

  // Criterio de Aceptación 2: Validación de Entradas
  if (isNaN(factor)) {
    mostrarMensaje('Por favor, selecciona un tipo de acción climática válido.', true);
    selectAccion.focus();
    return;
  }

  if (isNaN(cantidad) || cantidad <= 0) {
    mostrarMensaje('Ingresa una cantidad válida mayor a 0.', true);
    inputCantidad.focus();
    return;
  }

  // Criterio de Aceptación 3: Cálculo dinámico de toneladas de CO2
  const totalCO2 = (factor * cantidad).toFixed(1);

  // Criterio de Aceptación 4: Feedback Visual en el DOM
  valorCO2.textContent = totalCO2;
  bloqueMonto.hidden = false;
  mostrarMensaje(`Basado en ${cantidad} unidad(es) de la acción seleccionada:`, false);
}

// FUNCIÓN AUXILIAR PARA MOSTRAR ESTADOS EN EL DOM
function mostrarMensaje(texto, esError) {
  tarjetaResultado.hidden = false;
  mensajeResultado.textContent = texto;

  if (esError) {
    mensajeResultado.className = 'mensaje-error';
    bloqueMonto.hidden = true;
  } else {
    mensajeResultado.className = 'mensaje-exito';
  }
}

// 3. REGISTRO DE EVENTOS (EVENT LISTENERS)
// Evento clic sobre el botón de calcular
btnCalcular.addEventListener('click', calcularImpacto);

// Evento de teclado: Ejecutar cálculo al presionar 'Enter' en el campo numérico
inputCantidad.addEventListener('keydown', function (evento) {
  if (evento.key === 'Enter') {
    evento.preventDefault(); // Evita la recarga o envío del formulario
    calcularImpacto();
  }
});