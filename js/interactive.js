import { Soundfont } from "https://unpkg.com/smplr/dist/index.mjs";

const context = new (window.AudioContext || window.webkitAudioContext)();

const marimba = new Soundfont(context, { instrument: "marimba" });
document.getElementById('noteE').addEventListener('click', ()=>marimba.start({ note: 60, velocity: 80 }));