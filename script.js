function firstcap(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function modal(text)
{
        
        var div = document.createElement("div");
        div.setAttribute("class","matlab");
        div.setAttribute("id","mymatlab");
        //content
        var content = document.createElement("div");
        content.className = "matlab-content";
        //close btn
        var close = document.createElement("button");
        close.setAttribute("id","band_kar");
        close.setAttribute("class","band_button");
        close.innerHTML = "Close";
        //body
        var bdy = document.createElement("div");
        bdy.setAttribute("class","matlab-body");
        bdy.innerHTML = "<h2>Meaning of " + text +" : </h2>"
        //footer
        var ft = document.createElement("div");
        ft.setAttribute("class","matlab-footer");
        var url = "https://dictionaryapi.dev/";
        ft.innerHTML = '<h3>Dictioary powered by <a href="'+url+'" target ="_blank">Dictionaryapi.dev</a>.</h3>';
        //linking
        content.appendChild(bdy);
        ft.appendChild(close);
        content.appendChild(ft);
        div.appendChild(content);
        document.body.appendChild(div);
        document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


function hatao()
{
    var rem = document.getElementsByClassName("matlab")[0];
    rem.remove();
}


async function scrap(text)
{
  const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"+text;
  var bdy = document.createElement("div");
  const res = await fetch(url);
  if(res.status==200)
  {
    const d = await res.json();
    var data = d[0].meanings;
    for(i in data)
    {
      var frag = data[i];
      var speech = frag.partOfSpeech;
      var defarray = frag.definitions;
      var part = document.createElement("div");
      part.innerHTML = "<h3><li><u>Part Of Speech: " + firstcap(speech) + "</u></li></h3> <br> <b>Meanings:-</b> <br>";
      var list = document.createElement("ul");
      for(j in defarray)
      {
        var m = "<li>" + defarray[j].definition + "<br>";
        if("example" in defarray[j])
        {
          var e =  "  <i>example: " + defarray[j].example + ".</i></li><br>";
          m = m+e;
        }
        else
        m+="</li>"
        list.innerHTML += m;
      }
      part.appendChild(list);
      bdy.appendChild(part);
    }
  }
  else
  bdy.innerHTML = "</h3>No meaning exist or <b>"+text+"</b> is Name or Number or Constant.</h3>";
  var modalbody = document.getElementsByClassName("matlab-body")[0];
  modalbody.appendChild(bdy);

}


function doc_keyUp(e) {

    // this would test for whichever key is 40 and the ctrl key at the same time
    if (e.ctrlKey && e.keyCode == 81) {
        var text = window.getSelection();
        var word = String(text);
        word = firstcap(word);
        var posx = window.pageXOffset || document.documentElement.scrollLeft;
        var posy = window.pageYOffset || document.documentElement.scrollTop;
        modal(word);
        var box = document.getElementById("mymatlab");
        var close = document.getElementById("band_kar");
        box.style.display = "block";
        close.onclick = function()
        {

                box.style.display = "none";
                hatao()
                document.documentElement.scrollTop = document.body.scrollTop = posy;
                document.documentElement.scrollLeft = document.body.scrollLeft = posx;
        }
        if(word.length > 0)
        {
            scrap(word);
        }
        else
        alert('Please select valid word.');
        
    }
}

document.addEventListener('keyup', doc_keyUp, false);
