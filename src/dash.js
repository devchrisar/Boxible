import './dash.css'
  //? cargador (corazon que gira al cargar la pagina) */
window.onload = function () {
  $('#Encarga').delay(300).fadeOut();
  $('#body-pd').removeClass('hidden_BD');
};
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
  //? enrutador donde se crearan los links de cada sección */
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
});