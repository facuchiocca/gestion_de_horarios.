document.addEventListener("DOMContentLoaded", function () {
    // Elementos de navegación
    const linkHorarios = document.getElementById("link-horarios");
    const linkMaterias = document.getElementById("link-materias");
    const linkFechas = document.getElementById("link-fechas");
    const linkInicio = document.getElementById("link-inicio");

    const horariosSection = document.getElementById("horarios");
    const materiasSection = document.getElementById("materias");
    const fechasSection = document.getElementById("fechas");
    const inicioSection = document.getElementById("inicio");

    function hideSections() {
        horariosSection.style.display = "none";
        materiasSection.style.display = "none";
        fechasSection.style.display = "none";
        inicioSection.style.display = "none";
    }

    hideSections();
    inicioSection.style.display = "block";

    linkHorarios.addEventListener("click", () => {
        hideSections();
        horariosSection.style.display = "block";
    });

    linkMaterias.addEventListener("click", () => {
        hideSections();
        materiasSection.style.display = "block";
    });

    linkFechas.addEventListener("click", () => {
        hideSections();
        fechasSection.style.display = "block";
    });

    linkInicio.addEventListener("click", () => {
        hideSections();
        inicioSection.style.display = "block";
    });

    // -----------------------------------------
    // Funcionalidad para "Mis Horarios"
    // -----------------------------------------
    const verHorariosBtn = document.getElementById("ver-horarios-btn");
    const tablaHorarios = document.getElementById("tabla-horarios");
    const formularioHorarios = document.getElementById("formulario-horarios");
    const agregarHorarioBtn = document.getElementById("agregar-horario");

    let horarios = JSON.parse(localStorage.getItem("horarios")) || [];

    function renderHorarios() {
        const tbody = tablaHorarios.querySelector("tbody");
        tbody.innerHTML = "";
        horarios.forEach((horario, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${horario.dia}</td>
                <td>${horario.hora}</td>
                <td>${horario.materia}</td>
                <td><button class="eliminar1" data-index="${index}">❌</button></td>
            `;
            tbody.appendChild(fila);
        });
    }

    verHorariosBtn.addEventListener("click", () => {
        tablaHorarios.style.display = "table";
        formularioHorarios.style.display = "block";
    });

    agregarHorarioBtn.addEventListener("click", () => {
        const dia = document.getElementById("dia").value.trim();
        const hora = document.getElementById("hora").value.trim();
        const materia = document.getElementById("materia").value.trim();

        if (dia && hora && materia) {
            horarios.push({ dia, hora, materia });
            localStorage.setItem("horarios", JSON.stringify(horarios));
            renderHorarios();
            document.getElementById("dia").value = "";
            document.getElementById("hora").value = "";
            document.getElementById("materia").value = "";
        }
    });

    // Manejar el evento de eliminación de horarios
    tablaHorarios.addEventListener("click", (event) => {
        if (event.target.classList.contains("eliminar1")) {
            const index = event.target.dataset.index;
            horarios.splice(index, 1);
            localStorage.setItem("horarios", JSON.stringify(horarios));
            renderHorarios();
        }
    });

    renderHorarios();

    // -----------------------------------------
    // Funcionalidad para "Mis Materias"
    // -----------------------------------------
    const listaMaterias = document.getElementById("lista-materias");
    const listaAprobadas = document.getElementById("materias-aprobadas");
    const listaPromovidas = document.getElementById("materias-promovidas");
    const listaRegulares = document.getElementById("materias-regulares");
    const inputMateria = document.createElement("input");
    inputMateria.setAttribute("type", "text");
    inputMateria.setAttribute("id", "nueva-materia");
    inputMateria.setAttribute("placeholder", "Nueva materia...");

    const btnAgregarMateria = document.createElement("button");
    btnAgregarMateria.setAttribute("id", "agregar-materia");
    btnAgregarMateria.textContent = "Agregar Materia";

    listaMaterias.parentElement.insertBefore(inputMateria, listaMaterias);
    listaMaterias.parentElement.insertBefore(btnAgregarMateria, listaMaterias);

    let materias = JSON.parse(localStorage.getItem("materias")) || [];

    function renderMaterias() {
        listaMaterias.innerHTML = "";
        listaAprobadas.innerHTML = "";
        listaPromovidas.innerHTML = "";
        listaRegulares.innerHTML = "";

        materias.forEach((materia, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${materia.nombre} 
                <button class="aprobar" data-index="${index}">Aprobada</button>
                <button class="regular" data-index="${index}">Regular</button>
                <button class="promover" data-index="${index}">Promovida</button>
                <button class="eliminar2" data-index="${index}">❌</button>
            `;

            if (materia.estado === "aprobada") {
                listaAprobadas.appendChild(li);
            } else if (materia.estado === "promovida") {
                listaPromovidas.appendChild(li);
            } else if (materia.estado === "regular") {
                listaRegulares.appendChild(li);
            } else {
                listaMaterias.appendChild(li);
            }
        });
    }

    btnAgregarMateria.addEventListener("click", () => {
        const nombreMateria = inputMateria.value.trim();
        if (nombreMateria === "") return;

        materias.push({ nombre: nombreMateria, estado: "pendiente" });
        localStorage.setItem("materias", JSON.stringify(materias));
        renderMaterias();
        inputMateria.value = "";
    });

    listaMaterias.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            const boton = event.target;
            const index = boton.dataset.index;

            if (boton.classList.contains("aprobar")) {
                materias[index].estado = "aprobada";
            } else if (boton.classList.contains("promover")) {
                materias[index].estado = "promovida";
            } else if (boton.classList.contains("regular")) {
                materias[index].estado = "regular";
            } else if (boton.classList.contains("eliminar2")) {
                // Eliminar materia completamente desde cualquier estado
                materias.splice(index, 1);  // Elimina la materia del array
            }

            localStorage.setItem("materias", JSON.stringify(materias));  // Guarda los cambios en el localStorage
            renderMaterias();  // Vuelve a renderizar la lista actualizada
        }
    });

    listaAprobadas.addEventListener("click", (event) => {
        if (event.target.classList.contains("eliminar2")) {
            const index = event.target.dataset.index;
            materias.splice(index, 1);  // Eliminar la materia
            localStorage.setItem("materias", JSON.stringify(materias));
            renderMaterias();
        }
    });

    listaPromovidas.addEventListener("click", (event) => {
        if (event.target.classList.contains("eliminar2")) {
            const index = event.target.dataset.index;
            materias.splice(index, 1);  // Eliminar la materia
            localStorage.setItem("materias", JSON.stringify(materias));
            renderMaterias();
        }
    });

    listaRegulares.addEventListener("click", (event) => {
        if (event.target.classList.contains("eliminar2")) {
            const index = event.target.dataset.index;
            materias.splice(index, 1);  // Eliminar la materia
            localStorage.setItem("materias", JSON.stringify(materias));
            renderMaterias();
        }
    });

    renderMaterias();

    // -----------------------------------------
    // Funcionalidad de Fechas Importantes
    // -----------------------------------------
    const listaFechas = document.getElementById("lista-fechas");
    const inputMateriaFecha = document.getElementById("materia-fecha");
    const inputFecha = document.getElementById("nueva-fecha");
    const btnAgregarFecha = document.getElementById("agregar-fecha");

    let fechas = JSON.parse(localStorage.getItem("fechas")) || [];

    function renderFechas() {
        listaFechas.innerHTML = "";
        fechas.forEach((fecha, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${fecha.materia}</strong>: ${fecha.fecha} 
                <button class="eliminar-fecha" data-index="${index}">❌</button>
            `;
            listaFechas.appendChild(li);
        });
    }

    btnAgregarFecha.addEventListener("click", () => {
        const materia = inputMateriaFecha.value.trim();
        const fecha = inputFecha.value.trim();

        if (materia === "" || fecha === "") return;

        fechas.push({ materia, fecha });
        localStorage.setItem("fechas", JSON.stringify(fechas));
        renderFechas();
        inputMateriaFecha.value = "";
        inputFecha.value = "";
    });

    listaFechas.addEventListener("click", (event) => {
        if (event.target.classList.contains("eliminar-fecha")) {
            fechas.splice(event.target.dataset.index, 1);
            localStorage.setItem("fechas", JSON.stringify(fechas));
            renderFechas();
        }
    });

    renderFechas();
});
