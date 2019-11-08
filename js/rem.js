~function () {
   let windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
   let rem = windowWidth/7.5;
   let style = document.createElement("style");
   style.innerHTML = `html{font-size:${rem}px;!important`;
   document.head.appendChild(style);
}()