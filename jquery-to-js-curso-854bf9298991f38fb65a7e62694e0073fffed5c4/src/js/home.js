console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban";

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre;
}

const getUser = new Promise(function(todoBien, todoMal){
  //llamar un API
  // setInterval
  setTimeout(function(){
  todoBien('vamos bien en 3s');
  }, 3000);
})

const getUserAll = new Promise(function(todoBien, todoMal){
  //llamar un API
  // setInterval
  setTimeout(function(){
  todoBien('vamos bien en 5s');
  }, 5000);
})

// getUser
//     .then(function(){
//       console.log("todo esta bien en la vida");
//     })
//     .catch(function(msm){
//       console.log(msm);
//     })
//Promise.race entra al then de la promesa que se resuelva primeros
Promise.all([
  getUser,
  getUserAll,
])
.then(function(msm){
  console.log(msm);
})
.catch(function(msm){
  console.log(msm);
})

$.ajax('https://swapi.co/api/people/',{
  method: 'GET',
  success: function(data){
    console.log(data);
  },
  error: function(error){
    console.log(error);
  }
})

fetch('https://swapi.co/api/people/')
    .then(function(response){
      // console.log(response);
      return response.json();
    })
    .then(function(user){
      console.log('user', user.results[0].name);
    })
    .catch(function(){
      console.log('algo fallo');
    });

(async function load(){
  //await
  //action 
  //terror
  //animations
  async function getData (url){
  const response = await fetch(url)
  const data = await response.json()
  return data;
  }

  const $form = document.getElementById('form');
  const $home = document.getElementById('home'); 
  const $featuringContainer = document.getElementById('featuring'); 


  function setAttributes($element, attributes){
    for (const attribute in attributes){
      $element.setAttribute(attribute, attributes[attribute]);
    }
  }

  const BASE_API = 'https://yts.mx/api/v2/';
  function featuringTemplate(peli){
    return(
      `
      <div class="featuring">
      <div class="featuring-image">
        <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
      </div>
      <div class="featuring-content">
        <p class="featuring-title">Pelicula encontrada</p>
        <p class="featuring-album">${peli.title}</p>
      </div>
      `
    )
  }
  $form.addEventListener('submit', async (event)=>{
    // debugger
    event.preventDefault();
    $home.classList.add('search-active');
    const $loader = document.createElement('img');
    setAttributes( $loader, {
      src: 'src/images/loader.gif',
      height : 50,
      width : 50,
    })
    $featuringContainer.append($loader);
    const data = new FormData($form);
    const {
      data: {
        movies: pelis
      }
    } = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`);
    const HTMLString = featuringTemplate(pelis[0]);
    $featuringContainer.innerHTML = HTMLString;
    
})

  const actionList = await getData(`${BASE_API}list_movies.json?genre=action`);
  const terrorList = await getData(`${BASE_API}list_movies.json?genre=horror`);
  const animationList = await getData(`${BASE_API}list_movies.json?genre=animation`);

  function videoItemTemplate(movie, category){
    return (
      `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category= "${category}" >
          <div class="primaryPlaylistItem-image">
            <img src="${movie.medium_cover_image}">
          </div>
          <h4 class="primaryPlaylistItem-title">
            ${movie.title}
          </h4>
        </div>`
    )
  }
  function createTemplate(HTMLString){
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
  }
  function addEventClick ($element){
    $element.addEventListener('click', () => {
      // alert('click');
      showModal($element);
    })
  }
  function renderMovieList(List, $container, category){
    // actionList.data.movies
    $container.children[0].remove();
    List.forEach((movie)=>{
      const HTMLString = videoItemTemplate(movie, category);
      const movieElement = createTemplate(HTMLString);
      $container.append(movieElement);
      addEventClick(movieElement);
    })
  }
  
  const $actionContainer = document.querySelector('#action');
  renderMovieList(actionList.data.movies, $actionContainer, 'action');

  const $dramaContainer = document.getElementById('drama');
  renderMovieList(terrorList.data.movies, $dramaContainer, 'drama' );

  const $animationContainer = document.getElementById('animation'); 
  renderMovieList(animationList.data.movies, $animationContainer, 'animation' );


  // const $home = $('.home .list #item');
  const $modal = document.getElementById('modal');
  const $overlay = document.getElementById('overlay');
  const $hideModal = document.getElementById('hide-modal');

  const modalImage = $modal.querySelector('img');
  const modalTitle = $modal.querySelector('h1');
  const modalDescription = $modal.querySelector('p');
  

  function showModal($element){

    $overlay.classList.add('active');
    $modal.style.animation = 'modalIn .8s forwards';
  }

  $hideModal.addEventListener('click', hideModal);
  function hideModal() {
    $overlay.classList.remove('active');
    $modal.style.animation = 'modalOut .8s forwards';
  }
})()