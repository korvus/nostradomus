function ct(){
  console.log(document.getElementsByTagName('*').length);
  alert(document.getElementsByTagName('*').length);
}

//From the context-menu
self.on("click", function () {
    ct();
});

//From the shortcut
self.port.on('shortcut', function () {
    ct();
});
