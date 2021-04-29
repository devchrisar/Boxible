/* global bodymovin */
import views from '../views/404.html'
import '../css/404.css'
import lottie from 'lottie-web';
import animationData from '../source/404anim.json';
export default () => {
    const divElement = document.createElement('div');
    divElement.innerHTML = views;
  //* animacion lottie libreria//
const LottieAnim = lottie.loadAnimation({
    container: divElement.querySelector('#bodymo404'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData
});
    return divElement;
}