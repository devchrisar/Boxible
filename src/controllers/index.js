import Home from './home.controllers'
import Entreno from './entreno.controllers'
import Nutricion from './nutricion.controllers'
import NotFound from './404.controllers'
const Pages = {
    home: Home,
    entreno: Entreno,
    nutricion: Nutricion,
    notFound: NotFound
}
export {Pages}