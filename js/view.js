window.onLoad = loaded;

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
    for(i=0;i<listData.length;i++){
        ul.innerHTML += `<li>
          <div class="searchItem">
              <p>` + listData[i].name + `</p>
              <img class="songInfo" src="img/placeholder.png"> <!--Placeholder for real song info-->
              <img class="songButton" src="img/play.png">
              <img class="songButton" src="img/edit.png">
          </div>
        </li>`
    }
}