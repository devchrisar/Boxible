import views from '../views/home.html';
import '../css/home.css';
import '../source/fontawesome.js';
import '../source/traduccion.js';
import  '../utils/firebase.config.js';
import '../source/FitnessStats.svg';
import '../source/logo_transp.svg';
import '../source/runner.svg';
import '../source/pcComents.svg';
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
    function dispData() {
      if (localStorage.getItem('formData')) {
        const { fname,femail } = JSON.parse(localStorage.getItem('formData') || '{}');
        // ? no llamo a la contraseña porque no me parece correcto guardarla en el localstorage//
        const outputUserEmail = divElement.querySelector('#User-Email');
        const outputUserName = divElement.querySelector('#User-Name');
        outputUserName.innerHTML = `<tr><td>Bienvenido</td>
        <td>${fname}</td></tr>`
        outputUserEmail.innerHTML = `
        <div id="userCard" >
          <table id="tablaLG">
          <tbody>
          <tr>
          <td>${femail}</td>
          </tr>
          </tbody>
          </table>
          <div>
          `;
        }
        const outputLDBar = divElement.querySelector('#LdbArbox');
      outputLDBar.innerHTML = `
      <div class="ldBar" data-value="0" data-preset="stripe">
      </div>`
    }
    dispData();
    $(document).ready(() => {
      const b1 = document.querySelector('.ldBar');
      const b = new ldBar(b1);
      b.set(0);
      setInterval(() => {
        b.set(Math.round(Math.random() * 100));
      }, 7100);
    });
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
        dispData();
          e.preventDefault();
        };
        FormVal.addEventListener('submit', signUp);
      }
      const fname = $('.fname').val();
      const femail = $('.femail').val();
    });
    //? iniciar sesión
    const btn_lG2 = divElement.querySelector('.btn_enviarFr2');
    const FormVal2 = divElement.querySelector('.formulario2');
    $(btn_lG2).click(() => {
      if ($(FormVal2).valid() === true) {
      const signUp = (e) => {
        const formData = {
          fname: divElement.querySelector('.fname').value,
          femail: divElement.querySelector('.femail2').value,
        };
        localStorage.getItem('formData', JSON.stringify(formData));
        localStorage.setItem('formData', JSON.stringify(formData));
          dispData();
        e.preventDefault();
      };
      FormVal2.addEventListener('submit', signUp);
    }
    const femail = $('.femail2').val();
    const fname = $('.fname').val();
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


//? tuve un problema al utilizar firebase al parecer por lo que entendi como estoy creando cada vez contenido dinamico el cual se va imprimiendo una y otra vez como un bucle esto crea que firebase se vaya instanciando varias veces lo cual no le es posible y arroja el siguiente error por consola (Firebase App named ‘[DEFAULT]’ already exists (app/duplicate-app) investigando encontre el siguiente codigo que lo soluciona a travez de la propiedad length)
if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(config);
}



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
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Registro con éxito',
              showConfirmButton: false,
              timer: 1500
            });
            window.location.reload();
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
        window.location.reload();
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
                    window.location.reload();
                  })
                });
                //*firebase mostrar y ocultar elementos
                auth.onAuthStateChanged(user =>{
    const form = divElement.querySelector('#containerlg')
    const DIVhome = divElement.querySelector('#contenedor-HOME_central')
    const DIVlogout = divElement.querySelector('#l0gOut_div')
    const DIVlogoutIcon = divElement.querySelector('#l0gOut_icon')
    if (user) {
      form.classList.add('nav_hidden');
      DIVhome.classList.remove('nav_hidden');
      DIVlogout.classList.remove('nav_hidden');
      DIVlogoutIcon.classList.remove('nav_hidden');
      divElement.querySelector('#ImagenDinam').innerHTML += "<img onerror=this.style.display='none' class='profpic' src='"+`${user.photoURL ??"" }` +"' />";
      divElement.querySelector('#User-Name').innerHTML =`<td>${user.displayName ??"Usuario"}</td>`;
      divElement.querySelector('#User-Email').innerHTML =`<tr><td>${user.email ??""}</td></tr>`;      

                        //*============= CHAT  ==================
                        const CHAT = divElement.querySelector('#Chat_home');
                        const MensajeCHAT = divElement.querySelector('#mensaje');
                        const {uid,displayName,photoURL,email} = user;
                        CHAT.addEventListener('submit',(e)=>{
                          e.preventDefault()
                          if (!MensajeCHAT.value.trim()) {
                            Swal.fire({
                              icon: 'error',
                              text: 'Por favor introduce algún mensaje',
                                })
                            return
                          }
                          db
                          .collection("Mensajes")
                          .doc(user.uid)
                          .set({
                            texto: MensajeCHAT.value,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            uid,
                            displayName,
                            photoURL,
                            email
                        })
                        .then((docRef) => {
                          MensajeCHAT.value = ''
                        })
                        .catch((error) => {
                                  let timerInterval
                                  Swal.fire({
                                    title: 'Oops a ocurrido algo!!',
                                    icon: 'warning',
                                    html: '<h1>posibles errores:</h1>' +
                                    '<p><span class="swal-Blue">1.</span>La operación que esta tratando de realizar no le es permitido y solo puede ser ejecutado por un <span class="swal-Blue">ADMIN.</span></p>'+
                                    '<p><span class="swal-Red">2.</span> A intentado  realizar un comentario en un corto lapso de tiempo, si es asi por favor <span class="swal-Red">espere el tiempo indicado.</span></p>'+
                                    'Debes esperar <strong class="swal-Red swal-NmbCount"></strong> segundos para volver a comentar, esto para evitar spam.<br/><br/>',
                                  timer: 40000,
                                  onOpen: () => {
                                    timerInterval = setInterval(() => {
                                      swal.getContent().querySelector('strong')
                                        .textContent = Math.ceil(swal.getTimerLeft() / 1000)
                                    }, 100)
                                  },
                                  onClose: () => {
                                    clearInterval(timerInterval)
                                  }
                                })
                        });
                      });
                      //* rrecorro la informacion de los mensajes en la base de datos
                      db
                          .collection('Mensajes')
                          .orderBy('timestamp')
                          .onSnapshot(query =>{
                            divMensajeDinamico.innerHTML = '';
                            query.forEach(doc =>{
                              divMensajeDinamico.innerHTML += `
                              <div class="comments-container">
                              <ul id="comments-list" class="comments-list">
        
                                  <div class="comment-main-level">
                                    <div class="comment-avatar">
                                      <img onerror=this.style.display='none'
                                        src="${doc.data().photoURL ??"https://ui-avatars.com/api/?background=random&name=usuario" }" />
                                    </div>
                            
                                    <div class="comment-box">
                                      <div class="comment-head">
                                        <h6 class="comment-name"><p>${doc.data().displayName ??"Usuario"}</p></h6>
                                        <span>${moment(doc.data().timestamp && doc.data().timestamp.toDate()).calendar()}</span>
                                      </div>
                            
                                      <div class="comment-content">${doc.data().texto}</div>
                                    </div>
                                  </div>
        
                                </ul> 
                                </div>                
                              `
                              divMensajeDinamico.scrollTop = divMensajeDinamico.scrollHeight
                            })
                          });
    }
    else{
      form.classList.remove('nav_hidden');
      DIVhome.classList.add('nav_hidden');
      DIVlogout.classList.add('nav_hidden');
      DIVlogoutIcon.classList.add('nav_hidden');
    }
  });
  //*============= INTEGRACIÓN FIREBASE REDES SOCIALES  ==================
  //*integración con google
  const googleBtn = divElement.querySelector('#googleLogin')
  googleBtn.addEventListener('click', e => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
    //* Informacion del usuario google facebook github,etc*/
    .then(result =>{
            //? llamo a la funcion para guardar los datos a la base de datos
            GuardarDatos(result.user);
            window.location.reload();
    })
    .catch(error => {
      switch(error.code) {
        case 'auth/account-exists-with-different-credential':
          Swal.fire({
            icon: 'error',
            text: 'El correo de esta cuenta ya se encuentra registrada, Por favor utilize otra cuenta',
              })
              break;
        case 'auth/cancelled-popup-request':
              Swal.fire({
                icon: 'error',
                text: 'A cerrado la ventana emergente de Google o a tratado de iniciar varios registros al mismo tiempo',
              })
              break;
        case 'auth/popup-blocked':
              Swal.fire({
                icon: 'error',
                text: 'La ventana emergente a sido bloqueada por su navegador',
              })
              break;
        case 'auth/popup-closed-by-user':
              Swal.fire({
                icon: 'error',
                text: 'A cerrado la ventana emergente de Google sin rellenar la informacion',
              })
              break;
  }
    })
  });
  //*integración con facebook
  const facebookBtn = divElement.querySelector('#facebookLogin')
  facebookBtn.addEventListener('click', e => {
    e.preventDefault()
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
    //* Informacion del usuario google facebook github,etc*/
    .then(result =>{
            //? llamo a la funcion para guardar los datos a la base de datos
            GuardarDatos(result.user);
            window.location.reload();
    })
    .catch(error => {
      switch(error.code) {
        case 'auth/account-exists-with-different-credential':
          Swal.fire({
            icon: 'error',
            text: 'El correo de esta cuenta ya se encuentra registrada, Por favor utilize otra cuenta',
              })
              break;
        case 'auth/cancelled-popup-request':
              Swal.fire({
                icon: 'error',
                text: 'A cerrado la ventana emergente de Facebook o a tratado de iniciar varios registros al mismo tiempo',
              })
              break;
        case 'auth/popup-blocked':
              Swal.fire({
                icon: 'error',
                text: 'La ventana emergente a sido bloqueada por su navegador',
              })
              break;
        case 'auth/popup-closed-by-user':
              Swal.fire({
                icon: 'error',
                text: 'A cerrado la ventana emergente de Facebook sin rellenar la informacion',
              })
              break;
  }
    })
  });
  //*integración con github
  const githubBtn = divElement.querySelector('#githubLogin')
  githubBtn.addEventListener('click', e => {
    e.preventDefault()
    const provider = new firebase.auth.GithubAuthProvider();
    auth.signInWithPopup(provider)
    //* Informacion del usuario google facebook github,etc*/
    .then(result =>{
      //? llamo a la funcion para guardar los datos a la base de datos
      GuardarDatos(result.user);
      window.location.reload();
    })
    .catch(error => {
      switch(error.code) {
        case 'auth/account-exists-with-different-credential':
          Swal.fire({
            icon: 'error',
            text: 'El correo de esta cuenta ya se encuentra registrada, Por favor utilize otra cuenta',
              })
              break;
        case 'auth/cancelled-popup-request':
              Swal.fire({
                icon: 'error',
                text: 'A cerrado la ventana emergente de Github o a tratado de iniciar varios registros al mismo tiempo',
              })
              break;
        case 'auth/popup-blocked':
              Swal.fire({
                icon: 'error',
                text: 'La ventana emergente a sido bloqueada por su navegador',
              })
              break;
        case 'auth/popup-closed-by-user':
              Swal.fire({
                icon: 'error',
                text: 'A cerrado la ventana emergente de Github sin rellenar la informacion',
              })
              break;
  }
    })
  });
  //* restablecer contraseña*/
  const olvidoContra = divElement.querySelector('#forgotPss')
  olvidoContra.addEventListener('click', e =>{
    //*? llamo a la alerta despues del click*/
    swal.fire({
      title: 'Ingresa el correo con el que realizaste el registro y te enviaremos un mail de validación',
      input: 'email',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      inputPlaceholder: 'Correo Electrónico',
      focusConfirm: false,
      inputAutoTrim: 'true',
      showLoaderOnConfirm: true,
      inputAttributes: {
              autocapitalize: 'off'
          },
      preConfirm: function (email) {
        return new Promise(function (resolve, reject) {
          setTimeout(function() {
            if (email === '') {
              reject('Por favor ingrese un correo')
            } else {
              resolve()
            }
          }, 4000)
        })
      },//*? envió la informacion a firebase*/
      allowOutsideClick: true
    }).then(function (email) {
      const prueba = JSON.stringify(email)
      Swal.fire(`${prueba}`)
          const correoUser = email.value
          auth.sendPasswordResetEmail(correoUser).then(function(){
            if (correoUser) {
              Swal.fire({
                title: 'Se ha enviado con éxito',
                text: 'Comprueba tu bandeja de spam o basura si no encuentras el correo enviado',
                icon: 'success'
              })
            }
          })
        }).catch((err) => Swal.fire({icon: 'error', title: err})) //*?atrapo errores*/       
            });
            
              //* guardo la informacion del usuario en la base de datos
              function GuardarDatos(user){
                db
                  .collection("usuarios")
                  .doc(user.uid)
                  .set({
                    userID: user.uid,
                    nombre: user.displayName,
                    email: user.email,
                    foto: user.photoURL
                  })
                };

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
        
          //?= ==== LINK ACTIVE  ===== */
          const linkColor = divElement.querySelectorAll('.nav__linkSide');
          function colorLink() {
            linkColor.forEach((l) => l.classList.remove('active'));
            this.classList.add('active');
          }
          linkColor.forEach((l) => l.addEventListener('click', colorLink));
        
          //?= ==== COLLAPSE MENU  ===== */
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
