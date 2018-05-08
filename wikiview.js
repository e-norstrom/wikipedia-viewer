
document.addEventListener("DOMContentLoaded", function() {

  //Eventlistener for keypress
  document.getElementById('textInput').addEventListener('keydown', keyPress, false);

  //Create UL to be appended later with search results
  let ul = document.createElement('ul');
  document.body.appendChild(ul);

  //If enter key is pressed run search();
  function keyPress(e) {
    if (e.keyCode === 13) {
      search();
    };
  };

  //If searchbutton is pressed run search();
  document.getElementById('searcher').onclick = function() {
    search();
  };

  //Wikipedia api opensearch XMLHttprequest request
  //with 'searchTxt', and parse JSON data
  function search() {
    let searchTxt = document.getElementById('textInput').value;
    let wiki = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=' + searchTxt;
    let request = new XMLHttpRequest();

    request.open('GET', wiki, true);
    if (searchTxt) {
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          let data = JSON.parse(request.responseText);
          console.log(data);
          ul.innerHTML = '';

          //Loop over data and append title, description
          //and href to each li element
          for (let i = 0; i < data[1].length; i++) {
            let li = document.createElement('li');
            let title = document.createElement('a');
            let description = document.createElement('div');

            title.innerHTML = data[1][i] + '</br>';
            description.innerHTML = data[2][i];
            title.setAttribute('target', '_blank');
            title.setAttribute('href', data[3][i]);

            ul.appendChild(li);
            li.appendChild(title);
            title.appendChild(description);
          };
        };
      };
    };
    request.send();
  };
});
