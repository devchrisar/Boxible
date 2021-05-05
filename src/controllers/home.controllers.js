import views from '../views/home.html';
import '../css/home.css';
import '../source/fontawesome.js';
import '../source/traduccion.js';
import  '../utils/firebase.config.js';
export default () =>{
    const divElement = document.createElement('div');
    divElement.innerHTML = views;
    //? Aca estoy utilizando lo que seria el divElement para cargar los datos ya que esos estan cargados alli y si no lanzaría un error por tratar de cargar un código que aun no existe para la constante bodypadding utilizo document en vez de divElement ya que esa de por si ya esta cargada o definida en el propio body del documento principal dash.html

    //* codigo del login*/
const signUpButton = divElement.querySelector('#signUp');
const signInButton = divElement.querySelector('#signIn');
const container = divElement.querySelector('#containerlg');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
    //* validación login*/
  //   function dispData() {
  //     if (localStorage.getItem('formData')) {
  //       const { fname, fage, femail } = JSON.parse(localStorage.getItem('formData') || '{}');
  //       // ? no llamo a la contraseña porque no me parece correcto guardarla en el localstorage//
  //       const output = document.getElementById('output');
  //       const imgUser = '../boxible/source/logo_Nomark.svg';
  //       output.innerHTML = `
  //       <div id="userCard" >
  //         <div>
  //           <img class="avatar" src="${imgUser}"  alt="${fname}.png" />
  //         </div>
  //         <table id="tablaLG">
  //           <tbody>
  //             <tr>
  //               <td>Bienvenido</td>
  //               <td>${fname}</td>
  //             </tr>
  //             <tr>
  //               <td>Edad</td>
  //               <td>${fage} años</td>
  //               </tr>
  //               <tr>
  //               <td>Email</td>
  //               <td>${femail}</td>
  //               </tr>
  //           </tbody>
  //         </table>
  //               <div class="ldBar" data-value="0" data-preset="stripe">
  //               </div>
  //       <div>
  // `;
  //     }
  //   }
  //   dispData();
    // $(document).ready(() => {
    //   const b1 = document.querySelector('.ldBar');
    //   const b = new ldBar(b1);
    //   b.set(0);
    //   setInterval(() => {
    //     b.set(Math.round(Math.random() * 100));
    //   }, 7100);
    // });
    // //* valido info del formulario a Firebase //
    // async function Ingresar(femail, fpassW) {
    //   const creds = await auth.createUserWithEmailAndPassword(femail, fpassW);
    //   return db.collection('usuarios').doc(creds.user.uid).set({
    //     fname: document.getElementById('fname').value,
    //   });
    // }
    // * login y validación de usuario//
    //? registro
    const btn_lG = divElement.querySelector('.btn_enviarFr');
    const FormVal = divElement.querySelector('.formulario');
    $(btn_lG).click(() => {
      if ($(FormVal).valid() === true) {
        const signUp = (e) => {
          const formData = {
            fname: divElement.querySelector('.fname').value,
            femail: divElement.querySelector('.femail').value,
          };
          localStorage.setItem('formData', JSON.stringify(formData));
          // dispData();
          e.preventDefault();
        };
        FormVal.addEventListener('submit', signUp);
      }
      const fname = $('.fname').val();
      const femail = $('.femail').val();
      const fpassW = $('.fpassW').val();
    });
    //? iniciar sesión
    const btn_lG2 = divElement.querySelector('.btn_enviarFr2');
    const FormVal2 = divElement.querySelector('.formulario2');
    $(btn_lG2).click(() => {
      if ($(FormVal2).valid() === true) {
      const signUp = (e) => {
        const formData = {
          femail: divElement.querySelector('.femail2').value,
        };
        localStorage.setItem('formData', JSON.stringify(formData));
        // dispData();
        e.preventDefault();
      };
      FormVal2.addEventListener('submit', signUp);
    }
    const femail = $('.femail2').val();
    const fpassW = $('.fpassW2').val();
  });
    //* valido el campo ingresado por el usuario ,usa  la libreria jquery validate //
    var validator = $(FormVal,FormVal2).validate({
      rules: {
        fname: {
          required: true,
          minlength: 3,
          maxlength: 15,
        },
        femail: {
          required: true,
          email: true,
        },
        fpassW: {
          required: true,
          minlength: 6,
        },
      },
    });
//? configuración de firebase
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyCK2C9t6ZKE5qXI8xvj-cIftRnoCu-e1OY',
  authDomain: 'boxible-3d5e8.firebaseapp.com',
  projectId: 'boxible-3d5e8',
  storageBucket: 'boxible-3d5e8.appspot.com',
  messagingSenderId: '235927310225',
  appId: '1:235927310225:web:725cc2a26dfa3be6b79430',
  measurementId: 'G-1QDCQ7QK2Q',
};

// firebase.analytics();
const auth = firebase.auth();
const db = firebase.firestore();
const func = firebase.functions();

