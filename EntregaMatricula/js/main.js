// Array de objetos con los datos de las matrículas
const matriculas = [
    { matricula: "1234ABC", modelo: "Ford Fiesta", propietario: "Juan Pérez", multas: ["Exceso de velocidad"] },
    { matricula: "5678DEF", modelo: "Renault Clio", propietario: "María Gómez", multas: [] },
    { matricula: "9012GHI", modelo: "Seat Ibiza", propietario: "Luis García", multas: ["Estacionamiento prohibido", "Semáforo en rojo"] },
    { matricula: "7248LFS", modelo: "Audi A1", propietario: "Paula Almazan", multas: ["Conducir bajo los efectos del alchol"] }
  ];
  
  // Función para buscar una matrícula en el array de objetos
  function buscarMatricula(matricula) {
    return new Promise((resolve, reject) => {
      const resultado = matriculas.find((m) => m.matricula === matricula);
      if (resultado) {
        resolve(resultado);
      } else {
        reject();
      }
    });
  }
  
  // Función para mostrar los datos de una matrícula en el DOM
  function mostrarResultado(matricula) {
    buscarMatricula(matricula)
      .then((datos) => {
        const tabla = document.querySelector("#tabla-matriculas tbody");
        const fila = document.createElement("tr");
        const celdaMatricula = document.createElement("td");
        const celdaModelo = document.createElement("td");
        const celdaPropietario = document.createElement("td");
        const celdaMultas = document.createElement("td");
  
        celdaMatricula.textContent = datos.matricula;
        celdaModelo.textContent = datos.modelo;
        celdaPropietario.textContent = datos.propietario;
        celdaMultas.textContent = datos.multas.join(", ");
  
        fila.appendChild(celdaMatricula);
        fila.appendChild(celdaModelo);
        fila.appendChild(celdaPropietario);
        fila.appendChild(celdaMultas);
  
        tabla.appendChild(fila);
      })
      .catch(() => {
        alert("La matrícula no existe.");
      });
  }
  
  // Función para guardar una matrícula en el localStorage
  function guardarEnLocalStorage(matricula) {
    const matriculasGuardadas = JSON.parse(localStorage.getItem("matriculas")) || [];
    if (!matriculasGuardadas.includes(matricula)) {
      matriculasGuardadas.push(matricula);
      localStorage.setItem("matriculas", JSON.stringify(matriculasGuardadas));
    }
  }
  
  // Evento submit del formulario
  const formulario = document.querySelector("form");
  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();
    const matricula = document.querySelector("#matricula").value.toUpperCase();
    await mostrarResultado(matricula);
    guardarEnLocalStorage(matricula);
  });
  
  // Carga de las matrículas guardadas en el localStorage al cargar la página
  const matriculasGuardadas = JSON.parse(localStorage.getItem("matriculas")) || [];
  matriculasGuardadas.forEach((matricula) => {
    mostrarResultado(matricula);
  });
  



