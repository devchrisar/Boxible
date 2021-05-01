
import {Pages} from '../controllers/index'

let content = document.getElementById('root')
const router = (route) => {
    content.innerHTML = '';
    switch (route) {
        case '#/': {
            return content.appendChild(Pages.home())
        }
        case '#/Salud':{
            return content.appendChild(Pages.salud())
        }
        case '#/Entreno':{
            return content.appendChild(Pages.entreno())
        }
        case '#/Nutricion':{
            return content.appendChild(Pages.nutricion())
        }
        default:{
            return content.appendChild(Pages.notFound())
        }
    }
};
export { router };