var index=1;
function changeBanner(){ 
    [].forEach.call(document.images,function (v,i) { document.images[i].hidden = (i!==index && i > 0 && i < 9)});
    index = (index) % (document.images.length-1)+1;
}
window.onload = function () {setInterval(changeBanner, 1000)};