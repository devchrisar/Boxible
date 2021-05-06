import views from '../views/salud.html'
import '../css/salud.css'

export default () =>{
    const divElement = document.createElement('div');
    divElement.innerHTML = views;
    
//* cronometro solo se puede pausar iniciar y restablecer*/
  let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  let timerRef = divElement.querySelector(".valor_relog");
  let int = null;

  divElement.querySelector("#iniciarReg").addEventListener("click", () => {
    if (int !== null) {
      clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
  });

  divElement.querySelector("#pausarReg").addEventListener("click", () => {
    clearInterval(int);
  });

  divElement.querySelector("#restaReg").addEventListener("click", () => {
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timerRef.innerHTML = "00 : 00 : 00 : 000 ";
  });

  function displayTimer() {
    milliseconds += 10;
    if (milliseconds == 1000) {
      milliseconds = 0;
      seconds++;
      if (seconds == 60) {
        seconds = 0;
        minutes++;
        if (minutes == 60) {
          minutes = 0;
          hours++;
        }
      }
    }
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms =
      milliseconds < 10
        ? "00" + milliseconds
        : milliseconds < 100
        ? "0" + milliseconds
        : milliseconds;

    timerRef.innerHTML = ` ${h} : ${m} : ${s} : ${ms}`;
  }
  //* calculadora para determinar por medio de la altura y peso el estado del usuario*/
  oninput = calcularIMC;
  function calcularIMC() {
     let imc;
     let resultado = divElement.querySelector("#resultado");

  let Peso = parseInt(divElement.querySelector("#peso").value);
     divElement.querySelector("#peso-val").textContent = Peso + " kg";

     let Altura = parseInt(divElement.querySelector("#altura").value);
     divElement.querySelector("#altura-val").textContent = Altura + " cm";

     imc = (Peso / Math.pow(Altura / 100, 2)).toFixed(1);
     resultado.textContent = imc;

     let categoria = divElement.querySelector("#categoria")
  if (imc < 18.5) {
       categoria = "Peso bajo";
       resultado.style.color = "#ffc44d";
     } else if (imc >= 18.5 && imc <= 24.9) {
       categoria = "Saludable";
       resultado.style.color = "#0be881";
     } else if (imc >= 25 && imc <= 29.9) {
       categoria = "Sobrepeso";
       resultado.style.color = "#ff884d";
     } else {
       categoria = "Obesidad";
       resultado.style.color = "#ff5e57";
     }
     divElement.querySelector("#categoria").textContent = categoria;
   }

    //! Ojo el presente código no es de mi propiedad pero me gusto mucho asi que decidí usarlo para el proyecto
    divElement.querySelector('#calorie-form').addEventListener('submit', function(e){
        divElement.querySelector('#results').style.display = 'none';
        divElement.querySelector('#loading').style.display = 'block';
        setTimeout(calculateCalories, 2000);
        e.preventDefault();
    });
        function calculateCalories(e) {
        
        const age = divElement.querySelector('#age');
        const gender = divElement.querySelector('input[name="customRadioInline1"]:checked');
        const weight = divElement.querySelector('#weight');
        const height = divElement.querySelector('#height');
        const activity = divElement.querySelector('#list').value;
        const totalCalories = divElement.querySelector('#total-calories');
        
        
        if (age.value === '' || weight.value === '' || height.value === '' || 80 < age.value || age.value < 15) {
            errorMessage('Por Favor asegurate que los valores ingresados son correctos!!')
        } else if(gender.id === 'male' && activity === "1") {
          totalCalories.value = 1.2 * (66.5 + (13.75 * parseFloat(weight.value)) + (5.003 * parseFloat(height.value)) - (6.755 * parseFloat(age.value)));
        } else if(gender.id === 'male' && activity === "2") {
          totalCalories.value = 1.375 * (66.5 + (13.75 * parseFloat(weight.value)) + (5.003 * parseFloat(height.value)) - (6.755 * parseFloat(age.value)));
        } else if (gender.id === 'male' && activity === "3") {
          totalCalories.value = 1.55 * (66.5 + (13.75 * parseFloat(weight.value)) + (5.003 * parseFloat(height.value)) - (6.755 * parseFloat(age.value)));
        } else if(gender.id === 'male' && activity === "4") {
          totalCalories.value = 1.725 * (66.5 + (13.75 * parseFloat(weight.value)) + (5.003 * parseFloat(height.value)) - (6.755 * parseFloat(age.value)));
        } else if(gender.id === 'male' && activity === "5") {
          totalCalories.value = 1.9 * (66.5 + (13.75 * parseFloat(weight.value)) + (5.003 * parseFloat(height.value)) - (6.755 * parseFloat(age.value)))
            ;
        } else if(gender.id === 'female' && activity === "1") {
          totalCalories.value = 1.2 * (655 + (9.563 * parseFloat(weight.value)) + (1.850 * parseFloat(height.value)) - (4.676 * parseFloat(age.value)));
        } else if(gender.id === 'female' && activity === "2") {
          totalCalories.value = 1.375 * (655 + (9.563 * parseFloat(weight.value)) + (1.850 * parseFloat(height.value)) - (4.676 * parseFloat(age.value)));
        } else if(gender.id === 'female' && activity === "3") {
          totalCalories.value = 1.55 * (655 + (9.563 * parseFloat(weight.value)) + (1.850 * parseFloat(height.value)) - (4.676 * parseFloat(age.value)));
        } else if(gender.id === 'female' && activity === "4") {
          totalCalories.value = 1.725* (655 + (9.563 * parseFloat(weight.value)) + (1.850 * parseFloat(height.value)) - (4.676 * parseFloat(age.value)));
        } else {
          totalCalories.value = 1.9 * (655 + (9.563 * parseFloat(weight.value)) + (1.850 * parseFloat(height)) - (4.676 * parseFloat(age.value)));
        } 
        divElement.querySelector('#results').style.display = 'block';
        divElement.querySelector('#loading').style.display = 'none';
    }
        function errorMessage(error) {
        divElement.querySelector('#results').style.display = 'none';
        divElement.querySelector('#loading').style.display = 'none';
        const errorDiv = document.createElement('div');
        const card = divElement.querySelector('.card');
        const heading = divElement.querySelector('.heading');
        errorDiv.className = 'alert alert-danger';
        errorDiv.appendChild(document.createTextNode(error));
        card.insertBefore(errorDiv, heading);
        setTimeout(clearError, 4000);
    } 
        function clearError() {
        divElement.querySelector('.alert').remove();
    }

    return divElement
}
