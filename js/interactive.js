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
            <button class="noteButton" id="G5-${i}"></button>
            <button class="noteButton" id="F5-${i}"></button>
            <button class="noteButton" id="E5-${i}"></button>
            <button class="noteButton" id="D5-${i}"></button>
            <button class="noteButton" id="C5-${i}"></button>
            <button class="noteButton" id="B4-${i}"></button>
            <button class="noteButton" id="A4-${i}"></button>
            <button class="noteButton" id="G4-${i}"></button>
            <button class="noteButton" id="F4-${i}"></button>
            <button class="noteButton" id="E4-${i}"></button>
            <button class="noteButton" id="D4-${i}"></button>
            <button class="noteButton" id="C4-${i}"></button>
            <p class="noteLabel"> </p>
      </div>
        `;
    }
}

document.querySelector('.interactiveContainer').addEventListener('click', function (e){
    if(e.target.tagName === 'BUTTON'){
        piano.start({ note: e.target.id.substring(0,2)})
    }
});

// document.getElementById('noteG5').addEventListener('click', ()=>piano.start({ note: 'G5'}));
// document.getElementById('noteF5').addEventListener('click', ()=>piano.start({ note: 'F5'}));
// document.getElementById('noteE5').addEventListener('click', ()=>piano.start({ note: 'E5'}));
// document.getElementById('noteD5').addEventListener('click', ()=>piano.start({ note: 'D5'}));
// document.getElementById('noteC5').addEventListener('click', ()=>piano.start({ note: 'C5'}));
// document.getElementById('noteB4').addEventListener('click', ()=>piano.start({ note: 'B4'}));
// document.getElementById('noteA4').addEventListener('click', ()=>piano.start({ note: 'A4'}));
// document.getElementById('noteG4').addEventListener('click', ()=>piano.start({ note: 'G4'}));
// document.getElementById('noteF4').addEventListener('click', ()=>piano.start({ note: 'F4'}));
// document.getElementById('noteE4').addEventListener('click', ()=>piano.start({ note: 'E4'}));
// document.getElementById('noteD4').addEventListener('click', ()=>piano.start({ note: 'D4'}));
// document.getElementById('noteC4').addEventListener('click', ()=>piano.start({ note: 'C4'}));