var index=3;
function changeBanner(){ 
    [].forEach.call(document.images,function (v,i) { document.images[i].hidden = (i!==index && i > 2 && i < 8)});
    index = (index-2) % (5)+3;
}
window.onload = function () {setInterval(changeBanner, 1000)};