window.onload = init;

var url = "http://localhost:3000";
var headers = {};
var empleados = [];
var currentId = null;

function init() {
  if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
    return;
  }

  headers = {
    headers: {
      Authorization: "bearer " + localStorage.getItem("token")
    }
  };

  document.getElementById("logout").addEventListener("click", logout);
  document.getElementById("save-employee").addEventListener("click", saveEmployee);
  document.getElementById("cancel-edit").addEventListener("click", resetForm);

  loadEmployees();
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

function loadEmployees() {
  axios.get(url + "/employees", headers)
    .then(function (res) {
      empleados = res.data.message || [];
      displayEmployees();
    })
    .catch(function (err) {
      console.log(err);
      alert("Error al cargar empleados");
    });
}

function displayEmployees() {
  var table = document.getElementById("employee-table");
  table.innerHTML = "";

  empleados.forEach(function (emp) {
    table.innerHTML += `
      <tr>
        <td>${emp.employee_id}</td>
        <td>${emp.employee_name}</td>
        <td>${emp.employee_lastname}</td>
        <td>${emp.employee_phone}</td>
        <td>${emp.employee_email}</td>
        <td>${emp.employee_address}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editEmployee(${emp.employee_id})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="deleteEmployee(${emp.employee_id})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

function resetForm() {
  currentId = null;
  document.getElementById("employee-id").value = "";
  document.getElementById("employee-name").value = "";
  document.getElementById("employee-lastname").value = "";
  document.getElementById("employee-phone").value = "";
  document.getElementById("employee-email").value = "";
  document.getElementById("employee-address").value = "";
  document.getElementById("form-title").innerText = "Nuevo empleado";
}

function saveEmployee() {
  var name = document.getElementById("employee-name").value;
  var lastname = document.getElementById("employee-lastname").value;
  var phone = document.getElementById("employee-phone").value;
  var email = document.getElementById("employee-email").value;
  var address = document.getElementById("employee-address").value;

  if (!name || !lastname || !phone || !email || !address) {
    alert("Completa todos los campos.");
    return;
  }

  var data = {
    employee_name: name,
    employee_lastname: lastname,
    employee_phone: phone,
    employee_email: email,
    employee_address: address
  };

  if (!currentId) {
    axios.post(url + "/employees", data, headers)
      .then(function (res) {
        if (res.data.code === 201) {
          alert("Empleado creado");
          resetForm();
          loadEmployees();
        } else {
          alert(res.data.message || "Error al crear empleado");
        }
      })
      .catch(function (err) {
        console.log(err);
        alert("Error al crear empleado");
      });
  } else {
    axios.put(url + "/employees/" + currentId, data, headers)
      .then(function (res) {
        if (res.data.code === 200) {
          alert("Empleado actualizado");
          resetForm();
          loadEmployees();
        } else {
          alert(res.data.message || "Error al actualizar empleado");
        }
      })
      .catch(function (err) {
        console.log(err);
        alert("Error al actualizar empleado");
      });
  }
}

function editEmployee(id) {
  var emp = empleados.find(e => e.employee_id === id);
  if (!emp) return;

  currentId = id;
  document.getElementById("employee-id").value = id;
  document.getElementById("employee-name").value = emp.employee_name;
  document.getElementById("employee-lastname").value = emp.employee_lastname;
  document.getElementById("employee-phone").value = emp.employee_phone;
  document.getElementById("employee-email").value = emp.employee_email;
  document.getElementById("employee-address").value = emp.employee_address;
  document.getElementById("form-title").innerText = "Editar empleado";
}

function deleteEmployee(id) {
  if (!confirm("¿Eliminar este empleado?")) {
    return;
  }

  axios.delete(url + "/employees/" + id, headers)
    .then(function (res) {
      if (res.data.code === 200) {
        alert("Empleado eliminado");
        loadEmployees();
      } else {
        alert(res.data.message || "Error al eliminar empleado");
      }
    })
    .catch(function (err) {
      console.log(err);
      alert("Error al eliminar empleado");
    });
}