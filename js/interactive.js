import { Soundfont } from "https://unpkg.com/smplr/dist/index.mjs";
import { SplendidGrandPiano } from "https://unpkg.com/smplr/dist/index.mjs";

window.onload = populateInteractiveGrid;
const context = new (window.AudioContext || window.webkitAudioContext)();
const piano = new SplendidGrandPiano(context);

const NOTE_NAMES = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5'];

function populateInteractiveGrid() {
    for(var i = 1; i <= 16; i++){
        document.querySelector('.interactiveContainer').innerHTML += `
        <div class="noteColumn" id="note-${i}">
            <button class="noteButton" id="G5-${i}">G5</button>
            <button class="noteButton" id="F5-${i}">F5</button>
            <button class="noteButton" id="E5-${i}">E5</button>
            <button class="noteButton" id="D5-${i}">D5</button>
            <button class="noteButton" id="C5-${i}">C5</button>
            <button class="noteButton" id="B4-${i}">B4</button>
            <button class="noteButton" id="A4-${i}">A4</button>
            <button class="noteButton" id="G4-${i}">G4</button>
            <button class="noteButton" id="F4-${i}">F4</button>
            <button class="noteButton" id="E4-${i}">E4</button>
            <button class="noteButton" id="D4-${i}">D4</button>
            <button class="noteButton" id="C4-${i}">C4</button>
            <p class="noteLabel"> </p>
      </div>
        `;
    }
}

document.querySelector('.interactiveContainer').addEventListener('click', function (e){
    var selectedButton = '';
    var selectedCol = '';
    if(e.target.tagName === 'BUTTON'){
        piano.start({ note: e.target.id.substring(0,2)})
        selectedButton = e.target.id.substring(0,2);
        selectedCol = e.target.id.substring(3);
        e.target.style.backgroundColor = 'green';
        for(var i = 0; i < 12; i++){
            var button = document.querySelector(`#${NOTE_NAMES[i]}-${selectedCol}`);
            if(!(button === e.target)){
                button.style.backgroundColor = 'lightgrey';
            }
        }
    }
});