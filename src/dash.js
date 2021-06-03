import './dash.css';
import './source/phoneFlyer.svg';
import './source/logo_transp.svg';
  //? cargador (corazón que gira al cargar la pagina) */
  window.onload = function () {
    $('#Encarga').delay(300).fadeOut();
    $('#body-pd').removeClass('hidden_BD');
  };
  //? mensaje de error para usuarios móviles
  if (screen.width < 1100) { 
    Swal.fire({
      title: 'Lo sentimos',
      text: "Como equipo de Boxible estamos trabajando para darte las mejores características de la aplicación,lamentablemente aún no contamos con una app para dispositivos móviles, pero no descartamos crear una😉.",
      icon: 'info',
      iconHtml: '<img src="./src/source/logo_transp.svg" width="190" height="210">',
      allowOutsideClick: () => {
        const popup = Swal.getPopup()
        popup.classList.remove('swal2-show')
        setTimeout(() => {
          popup.classList.add('animate__animated', 'animate__headShake')
        })
        setTimeout(() => {
          popup.classList.remove('animate__animated', 'animate__headShake')
        }, 500)
      },
      showCancelButton: false,
      showConfirmButton: false,
      imageUrl: './src/source/phoneFlyer.svg',
      imageAlt: 'imagen de referencia app movil',
      footer: '<a class="movilError_boton">!Por favor visita la app desde una laptop,ordenador o computador de escritorio¡</a>'
    })
 } 
  //* bloque de codigo para el tab-bar con el cual se desplazara de sección en sección */
const navigationOptions = [
    {
      name: 'inicio',
      color: '#5B37B7',
    },
    {
      name: 'salud',
      color: '#C9379D',
    },
    {
      name: 'entreno',
      color: '#1A0870',
    },
    {
      name: 'nutrición',
      color: '#3C9BA5',
    },
  ];
  
  // target all anchor link elements
  const links = document.querySelectorAll('nav a');
  
  // function called in response to a click event on the anchor link
  function handleClick(e) {
    links.forEach((link) => {
      if (link.classList.contains('active')) {
        link.classList.remove('active');
        this.classList.add('active');
      }
      links.forEach((link) => link.addEventListener('click', handleClick));
    });
    // retrieve the option described the link element
    const name = this.textContent.trim().toLowerCase();
    // find in the array the object with the matching name
    // store a reference to its color
    const { color } = navigationOptions.find((item) => item.name === name);
  
    // retrieve the custom property for the --hover-c property, to make it so that the properties are updated only when necessary
    const style = window.getComputedStyle(this);
    const hoverColor = style.getPropertyValue('--hover-c');
    // if the two don't match, update the custom property to show the hue with the text and the semi transparent background
    if (color !== hoverColor) {
      this.style.setProperty('--hover-bg', `${color}20`);
      this.style.setProperty('--hover-c', color);
    }
  
    // apply the class of active to animate the svg an show the span element
    this.classList.add('active');
  }
  // link active when reload
    $(function($) {
      let url = window.location.href;
      $('#movePage a').each(function() {
        if (this.href === url) {
          this.classList.add('active');
        }
      });
    });
  //? enrutador donde se crearan los links de cada sección, si no existe lanza 404 */
  import {router} from './router/index.routes'
  router(window.location.hash)
  window.addEventListener('hashchange', () =>{
    router(window.location.hash)
  })
  // listen for a click event on each and every anchor link
  links.forEach((link) => link.addEventListener('click', handleClick));
  

  //? cambio el css de la sección entreno para que cuando se agreguen muchas tareas el tab-bar se haga a un lado
  $(document).ready(function () {
    var menu = $('#movePage');
    var origOffsetY = menu.offset().top - 700;
    function scroll() {
        if ($(window).scrollTop() >= origOffsetY) {
            $('#movePage').addClass('cambiado');
        } else {
            $('#movePage').removeClass('cambiado');
        }
    }
    document.onscroll = scroll;

     //? Aca vuelvo a llamar al local storage porque al estar el original definido en home.controllers.js (funciona bien) pero si el usuario recarga en una pagina diferente a la de home ejemplo nutricion se termina activando el modo oscuro(puede probarlo si eliminá estas lineas de código) si tenia activado el claro y para arreglarlo tocaría regresar al home de nuevo y asi se volvería a activar el modo claro  esto es por que como tal no lo estoy definiendo en el documento de origen o principal que seria dash si no en el home pero lo quería poner alli para cambiarle la clase a activado al switch que cambia el tema y para ocultar y mostrar los logos de cada tema.
    if(localStorage.getItem('dark-mode') === 'true'){
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');

    }
});