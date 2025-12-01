window.onload = init;

function init() {
  if (!localStorage.getItem("token")) {

    document.querySelector('.btn-secondary')
      .addEventListener('click', function () {
        window.location.href = "signin.html";
      });

    document.querySelector('.btn-primary')
      .addEventListener('click', login);

  } else {
    window.location.href = "employees.html";
  }
}

function login() {
  var email = document.getElementById('input-mail').value;
  var pass = document.getElementById('input-password').value;

  if (!email || !pass) {
    alert("Completa correo y contraseña.");
    return;
  }

  axios({
    method: 'post',
    url: 'http://localhost:3000/user/login',
    data: {
      user_email: email,
      user_password: pass
    }
  })
  .then(function (res) {
    if (res.data.code === 200) {
      localStorage.setItem('token', res.data.message);
      window.location.href = "employees.html";
    } else {
      alert('Usuario y/o contraseña incorrecta');
    }
  })
  .catch(function (err) {
    console.log(err);
    alert("Error al iniciar sesión");
  });
}
