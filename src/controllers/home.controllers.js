import views from '../views/home.html'
import '../css/home.css'
export default () =>{
    const divElement = document.createElement('div');
    divElement.innerHTML = views;
    //? Aca estoy utilizando lo que seria el divElement para cargar los datos ya que esos estan cargados alli y si no lanzaría un error por tratar de cargar un código que aun no existe para la constante bodypadding utilizo document en vez de divElement ya que esa de por si ya esta cargada o definida en el propio body del documento principal dash.html
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
