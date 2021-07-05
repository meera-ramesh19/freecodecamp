let colorsArr=[
  '#880808',
  '#AA4A44',
'#6E260E',
'#DC143C',
'#C78E00',
'#00C72B',
'#39C700',
'#9DC700',
'#00C78E',
'#00C78E',
'#C7C000',
'#C78E00',
'#C78E00',
'#ff0000',
'#ffff66',
'#ffcc66',
'#ff9999',
'#cc33ff',
'#9900ff',
'#339933',
'#333300',
'#6600cc'];
// window.addEventListener('load',colorChange);
 let refresh;
function colorChange(){
  // let colours = document.querySelector('.color');
  refresh = setInterval(randomRefresh,1000);
  // const stopBtn=document.querySelector('.btnColor);
  // stopBtn.addEventListener('click',stop(refersh));
  document.getElementById("stop").addEventListener("click", function() {
    stop();
  });

}
function stop(){
  clearInterval(refresh);
}
function randomRefresh(){
const randomNumber =  Math.floor(Math.random()*colorsArr.length);
 document.body.style.background=colorsArr[randomNumber];
  h3.style.color =colorsArr[randomNumber];
}

/* for each button press*/
// let colours = document.querySelector('.color');
// let btn = document.querySelector('.btnColor');
// btn.addEventListener('click',function () {
//   const randomNumber = getRandomNumber();
//   document.body.style.background=colorsArr[randomNumber];
//   colours.textContent =colorsArr[randomNumber];
// });

// function getRandomNumber(){
//   return Math.floor(Math.random()*colorsArr.length);
// }
