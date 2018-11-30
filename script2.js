document.addEventListener("DOMContentLoaded", function() {
  let newAlbumn
  let newAlbumnImage
  let newTrack
  const albumContaier = document.querySelector('.album-container')
  const albumnInfo = document.querySelector('.albumn-info')


  //GET REQUEST FOR ALBUMN INFO IBJECT
  fetch("https://lit-fortress-6467.herokuapp.com/object")
    .then(function(response) {
      return response.json();
    })
    .then(function(jSONalbums) {

      for (var i = 0; i < jSONalbums.results.length; i++) {
        var trackList = [];
        let artist = jSONalbums.results[i].artist
        let title = jSONalbums.results[i].title
        newAlbumn = document.createElement('div');
        newAlbumn.id = `album${jSONalbums.results[i].id}`;

        newAlbumnImage = document.createElement('img')
        newAlbumnImage.src = `images/${jSONalbums.results[i].cover_art}`;
        albumContaier.appendChild(newAlbumn);
        newAlbumn.appendChild(newAlbumnImage);

        newAlbumnImage.addEventListener("click", function(e) {
          newTrack = document.createElement('span');
          newTrack.className = "m-2 track d-block"
          newTrack.style = ""

          newTrack.textContent = `${artist}: ${title}`

          albumnInfo.appendChild(newTrack)
          trackList.push(newTrack.textContent)
          console.log(trackList);

        })
      }

      albumnInfo.addEventListener("click", function(e) {
        if (event.target.tagName.toLowerCase() === 'span') {
          clickedTrack = event.target
          parent = clickedTrack.parentElement
          parent.removeChild(clickedTrack)
          trackList.splice(trackList.indexOf(clickedTrack.textContent), 1)
        }
      })


      const clearButton = document.querySelector('#clear')

      clearButton.addEventListener("click", function(e) {
        e.preventDefault()
        albumnInfo.innerHTML = ""
        trackList = [];
      })

      // console.log(tracklist);



      const submitBin = document.querySelector('#submitBin');

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
                // .then(function(data) { console.log(data);})
            }
        }
        var url = "https://lit-fortress-6467.herokuapp.com/post";

        axios.post(url, {data: trackList})
            // .then(data => console.log('data', data))
      })

        // function (thisVariableisGoingtoBetheThingThatWeWantToMultuplyBy2) {
        //   thisVariableisGoingtoBetheThingThatWeWantToMultuplyBy2 * 2
        // }
        // var thisIsWhatWeAreMultuplyingByITself = "this is the string that we are duplicating"
        // var thisIsTheVariableThatWeAreGoingToSquare = thisIsWhatWeAreMultuplyingByITself * thisIsWhatWeAreMultuplyingByITself
        //
        // console.log(thisIsTheVariableThatWeAreGoingToSquare);

    })

}) //END OF CONTENT LOAD EVENT LISTENER FUNCTION
