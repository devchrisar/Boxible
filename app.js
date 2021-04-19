/* global bodymovin */
window.onload = function () {
  $('#Encarga').delay(300).fadeOut();
  $('#body-pd').removeClass('hidden_BD');
};
document.addEventListener('DOMContentLoaded', () => {
//* animacion lottie libreria//
  bodymovin.loadAnimation({
    container: document.getElementById('bodymo'),
    path: '../boxible/source/anim.json',
    renderer: 'svg',
    loop: true,
    autoplay: true,
    name: 'animacion_Form',
  });

  function myonclickFn(link) {
    document.location.href = `${link}`;
  }
  document.getElementById('todo_btn').onclick = function () {
    myonclickFn('../boxible/source/index.html');
  };
  //* formulario login
  function dispData() {
    if (localStorage.getItem('formData')) {
      const { fname, fage } = JSON.parse(localStorage.getItem('formData') || '{}');
      const output = document.getElementById('output');
      output.innerHTML = `
  <table>
    <tbody>
      <tr>
        <td>Bienvenido</td>
        <td>${fname}</td>
      </tr>
      <tr>
        <td>Edad</td>
        <td>${fage} años</td>
        </tr>
        </tbody>
        </table>
        <div class="ldBar" data-value="10" data-preset="stripe">
        </div>
`;
    }
  }
  dispData();
  // * login y validación de usuario//
  $('#btn_enviarFr').click(() => {
    if ($('#formulario').valid() === true) {
      const signUp = (e) => {
        const formData = {
          fname: document.getElementById('fname').value,
          fage: document.getElementById('fage').value,
        };
        localStorage.setItem('formData', JSON.stringify(formData));
        dispData();
        e.preventDefault();
      };
      document.getElementById('formulario').addEventListener('submit', signUp);
    }
    const fname = $('#fname').val();
    const fage = $('#fage').val();
  });
  //* valido el campo ingresado por el usuario ,usa  la libreria jquery validate //
  $('#formulario').validate({
    rules: {
      fage: {
        required: true,
        digits: true,
        minlength: 1,
        maxlength: 3,
        min: 5,
        max: 120,
      },
      fname: {
        required: true,
        minlength: 3,
        maxlength: 15,
      },
    },
  });
  //* EXPANDER MENU  ===== */
  const showMenu = (toggleId, navbarId, bodyId) => {
    const toggle = document.getElementById(toggleId);
    const navbar = document.getElementById(navbarId);
    const bodypadding = document.getElementById(bodyId);

    if (toggle && navbar) {
      toggle.addEventListener('click', () => {
        navbar.classList.toggle('expander');

        bodypadding.classList.toggle('body-pd');
      });
    }
  };
  showMenu('nav-toggle', 'navbar', 'body-pd');

  /*= ==== LINK ACTIVE  ===== */
  const linkColor = document.querySelectorAll('.nav__link');
  function colorLink() {
    linkColor.forEach((l) => l.classList.remove('active'));
    this.classList.add('active');
  }
  linkColor.forEach((l) => l.addEventListener('click', colorLink));

  /*= ==== COLLAPSE MENU  ===== */
  const linkCollapse = document.getElementsByClassName('collapse__link');
  let i;

  for (i = 0; i < linkCollapse.length; i += 1) {
    linkCollapse[i].addEventListener('click', function () {
      const collapseMenu = this.nextElementSibling;
      collapseMenu.classList.toggle('showCollapse');

      const rotate = collapseMenu.previousElementSibling;
      rotate.classList.toggle('rotate');
    });
  // }
  // //* ENTREGABLE AJAX usando un block de notas*/
  // // test posiblemente cambie por completo este código por ahora es solo para la entrega
  // function ajax() {
  //   console.log('funcion activada');
  //   const xhttp = new XMLHttpRequest();
  //   xhttp.open('GET', 'bloc.txt', true);
  //   xhttp.send();
  //   xhttp.onreadystatechange = function () {
  //     if (this.readyState === 4 && this.status === 200) {
  //       document.querySelector('#obtener_ajax').innerHTML = this.responseText;
  //     }
  //   };
  // }
  // document.querySelector('#ajax_btn').addEventListener('click', ajax);
  // ? separo al usuario por grupo

  // const fname = $('#fname').val();
  // const fage = $('#fage').val();
  // function agrupar(fname, fage) {
  //   switch (true) {
  //     case usermsg2 >= 5 && usermsg2 <= 15:
  //       const edad1 = agrupar('te encuentras en el grupo juvenil');
  //       break;
  //     case usermsg2 > 15 && usermsg2 <= 25:
  //       const fage = agrupar('te encuentras en el grupo joven');
  //       break;
  //     case usermsg2 > 25 && usermsg2 <= 45:
  //       const edad3 = agrupar('te encuentras en el grupo adulto-joven');
  //       break;
  //     case usermsg2 > 45 && usermsg2 <= 65:
  //       const edad4 = agrupar('te encuentras en el grupo adulto');
  //       break;
  //     case usermsg2 > 65 && usermsg2 <= 120:
  //       const edad5 = agrupar('te encuentras en el grupo adulto mayor');
  //       break;
  //     default:
  //       alert('Bienvenido');
  //       break;
  //   }
  // }
  //* cronometro solo se puede pausar iniciar y restablecer*/
  // let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  // let timerRef = document.querySelector(".valor_relog");
  // let int = null;

  // document.getElementById("iniciarReg").addEventListener("click", () => {
  //   if (int !== null) {
  //     clearInterval(int);
  //   }
  //   int = setInterval(displayTimer, 10);
  // });

  // document.getElementById("pausarReg").addEventListener("click", () => {
  //   clearInterval(int);
  // });

  // document.getElementById("restaReg").addEventListener("click", () => {
  //   clearInterval(int);
  //   [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  //   timerRef.innerHTML = "00 : 00 : 00 : 000 ";
  // });

  // function displayTimer() {
  //   milliseconds += 10;
  //   if (milliseconds == 1000) {
  //     milliseconds = 0;
  //     seconds++;
  //     if (seconds == 60) {
  //       seconds = 0;
  //       minutes++;
  //       if (minutes == 60) {
  //         minutes = 0;
  //         hours++;
  //       }
  //     }
  //   }
  //   let h = hours < 10 ? "0" + hours : hours;
  //   let m = minutes < 10 ? "0" + minutes : minutes;
  //   let s = seconds < 10 ? "0" + seconds : seconds;
  //   let ms =
  //     milliseconds < 10
  //       ? "00" + milliseconds
  //       : milliseconds < 100
  //       ? "0" + milliseconds
  //       : milliseconds;

  //   timerRef.innerHTML = ` ${h} : ${m} : ${s} : ${ms}`;
  // }
  //* calculadora para determinar por medio de la altura y peso el estado del usuario*/
  // oninput = calcularIMC;
  // function calcularIMC() {
  //   var imc;
  //   var resultado = document.getElementById("resultado");

  //   var Peso = parseInt(document.getElementById("peso").value);
  //   document.getElementById("peso-val").textContent = Peso + " kg";

  //   var Altura = parseInt(document.getElementById("altura").value);
  //   document.getElementById("altura-val").textContent = Altura + " cm";

  //   imc = (Peso / Math.pow(Altura / 100, 2)).toFixed(1);
  //   resultado.textContent = imc;

  //   if (imc < 18.5) {
  //     categoria = "Peso bajo";
  //     resultado.style.color = "#ffc44d";
  //   } else if (imc >= 18.5 && imc <= 24.9) {
  //     categoria = "Saludable";
  //     resultado.style.color = "#0be881";
  //   } else if (imc >= 25 && imc <= 29.9) {
  //     categoria = "Sobrepeso";
  //     resultado.style.color = "#ff884d";
  //   } else {
  //     categoria = "Obesidad";
  //     resultado.style.color = "#ff5e57";
  //   }
  //   document.getElementById("categoria").textContent = categoria;
  // }

  // * calculo capacidad vital//
  // const calculovital = (VRI, VC, VRE) => VRI + VC + VRE;
  // const resultadoCalculo = `${calculovital(23, 22, 43)} L`;
// ? función de uso para mas adelante ; se encargara de determinar la capacidad vital o de oxigeno de un usuario y también por medio de un switch para las edades buscara cual plan de entrenamiento es mas conveniente para el usuario
});
