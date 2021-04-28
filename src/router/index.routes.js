
import {Pages} from '../controllers/index'

let content = document.getElementById('root')
const enlaces = document.getElementById('movePage a')
const router = (route) => {
    content.innerHTML = '';
    switch (route) {
        case '#/': {
            return content.appendChild(Pages.home())
        }
        case '#/Salud':{
            return console.log('salud')
        }
        case '#/Entreno':{
            return content.appendChild(Pages.entreno())
        }
        case '#/Nutricion':{
            //return content.appendChild(nutricion.entreno())
        }
        default:{
            return console.log('404')
        }
    }
};
export { router };