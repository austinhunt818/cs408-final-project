import { populateList, playSong } from "../js/view.js";

QUnit.module("view", {
//   beforeEach: function () {
// //     document.getElementById('test-html').innerHTML = `
// //       <div id="searchView">
// //         <ul></ul>
// //       </div>
// //       <input id="search" type="text">
// //     `;
//   },
});

QUnit.test("populateList populates the list correctly", function (assert) {
  const listData = [
    {
      name: "Song A",
      songEncoding: "S12345",
      tempo: 120,
      id: "1",
    },
    {
      name: "Song B",
      songEncoding: "S54321",
      tempo: 100,
      id: "2",
    },
  ];
  
  const ul = populateList(listData);

  assert.strictEqual(
    ul.children.length,
    2,
    "The list should have two items after populateList."
  );

  assert.strictEqual(
    ul.children[0].querySelector(".searchItem > p").textContent,
    "Song A",
    "First item should be 'Song A'."
  );

  assert.strictEqual(
    ul.children[1].querySelector(".songOptions > a").href.substring(ul.children[1].querySelector(".songOptions > a").href.length-17),
    "compose.html?id=2",
    "Second item should link to 'compose.html?id=2'."
  );
});