//? tuve un problema al utilizar firebase al parecer por lo que entendi como estoy creando cada vez contenido dinamico el cual se va imprimiendo una y otra vez como un bucle esto crea que firebase se vaya instanciando varias veces lo cual no le es posible y arroja el siguiente error por consola (Firebase App named ‘[DEFAULT]’ already exists (app/duplicate-app) investigando encontre el siguiente codigo que lo soluciona a travez de la propiedad length)
if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(config);
}
//! 'auth/user-not-found': 'No se a encontrado un usuario registrado a esta cuenta',
    



    //*=============FIREBASE AUTH ==================

    //*firebase registro
    const singupForm = divElement.querySelector('#signup-form');
    singupForm.addEventListener('submit',(e) =>{
      e.preventDefault();
      const Email = divElement.querySelector('#signup-email').value;
      const Password = divElement.querySelector('#signup-password').value;
      const inputs = divElement.querySelectorAll('input')

      
      auth 
          .createUserWithEmailAndPassword(Email,Password)
          .then(userCredential =>{
            //? limpiar el formulario
            inputs.forEach( input => input.value='')
            //! eliminar console.log 
            console.log('sign up')
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Registro con éxito',
              showConfirmButton: false,
              timer: 1500
            });
            //? errores de firebase
          }).catch(error => {
          switch(error.code) {
            case 'auth/email-already-in-use':
              Swal.fire({
                icon: 'error',
                text: 'El correo ya se encuentra registrado!',
                  })
                  break;
            case 'auth/weak-password':
                  Swal.fire({
                    icon: 'error',
                    text: 'La contraseña es muy débil (mínimo 6 caracteres)',
                  })
                  break;
            case 'auth/invalid-email':
                  Swal.fire({
                    icon: 'error',
                    text: 'El correo no es valido, por favor seleccione otro',
                  })
                  break;
      }
        })
      });
      //*firebase login
      const signinForm = divElement.querySelector('#login-form');
      signinForm.addEventListener('submit',(e) =>{
        e.preventDefault();
      const Email = divElement.querySelector('#login-email').value;
      const Password = divElement.querySelector('#login-password').value;
      const inputs = divElement.querySelectorAll('input')

      auth 
          .signInWithEmailAndPassword(Email,Password)
          .then(userCredential =>{
            //? limpiar el formulario
            inputs.forEach( input => input.value='')
            //? ocultar el formulario
            //! eliminar console.log 
            console.log('sign In')
          }).catch(error => {
              switch(error.code) {
                case 'auth/wrong-password':
                  Swal.fire({
                    icon: 'error',
                    text: 'La contraseña no concuerda con el correo utilizado',
                      })
                      break;
                case 'auth/user-not-found':
                      Swal.fire({
                        icon: 'error',
                        text: 'No se ha encontrado un registro con ese usuario',
                      })
                      break;
                case 'auth/invalid-email':
                      Swal.fire({
                        icon: 'error',
                        text: 'El correo no es valido, por favor seleccione otro',
                      })
                      break;
                case 'auth/user-disabled':
                      Swal.fire({
                        icon: 'error',
                        text: 'Este usuario se encuentra deshabilitado',
                      })
                      break;
          }
            })
    });
    //*firebase logout
    const logout = divElement.querySelector('#logout');
    logout.addEventListener('click',(e) =>{
    e.preventDefault();
    auth.signOut().then(() => {
      console.log('logout')
    })
  })

    //* codigo del sidebar*/
        const showMenu = (toggleId, navbarId, bodyId) => {
            const toggle = divElement.querySelector(toggleId);
            const navbar = divElement.querySelector(navbarId);
            const bodypadding = document.querySelector(bodyId);
        
            if (toggle && navbar) {
              toggle.addEventListener('click', () => {
                navbar.classList.toggle('expander');
        
                bodypadding.classList.toggle('body-pd');
              });
            }
          };
          showMenu('#nav-toggle', '#navbarSide', '#body-pd');
        
          /*= ==== LINK ACTIVE  ===== */
          const linkColor = divElement.querySelectorAll('.nav__linkSide');
          function colorLink() {
            linkColor.forEach((l) => l.classList.remove('active'));
            this.classList.add('active');
          }
          linkColor.forEach((l) => l.addEventListener('click', colorLink));
        
          /*= ==== COLLAPSE MENU  ===== */
          const linkCollapse = divElement.getElementsByClassName('collapse__linkSide');
          let i;
        
          for (i = 0; i < linkCollapse.length; i += 1) {
            linkCollapse[i].addEventListener('click', function () {
              const collapseMenu = this.nextElementSibling;
              collapseMenu.classList.toggle('showCollapse');
        
              const rotate = collapseMenu.previousElementSibling;
              rotate.classList.toggle('rotate');
            });
          }
            //* cambiar tema SECCIÓN MODO OSCURO*/
            //?EL CSS DE ESTA SECCIÓN SE ENCUENTRA Dash.CSS PUDE HABERLO HECHO EN OTRO CSS  PARA HACER AL CÓDIGO MAS PROLIJO PERO NO QUERÍA AGREGAR UNO EXTRA SOLO PARA CAMBIAR AL MODO NOCTURNO
            $(document).ready(function () {
    const btnswitchTheme = divElement.querySelector('#switchTheme')
    const Eden = divElement.querySelector('#pic_Theme')
    const Nova = divElement.querySelector('#pic_Theme2')
    const textema = divElement.querySelector('#navTheme_p')
    const textema2 = divElement.querySelector('#navTheme_p2')
    btnswitchTheme.addEventListener('click',() =>{
    document.body.classList.toggle('dark');
    btnswitchTheme.classList.toggle('Activado')
    Eden.classList.toggle('nav_hidden')
    textema.classList.toggle('nav_hidden')
    Nova.classList.toggle('nav_hidden')
    textema2.classList.toggle('nav_hidden')

     //? Guardamos el modo eden o nova en localstorage.
	if(document.body.classList.contains('dark')){
		localStorage.setItem('dark-mode', 'true');
	} else {
		localStorage.setItem('dark-mode', 'false');
	}
    })

   //? Obtenemos el tema eden o nova actual.
if(localStorage.getItem('dark-mode') === 'true'){
	document.body.classList.add('dark');
	btnswitchTheme.classList.add('active');
  Nova.classList.remove('nav_hidden')
  textema2.classList.remove('nav_hidden')
  Eden.classList.add('nav_hidden')
    textema.classList.add('nav_hidden')
} else {
	document.body.classList.remove('dark');
	btnswitchTheme.classList.remove('active');
}
            })
    return divElement
}
