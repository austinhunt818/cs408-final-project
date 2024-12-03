import { SplendidGrandPiano } from "https://unpkg.com/smplr/dist/index.mjs";

window.onLoad = loaded;

const context = new (window.AudioContext || window.webkitAudioContext)();
const piano = new SplendidGrandPiano(context);

var xhrResponse = [];
function loaded() {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function () {
        xhrResponse = JSON.parse(xhr.response);
        console.log(xhrResponse);
        populateList(xhrResponse);
    });
    xhr.open("GET", "https://va4kva7kjc.execute-api.us-east-2.amazonaws.com/items");
    xhr.send();
}

function populateList(listData){
    var ul = document.getElementById("searchView").children[0];
    for(var i=0;i<listData.length;i++){
        ul.innerHTML += `<li>
          <div class="searchItem">
              <p>` + listData[i].name + `</p>
              <p>${listData[i].songEncoding.substring(1,listData[i].songEncoding.length-1)}</p>
              <button><img class="songButton" src="img/play.png"></button>
              <a href='compose.html?id=${listData[i].id}'><img class="songButton" src="img/edit.png"></a>
          </div>
        </li>`;
        document.getElementById("searchView").addEventListener('click', function(e){
            if(e.target.class=='songButton'){
                playSong(listData[i].songEncoding);
            }
        });
    }
    
}


function playSong(songEncoding){
    var selectedNotes = ['-', '-', '-', '-', '-', '-', '-', '-', '-' ,'-', '-', '-', '-' ,'-', '-', '-'];
    if(songEncoding.charAt(0) == 'S'){
        var encodeIndex = 1;
        selectedNotes.forEach((note, i)=>{
            if(songEncoding.charAt(encodeIndex) == '-') encodeIndex++;
            else{
                selectedNotes[i] = songEncoding.substring(encodeIndex,encodeIndex+2);
                encodeIndex+=2;
            }
        })
    }
    const now = context.currentTime;
    selectedNotes.forEach((note, i) => {
        piano.start({ note, time: now + i/tempoFactor, duration: 0.5 });
    });
}