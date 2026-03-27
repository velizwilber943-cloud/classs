const formulario = document.getElementById("formulario");
const tabla = document.getElementById("tabla").querySelector("tbody");

formulario.addEventListener("submit", function(e) {
  e.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
         const mensaje = document.getElementById("mensaje").value;

    const fila = document.createElement("tr");
    fila.innerHTML = `
            <td class="border px-2 py-1">nombre</td>
            <td class="border px-2 py-1">correo</td>
            <td class="border px-2 py-1">mensaje</td>
            <td class="border px-2 py-1">
            <button click="editar(this)" class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Modificar</button>
        </td>
        `;
  tabla.appendChild(fila);

  formulario.reset();
});

function editar(boton) {
        const fila = boton.parentNode.parentNode;
        const nombre = fila.children[0].textContent;
        const correo = fila.children[1].textContent;
        const mensaje = fila.children[2].textContent;

    document.getElementById("nombre").value = nombre;
    document.getElementById("correo").value = correo;
    document.getElementById("mensaje").value = mensaje;

            fila.remove(); // elimina la fila para que al guardar se actualice
}