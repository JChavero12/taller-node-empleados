window.onload = init;

function init() {
  if (localStorage.getItem("token")) {
    window.location.href = "employees.html";
    return;
  }

  document.querySelector('.btn-secondary')
    .addEventListener('click', function () {
      window.location.href = "login.html";
    });

  document.querySelector('.btn-primary')
    .addEventListener('click', signin);
}

function signin() {
  var name = document.getElementById('input-name').value;
  var mail = document.getElementById('input-mail').value;
  var pass = document.getElementById('input-password').value;

  axios({
      method: 'post',
      url: 'http://localhost:3000/user/signin',
      data: {
          user_name: name,
          user_email: mail,
          user_password: pass
      }
  }).then(function(res) {
      if (res.data.code === 201) {
          alert('Registro exitoso');
          window.location.href = "login.html";
      } else {
          alert(res.data.message);
      }
  }).catch(function(err) {
      console.log(err);
      alert("Error al registrar usuario");
  });
}
