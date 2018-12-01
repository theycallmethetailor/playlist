document.addEventListener("DOMContentLoaded", function() {
  let newAlbumn;
  let newAlbumnImage;
  let newTrack;
  const albumContaier = document.querySelector('.album-container');
  const albumnInfo = document.querySelector('.albumn-info');
  const clearButton = document.querySelector('#clear');
  const submitBin = document.querySelector('#submitBin');
  const trackListParent = document.createElement("ol")
  let counter = 0;

  trackListParent.className = "track-list"
  albumnInfo.appendChild(trackListParent)


  //GET REQUEST FOR ALBUMN INFO IBJECT
  fetch("https://lit-fortress-6467.herokuapp.com/object")
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(jSONalbums) {

      //THIS LOOP ADDS THE TRACK INFO FOR EACH CLICKED ALBUMN TO THE PAGE AND PUSHES IT TO THE ARRAY LIST TO BE POSTED LATER
      for (var i = 0; i < jSONalbums.results.length; i++) {
        var trackList = [];
        let artist = jSONalbums.results[i].artist;
        let title = jSONalbums.results[i].title;
        newAlbumn = document.createElement('div');
        newAlbumn.id = `album${jSONalbums.results[i].id}`;
        newAlbumnImage = document.createElement('img');
        newAlbumnImage.src = `images/${jSONalbums.results[i].cover_art}`;
        albumContaier.appendChild(newAlbumn);
        newAlbumn.appendChild(newAlbumnImage);

        //THIS ADDS AN EVENT LISTENER TO EACH ALBUMN COVER ELEMENT THAT APPENDS THE TRACKLIST TO THE TRACKLIST DIV ON THE PAGE

        newAlbumnImage.addEventListener("click", function(e) {
          counter ++

          newTrack = document.createElement('li');
          newTrack.className = "m-2 track d-block";
          newTrack.textContent =   `${artist}: ${title}`;
          trackListParent.appendChild(newTrack);
          trackList.push(`${artist}: ${title}`);
          console.log(trackList);
        })
      }

      //THIS EVENT LISTENER REMOVES THE CLICKED ON TRACK FROM BOTH THE PAGE AND THE TRACKLIST ARRAY BEING POSTED
      albumnInfo.addEventListener("click", function(e) {
        if (event.target.tagName.toLowerCase() === 'li') {
          clickedTrack = event.target;
          parent = clickedTrack.parentElement;
          parent.removeChild(clickedTrack);
          trackList.splice(trackList.indexOf(clickedTrack.textContent), 1);
          console.log(trackList);
        }
      })

      //THIS CLEARS BOTH THE LIST ON THE PAGE AND THE TRACKLIST TO BE POSTED TO THE PAGE
      clearButton.addEventListener("click", function(e) {
        e.preventDefault();
        albumnInfo.innerHTML = "";
        trackList = [];
      })



      //THIS EVENT LISTENER CREATES A POST REQUEST FOR WHEN THE SUBMIT BIN BUTTON IS CLICKED, POSTING THE TRACKLIST ARRAY
      submitBin.addEventListener("click", function(e) {
        e.preventDefault();
        let axios = {
            get: function(url) {
                return fetch(url)
                    .then(res => res.json())
            },
            post: function(url, body) {
                return fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(body)
                })
                .then(res => res.text())
                .then(text => {
                  console.log(text, body)
                })
            }
        }
        var url = "https://lit-fortress-6467.herokuapp.com/post";
        axios.post(url, {data: trackList});
      })
    })



}) //END OF CONTENT LOAD EVENT LISTENER FUNCTION
