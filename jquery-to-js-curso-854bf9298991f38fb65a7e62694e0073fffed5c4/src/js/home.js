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
  const actionList = await getData('https://yts.mx/api/v2/list_movies.json?genre=action');
  const terrorList = await getData('https://yts.mx/api/v2/list_movies.json?genre=horror');
  const animationList = await getData('https://yts.mx/api/v2/list_movies.json?genre=animation');

  function videoItemTemplate(movie){
    return (
          `<div class="primaryPlaylistItem">
          <div class="primaryPlaylistItem-image">
            <img src="${movie.medium_cover_image}">
          </div>
          <h4 class="primaryPlaylistItem-title">
            ${movie.title}
          </h4>
        </div>`
    )
  }

  // console.log(videoItemTemplate('src/images/covers/bitcoin.jpg', 'Bitcoin'));
  // debugger
    const $actionContainer = document.querySelector('#action');
  actionList.data.movies.forEach((movie)=>{
    // debugger
    const HTMLString = videoItemTemplate(movie);
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    debugger
    $actionContainer.append(html.body.children[0]);
    console.log(HTMLString);
  })

  console.log('actionList', actionList);
  console.log('terrorList', terrorList);
  console.log('animationList', animationList);

  // let terrorList; 
  // getData ('https://yts.mx/api/v2/list_movies.json?genre=horror')
  // .then(function(data){
  //   console.log('terrorList', data);
  // })


  const $dramaContainer = document.getElementById('drama');
  const $animationContainer = document.getElementById('animation'); 

  
  const $featuringContainer = document.getElementById('animation'); 
  const $form = document.getElementById('form'); 
  const $home = document.getElementById('home'); 


  // const $home = $('.home .list #item');
  const $modal = document.getElementById('modal');
  const $overlay = document.getElementById('overlay');
  const $hideModal = document.getElementById('hide-modal');

  const modalImage = $modal.querySelector('img');
  const modalTitle = $modal.querySelector('h1');
  const modalDescription = $modal.querySelector('p');
 

})()