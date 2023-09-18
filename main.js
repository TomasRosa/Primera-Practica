document.addEventListener("DOMContentLoaded", () => {
  const urlApi = "https://utn-lubnan-api-1.herokuapp.com";
  const employeeEndpoint = `${urlApi}/api/Employee`;
  const companyEndpoint = `${urlApi}/api/Company`;

  const table = document.getElementById("table");
  const logeo = document.getElementById("logeo");
  const inputNombre = document.getElementById("nombre");
  const inputEmail = document.getElementById("email");
  const form = document.getElementById("login-form");

  let empleados;
  let company;

  fetch(employeeEndpoint)
    .then((res) => res.json())
    .then((data) => {
      empleados = data;
      return fetch(companyEndpoint);
    })
    .then((resCompany) => resCompany.json())
    .then((data) => {
      company = data;

      empleados.forEach((empleado) => {
        const newRow = table.insertRow();

        const tdIdEmpleado = newRow.insertCell();
        tdIdEmpleado.innerHTML = empleado.employeeId;

        const tdIdCompany = newRow.insertCell();
        tdIdCompany.innerHTML = empleado.companyId;

        const tdNombre = newRow.insertCell();
        tdNombre.innerHTML = empleado.firstName;

        const tdApellido = newRow.insertCell();
        tdApellido.innerHTML = empleado.lastName;

        const tdEmail = newRow.insertCell();
        tdEmail.innerHTML = empleado.email;

        const nombreCompany = newRow.insertCell();
        nombreCompany.innerHTML = asignarCompañiaSegunID(
          empleado.companyId,
          company
        );

        logeo.innerHTML = "A continuacion va a registrarse. Ingrese un nombre y un email que esten en la base de datos.";
    
        form.addEventListener("submit", (e)=>{
         e.preventDefault();
        let exitoso = buscarNombreYEmail(inputNombre.value,inputEmail.value,empleados);
        if (exitoso) 
        {
          alert("LOGUEO EXITOSO");
        } 
        else 
        {
          alert("Los datos no han podido ser encontrados en nuestra base de datos :(");
        }
        });
        })

    })
    .catch((err) => {
        console.log("Error." + err);
    });

  function asignarCompañiaSegunID(id, compañia) {
    let nombreRetorno = "";

    compañia.forEach((idCompany) => {
      if (idCompany.companyId === id) {
        nombreRetorno = idCompany.name;
      }
    });
    return nombreRetorno;
  }
  function buscarNombreYEmail(nombre, email, empleados) 
  {
    let exitoso = false;

    empleados.forEach((empleado) => {
      if (empleado.firstName === nombre && empleado.email === email && exitoso === false) 
      {
        exitoso = true;
      }
    });
    return exitoso;
  }
});
