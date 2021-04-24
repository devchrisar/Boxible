/* global bodymovin */
//* animacion lottie libreria//
bodymovin.loadAnimation({
  container: document.getElementById('bodymo'),
  path: '../source/404anim.json',
  renderer: 'svg',
  loop: true,
  autoplay: true,
  name: 'animacion404',
});
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
    name: 'notificaciónes',
    color: '#3C9BA5',
  },
];

// target all anchor link elements
const links = document.querySelectorAll('nav a');

// function called in response to a click event on the anchor link
function handleClick(e) {
  // prevent the default behavior, but most importantly remove the class of .active from those elements with it
  e.preventDefault();
  links.forEach((link) => {
    if (link.classList.contains('active')) {
      link.classList.remove('active');
    }
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

// listen for a click event on each and every anchor link
links.forEach((link) => link.addEventListener('click', handleClick));
