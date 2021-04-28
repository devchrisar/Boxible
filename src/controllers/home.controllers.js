import views from '../views/home.html'
import '../css/home.css'
export default () =>{
    const divElement = document.createElement('div');
    divElement.innerHTML = views;
    //? Aca estoy utilizando lo que seria el divElement para cargar los datos ya que esos estan cargados alli y si no lanzaría un error por tratar de cargar un código que aun no existe para la constante bodypadding utilizo document en vez de divElement ya que esa de por si ya esta cargada o definida en el propio body del documento principal dash.html
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
          showMenu('#nav-toggle', '#navbar', '#body-pd');
        
          /*= ==== LINK ACTIVE  ===== */
          const linkColor = divElement.querySelectorAll('.nav__link');
          function colorLink() {
            linkColor.forEach((l) => l.classList.remove('active'));
            this.classList.add('active');
          }
          linkColor.forEach((l) => l.addEventListener('click', colorLink));
        
          /*= ==== COLLAPSE MENU  ===== */
          const linkCollapse = divElement.getElementsByClassName('collapse__link');
          let i;
        
          for (i = 0; i < linkCollapse.length; i += 1) {
            linkCollapse[i].addEventListener('click', function () {
              const collapseMenu = this.nextElementSibling;
              collapseMenu.classList.toggle('showCollapse');
        
              const rotate = collapseMenu.previousElementSibling;
              rotate.classList.toggle('rotate');
            });
          }
    return divElement
}
