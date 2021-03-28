document.addEventListener("DOMContentLoaded", () => {
  /* // * login y validación de usuario//
  let userlog = prompt("Hola por favor introduce tu nombre");
  let usermsg = userlog;
  let validuser = /^[a-zA-Z]+$/;
  if (usermsg == null || usermsg == "") {
    alert("por favor rellena el campo con tu nombre");
    window.location.reload();
  } else if (validuser.test(usermsg)) {
    alert("Bienvenido " + usermsg);
  } else {
    alert(
      "por favor vuelva a intentar,\n asegúrese de no dejar espacios o utilizar números  "
    );
    window.location.reload();
  }

  let userage = prompt("introduce tu edad");
  let usermsg2 = parseInt(userage);
  let validuser2 = /^[0-9]+$/;
  if (userage == null || userage == "") {
    alert("por favor rellena el campo con tu edad");
    window.location.reload();
  } else if (validuser2.test(usermsg2)) {
    alert("tienes " + usermsg2 + " años");
  } else {
    alert("por favor vuelva a intentar,\n asegúrese de no utilizar letras");
    window.location.reload();
  }*/

  document.getElementById("todo_btn").onclick = function () {
    myonclickFn("../boxible/index.html");
  };
  function myonclickFn(link) {
    document.location.href = `${link}`;
  }
  /*
  let userlog = prompt("Hola por favor introduce tu nombre");
  let usermsg = userlog;
  let validuser = /^[a-zA-Z]+$/;
  function Getname() {
    if (usermsg == null || usermsg == "") {
      alert("por favor rellena el campo con tu nombre");
      window.location.reload();
    } else if (validuser.test(usermsg)) {
      alert("Bienvenido " + usermsg);
    } else {
      alert(
        "por favor vuelva a intentar,\n asegúrese de no dejar espacios o utilizar números  "
      );
      window.location.reload();
    }
    return Getname;
  }
  Getname();

  let userage = prompt("introduce tu edad");
  let usermsg2 = parseInt(userage);
  let validuser2 = /^[0-9]+$/;
  function Getage() {
    if (userage == null || userage == "") {
      alert("por favor rellena el campo con tu edad");
      window.location.reload();
    } else if (validuser2.test(usermsg2)) {
      alert("tienes " + usermsg2 + " años");
    } else {
      alert("por favor vuelva a intentar,\n asegúrese de no utilizar letras");
      window.location.reload();
    }
    return Getage;
  }
  Getage;
  /*
  let userage = prompt("introduce tu edad");
  let usermsg2 = parseInt(userage);
  Getnameandages(
    userage,
    usermsg2,
    "por favor rellena el campo con tu edad",
    /^[0-9]+$/,
    "tienes " + usermsg2 + " años",
    "por favor vuelva a intentar,\n asegúrese de no utilizar letras"
  );

  // ? separo al usuario por grupo
  agrupar(usermsg2);
  function agrupar(usermsg2) {
    switch (true) {
      case usermsg2 >= 5 && usermsg2 <= 15:
        let edad1 = alert("te encuentras en el grupo juvenil");
        break;
      case usermsg2 > 15 && usermsg2 <= 25:
        let edad2 = alert("te encuentras en el grupo joven");
        break;
      case usermsg2 > 25 && usermsg2 <= 45:
        let edad3 = alert("te encuentras en el grupo adulto-joven");
        break;
      case usermsg2 > 45 && usermsg2 <= 65:
        let edad4 = alert("te encuentras en el grupo adulto");
        break;
      case usermsg2 > 65 && usermsg2 <= 85:
        let edad5 = alert("te encuentras en el grupo adulto mayor");
        break;
      default:
        alert("Bienvenido");
        break;
    }
  }
*/
  // * calculo capacidad vital//
  const calculovital = (VRI, VC, VRE) => VRI + VC + VRE;
  const resultado_calculo = calculovital(23, 22, 43) + " L";
  // ? función de uso para mas adelante ; se encargara de determinar la capacidad vital o de oxigeno de un usuario y también por medio de un switch para las edades buscara cual plan de entrenamiento es mas conveniente para el usuario//

  // redo estare arreglando este codigo por completo
  /*
  // ? capturo información
  function capturar() {
    function Persona(nombre, edad, vc, grupoE) {
      this.nombre = usermsg;
      this.edad = usermsg2;
      this.vc = resultado_calculo;
      this.grupoE = agegroup; // * por arreglar
    }
    // ? guardo esa información en un objeto
    let nombrecapturar = usermsg;
    let edadcapturar = usermsg2;
    let capvitalcapturar = resultado_calculo; // cambio funcion (capacidad vital) aun no lista
    let grupoEdadcapturar = agegroup; // * por arreglar
    nuevapersona = new Persona(
      nombrecapturar,
      edadcapturar,
      capvitalcapturar,
      grupoEdadcapturar
    );
    console.log(nuevapersona);
    agregar();
  }
  //? guardo ese objeto en un array
  let Datosave = [];
  function agregar() {
    Datosave.push(nuevapersona);
    console.log(Datosave);
  }
  */
});
