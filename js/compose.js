
document.getElementById('saveButton').addEventListener('click', addSong);

var currentId = 0;

function addSong(){
    console.log("add");
    var name = document.getElementById('titleInput').value;

    let xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://va4kva7kjc.execute-api.us-east-2.amazonaws.com/items");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
        "id": "" + currentId,
        "price":0,
        "name": name
    }));

    currentId++;
    
    console.log(name);
}