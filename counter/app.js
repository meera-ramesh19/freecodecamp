const subtract=document.querySelector('.decrease');
const addition=document.querySelector('.increase');
const reset=document.querySelector('.reset');
const results = document.getElementById('valuez');
let counter=0;

subtract.addEventListener('click',function(){
   counter--;

   value.innerHTML= counter;
 value.style.color='red';
});
addition.addEventListener('click',function(){
  counter++;
  value.innerHTML= counter;
  value.style.color='green';
});

reset.addEventListener('click', function(){

   counter=0;
    value.innerHTML= counter;
   value.style.color='#696B6F';
});
