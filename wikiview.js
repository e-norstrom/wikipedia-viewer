
document.addEventListener("DOMContentLoaded", function(event) {
  //Eventlistener for keypress
  document.getElementById('textInput').addEventListener('keydown', keyPress, false);

  //Create UL to be appended later with search results
  var ul = document.createElement('ul');
  document.body.appendChild(ul);
  ul.setAttribute('id', 'theList');

  //If enter key is pressed run search();
  function keyPress(e) {
    var keyCode = e.keyCode;
    if (keyCode === 13) {
      theSearch();
    };
  };
  //If searchbutton is pressed run search();
  document.getElementById('searcher').onclick = function() {
    theSearch();
  };
  
  //Retrive text from search box, store value in 'searchTxt'
  function theSearch() {
      var searchTxt;
      (function hitMe() {
        searchTxt = document.getElementById('textInput').value;
      })();

    //Wikipedia api opensearch XMLHttprequest request
    //with 'searchTxt', and parse JSON data
    var wiki = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=' + searchTxt;
    var request = new XMLHttpRequest();
    request.open('GET', wiki, true);
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            console.log(data);

            ul.innerHTML = '';

            //Loop over data and append title, description
            //and href to each li element
            for (let i = 0; i < data[1].length; i++) {
              var uList = document.querySelector('ul');
              var li = document.createElement('li');
              var item = document.createElement('a');
              var innerItem = document.createElement('div');

              item.innerHTML = data[1][i] + '</br>';
              innerItem.innerHTML = data[2][i];
              item.setAttribute('target', '_blank');
              item.setAttribute('href', data[3][i]);
              item.setAttribute('id', 'oneItem');
              innerItem.setAttribute('href', data[3][i]);

            uList.appendChild(li);
            li.appendChild(item);
            item.appendChild(innerItem);
          };
        };
      };
    request.send();
  };
});
