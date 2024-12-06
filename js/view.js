/**
 * This file handles displaying and searching all the data from the database. Users can search the songs
 * and play them, as well as viewing them on the compose page to edit them.
 * @author Austin Hunt
 */

import { SplendidGrandPiano } from "https://unpkg.com/smplr/dist/index.mjs";

window.onLoad = loaded;

const context = new (window.AudioContext || window.webkitAudioContext)();
const piano = new SplendidGrandPiano(context);
var xhrResponse = [];

/**
 * Loads in the data from the database and calls necessary functions to display it
 */
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

/**
 * Populates the list view with the given json data
 * @param {*} listData the json data to populate the list with
 * @returns a copy of the ul after populating
 */
export function populateList(listData){
    var ul = document.getElementById("searchView").children[0];
    ul.innerHTML = '';
    for(var i=0;i<listData.length;i++){
        ul.innerHTML += `<li>
          <div class="searchItem">
              <p>${listData[i].name}</p>
              <p>${listData[i].songEncoding.substring(1,listData[i].songEncoding.length-1)}</p>
              <div class='songOptions'>
                <button><img class="songButton" id="${listData[i].songEncoding}-${listData[i].tempo}" src="img/play.png" alt="play button"></button>
                <a href='compose.html?id=${listData[i].id}'><img class="songButton" src="img/edit.png" alt="edit button"></a>
              </div>
          </div>
        </li>`;
       
    }
    return ul;
    
}

//Calls play song for the list items
document.getElementById("searchView").addEventListener('click', function(e){
    console.log(e.target.id);
    if(e.target.tagName=='IMG'){
        playSong(e.target.id);
    }
});


/**
 * Plays a song from the given song encoding data
 * @param {*} songEncoding the song data encoded into a string
 */
export function playSong(songEncoding){
    var selectedNotes = ['-', '-', '-', '-', '-', '-', '-', '-', '-' ,'-', '-', '-', '-' ,'-', '-', '-'];
    var tempoFactor = 3;
    if(songEncoding.charAt(0) == 'S'){
        var encodeIndex = 1;
        selectedNotes.forEach((note, i)=>{
            if(songEncoding.charAt(encodeIndex) == '-') encodeIndex++;
            else{
                selectedNotes[i] = songEncoding.substring(encodeIndex,encodeIndex+2);
                encodeIndex+=2;
            }
        })
        tempoFactor = songEncoding.substring(encodeIndex+2);
    }
    const now = context.currentTime;
    selectedNotes.forEach((note, i) => {
        piano.start({ note, time: now + i/tempoFactor, duration: 0.5 });
    });
}



/**
 * This chunk implements the search functionality. It displays the data from the xhrResponse that matches the search query
 */
var search = document.getElementById("search");
search.addEventListener('input', function (e){
    var query = search.value;
    console.log(query);
    if(query == ''){
        document.getElementById('searchView').children[0].innerHTML = '';
        populateList(xhrResponse);
        return;
    }
    var newUl = [];
    xhrResponse.forEach((item, i)=>{
        if(item.name.includes(query)) newUl.push(item);
    });
    populateList(newUl);
});