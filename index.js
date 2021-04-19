/* global Swal html2pdf */
(function () {
  window.onload = function () {
    $('#Encarga').delay(300).fadeOut();
    $('#body-pd').removeClass('hidden_BD');
  };
  const input = document.querySelector('#itnew');
  const form = document.querySelector('#formitnew');
  const selectList = document.querySelector('#slist');
  const listsContainer = document.querySelector('#lists');
  //* funcion boton
  // ? funcion para crear botones
  function myonclickFn(link) {
    document.location.href = `${link}`;
  }
  document.getElementById('return_btn').onclick = function () {
    myonclickFn('../app.html');
  };
  //* funcion uuidv4
  // ? función de stackoverflow para generar ids ramdon
  /* toma un string ya definido y luego lo remplaza buscando las x,y a través de una función que genera un ramdon o numero aleatorio y lo multiplica por 16(hexadecimal) luego va remplazando las "x" dependiendo del valor generado aleatorio y lo agrega a una letra del abecedario regresando un string(la función no es mia la saque de stackoverflow al igual de su explicación que originalmente era en ingles */
  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      (c) => {
        const r = (Math.random() * 16) || 0;
        const v = c === 'x' ? r : (r && 0x3) || 0x8;
        return v.toString(16);
      },
    );
  }
  //* arrays
  // ? creo las variables arrays para la lista y  donde se almacenara
  const todos = [];
  const lists = [
    { id: uuidv4(), text: 'Al aire libre', count: 0 },
    { id: uuidv4(), text: 'En Casa', count: 0 },
    { id: uuidv4(), text: 'gimnasio', count: 0 },
  ];
    //* funcion renderListItem
  // ? crea el html de las listas (cuadrados morados donde aparece el nombre de la lista [gimnasio....]) y cuantos elementos tiene
  function renderListItem(list) {
    return `
            <div class="list">
                <h3>${list.text}</h3>
                ${list.count} tareas
            </div>
        `;
  }
  //* funcion renderLists
  // ? para saber las listas y cuantos elementos hay
  function renderLists() {
    lists.forEach((list) => {
      const lista = list;
      lista.count = 0;
    });
    // ? recorro cada elemento y por cada uno valido si se encuentra en la lista
    todos.forEach((todo) => {
      lists.forEach((list) => {
        /* si el contenedor del id de la lista es igual al valor y tipo de el propio id de la lista */
        if (todo.list === list.id) {
          /* entonces incrementa el contador en 1 */
          const Lista = list;
          Lista.count += 1;
        }
      });
    });
    // ?para cada lista llamo a la funcion renderListItem
    listsContainer.innerHTML = '';
    lists.forEach((list) => {
      listsContainer.innerHTML += renderListItem(list);
    });
  }
  //* Funcion renderTODO
  // ?funcion para crear el html de los entrenos*/
  function renderTodo(todo) {
    return `
            <div class="todo" data-id="${todo.id}">
                <label class="checkbox-container">${todo.text}
                    <!--//?condicional usado en react js no conozco mucho lo saque de internet la idea es que marque el nuevo checkbox como completado no el checkbox por defecto-->
                    <input type="checkbox" ${
  todo.completed ? 'checked="checked"' : ''
  } />
                    <span class="checkmark"></span>
                </label>
                <button></button>
            </div>
        `;
  }
  //* funcion renderTodos
  // ? funcion que actualiza la creacion del nuevo entreno al html
  function renderTodos() {
    /* llamo al div donde se creara el entreno */
    const todosContainer = document.querySelector('#todos');
    todosContainer.innerHTML = '';
    /* variable donde estan todos los objetos y la recorro para que por cada entreno lo agregue al html y uso la otra funcion renderTodo para crear dicho html */
    todos.forEach((todo) => {
      todosContainer.innerHTML += renderTodo(todo);
    });
    //* EVENTO DEL CHECKBOX o validar como completado o no el entreno
    // ?para agregar evento al checkbox
    document.querySelectorAll('.todo label input').forEach((item) => {
      /* evento tipo click para el check */
      item.addEventListener('click', (e) => {
        /* obtengo al padre del checkbox el cual seria el div data-id de la funcion renderTODO(crea html) */
        const id = e.target.parentNode.parentNode.getAttribute('data-id');
        /* busco la posicion del checkbox donde todo.id sea igual al id del padre */
        const index = todos.findIndex((todo) => todo.id === id);
        /* valido si esta completado o no */
        todos[index].completed = !todos[index].completed;
      });
    });
    //* funcion GETITEMANDINDEX
    // ? funcion para saber cual es el objeto a eliminar y obtener su indice o posicion
    function getItemAndIndex(arr, obj) {
      let i = 0;
      const key = Object.keys(obj); /* quito la clave del objeto */
      const value = obj[key]; /* quito el valor del objeto */
      /* recorro el array */
      for (i = 0; i < arr.length; i += 1) {
        /* si el array en la posicion i(0) tiene el valor de key(objeto y key) eso es igual a value(objeto y key) */
        if (arr[i][key] === value) {
          /* entonces retorna un objeto con el valor de index y el item sea la posicion dentro del array */
          return { index: i, item: arr[i] };
        }
      }
    }
    //* boton eliminar
    // ?para agregar evento a los botones de eliminar
    document.querySelectorAll('.todo button').forEach((item) => {
      /* evento tipo click para el boton de eliminar */
      item.addEventListener('click', (e) => {
        /* obtengo al padre del botón de eliminar el cual seria el div data-id de la funcion renderTODO(crea html) */
        const id = e.target.parentNode.getAttribute('data-id');
        /* defino la variable para usar a traves de la funcion getitemandindex y le paso como parametros el array (todos) y el id asi guardo el objeto y su indice */
        /* aunque se podria utilizar tambien (.findIndex) */
        const obj = getItemAndIndex(todos, { id });
        /* uso la propiedad splice para eliminar un elemento quitando solo 1 dependiendo su indice */
        todos.splice(obj.index, 1);

        renderLists();
        renderTodos();
      });
    });
  }
  //* funcion refreshui
  // ? funcion que permite actualizar los datos  dependiendo de los datos en las variables definidas mas arriba
  function refreshUI() {
    renderTodos();
    renderLists();
  }
  //* rrecorro lista
  // ? recorro las listas y las añado al html por medio de un inner y llamo a la funcion refreshUI
  document.addEventListener('DOMContentLoaded', (e) => {
    refreshUI();
    lists.forEach((list) => {
      selectList.innerHTML += `<option value="${list.id}">${list.text}</option>`;
    });
  });
  //* funcion TODO (objeto)
  // ? funcion para crear objetos y asignarlos a la variable "todos" de la lista
  function Todo(id, text, list, completed) {
    return {
      id, text, list, completed,
    };
  }
  //* prevenir accion form
  // ? evento para prevenir el comportamiento habitual de un formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    /* constante para validar si hay texto en el campo */
    const text = input.value.trim();
    /* constante para encontrar el id de cada lista del seleccionador(gimnasio,en casa, etc..) */
    const listId = selectList.value;

    /* validar si hay informacion si no hay se sale de la funcion y no crea el nuevo entreno */
    if (text === '') return false;
    /* si hay crea el nuevo entreno usando la funcion TODO */
    const newTodo = new Todo(uuidv4(), text, listId, false);
    /* guardo la información en el localStorage */
    localStorage.setItem('new Todo', JSON.stringify(newTodo));
    /* añado el nuevo entreno  al objeto */
    todos.push(newTodo);
    /* vacio el input */
    input.value = '';
    /* llamo a la funcion refreshUI */
    refreshUI();
  });

  //* funcion validar ENTER
  // ? funcion para validar si el evento key se ejecuta
  function validardscga(e) {
    console.log('DESCARGA VALIDADA');
    const $boton = document.querySelector('#btnCrearPdf');
    $boton.addEventListener('click', () => {
      const $elementoParaConvertir = document.querySelector('#todos'); // *<-- Aquí puedes elegir cualquier elemento del DOM
      html2pdf()
        .set({
          margin: 1,
          filename: 'Tu_entreno_extra.pdf',
          image: {
            type: 'jpeg',
            quality: 0.98,
          },
          html2canvas: {
            scale: 4, // *A mayor escala, mejores gráficos, pero más peso
            letterRendering: true,
          },
          jsPDF: {
            unit: 'in',
            format: 'a3',
            orientation: 'portrait', //* landscape o portrait
          },
        })
        .from($elementoParaConvertir)
        .save()
        .catch((err) => console.log(err))
        .finally()
        .then(() => {
          console.log('lista de entrenamiento generada!');
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: 'success',
            title: 'Se ha creado tu lista con éxito!',
          });
        });
    });
  }
  //* Generar pdf
  document.addEventListener('DOMContentLoaded', () => {
    // test aquí estoy tratando de validar si el usuario escribió algo en el input, esto lo hago por que se da el caso de que si no hay ningún valor en la lista y el usuario le da a descargar se termina descargando un pdf vació, por ahora la validación la hago a través de escuchar el botón enter , creo que esta no es la mejor solución(por que si el usuario logra encontrar una manera de enviar su información SIN presionar la tecla enter la app nunca validara y por ende no podra descargar el archivo) pero es la forma que funciono hasta ahora todas las demás formas que intente que no funcionaron de la forma que yo busco//
    //* funcion evento ENTER
    // ? busco que el usuario presione enter para enviar la informacion y que se active la opcion de descarga
    input.addEventListener('keydown', (e) => {
      const campo = document.querySelector('#itnew');
      const text = campo.value.trim();
      if (e.key === 'Enter' && !text == '') {
        validardscga(e);
      }
    });

    // *Escuchamos el click del botón de descarga
    const $boton = document.querySelector('#btnCrearPdf');
    $boton.addEventListener('click', () => {
      // ? valido que halla info en el input y cuando el usuario oprima enter si no --> no se permite la descarga
      const text = input.value.trim();
      if (text === '') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Añade información al campo primero',
        });
      } else {
        Swal.fire({
          title: 'Parece que estas teniendo problemas!',
          text:
            '!Por favor crea primero una lista de entrenamientos para poder descargar',
          icon: 'info',
          confirmButtonText: 'OK',
        });
      }
    });
  });
}());
// hecho ((script PDF (libreria utilizada html2pdf la cual es una mezcla entre html2canvas y jspdf) propiedad de parzibyte de alli lo saque yo solo lo edite ))Creado por Parzibyte (https://parzibyte.me).
