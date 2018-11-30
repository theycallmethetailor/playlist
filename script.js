document.addEventListener("DOMContentLoaded", function() {

  fetch("https://lit-fortress-6467.herokuapp.com/object")
  .then(function (response) {
    // console.log(response);
    return response.json();
  })
  .then(function (data) {
    var albmumContainer = document.querySelector('.albumn-cover-container');
    var albmumContainerChildren = albmumContainer
    for( let i = 0; i < 3; i++) {

      let albumCover = document.createElement('img');
      var imageSource = `images/${data.results[Math.floor(Math.random()*data.results.length)].cover_art}`;
      albumCover.src = imageSource;
      albmumContainer.appendChild(albumCover);
    }
    console.log(document.querySelectorAll('.albumn-cover-container > img').src);
    //need to set up a function to make sure we don't get two of the same album cover each time ....

  })


}) //CLOSING TO DOMCONENT LOAD EVENT LISTENER FUNCTION
