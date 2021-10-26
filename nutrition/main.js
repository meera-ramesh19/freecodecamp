



function submitForm(ev) {
form = document.querySelector('form')

form.addEventListener('submit', function(e) {
    e.preventDefault();
    inpValue = e.target.querySelector("input").value
    let selectInputs = document.querySelectorAll("select");
    let res = [];
    selectInputs.forEach((input) => {
        res.push(input.value);
      });
    getRecipe(inpValue,res);
})
}


function clearField() {
  document.querySelector("input").value = ""
    // changeInput(input, 'placeholder', 'Type a food or a meal...')
    // document.querySelector('#meal-type').selectedindex=null;
      // document.querySelector('#meal-type').value="";
}

function changeInput(input, prop, value) {
  input[prop] = value
}




async function getRecipe(inpVal,res) {
    document.querySelector("#showRecipe").innerHTML = ""
  // try {
  //   const userChoice = document.querySelector("#searchTerm").value
  //   const url = `https://api.edamam.com/search?q=${userChoice}&app_id=%efe3aba1%`
  app_id = '41c4b815';
  app_key = 'd550506821dc3eab02ba5bc7fe0cfaad	';
  try{
  url = `https://api.edamam.com/search?q=${inpVal}&app_id=${app_id}&app_key=${app_key}&mealType=${res[0]}`;
    const foodItem = await fetch(url)
    const foodItemData = await foodItem.json()
    console.log(foodItemData)

    for(let j = 0; j < foodItemData.hits.length; j++){
      createIngredients(foodItemData.hits[j])
    }

    clearField()
  } catch (err) {
    console.log(err)
  }
}

const createIngredients = (meal) => {
  // console.log(meal)
  const ingredients = []
  const healthy = []
  for (let i = 0; i <= 20; i++) {
    if (meal.recipe.ingredientLines[`${i}`]) {
      ingredients.push(meal.recipe.ingredientLines[`${i}`])

    } else {
         break
      }
  }


  for (let h = 0; h <= 35; h++) {
    if (meal.recipe.healthLabels[`${h}`]) {
    healthy.push(meal.recipe.healthLabels[`${h}`])

    } else {
         break
      }
  }


  showRecipe(meal,healthy,ingredients)
}

function showRecipe(meals,healthy,ingredients){

  document.querySelector("#showRecipe").insertAdjacentHTML("beforeend",`
   <div class="card-container">
     <div class="card-wrapper">
      <div class="card-details">
        <div class="card-info">
           <h3 class="card-title">${meals.recipe.label}</h3>
           <p class="cuisine"><strong>CUISINE:</strong>${meals.recipe.cuisineType}</p>
           <p class="cuisine">SOurce:${meals.recipe.source}</p>
           <p class="cuisine">Type of dish:${meals.recipe.dishType}</p>
           <p class="cuisine">Total Calories:${ meals.recipe.calories.toFixed(2)}</p>
           <p class="time">Total time:${meals.recipe.totalTime}</p>
           <p class="servings">Servings:${meals.recipe.yield}</p>
         </div>
          <div class="card-image">
            <img class="images" src="${meals.recipe.image}" alt="Avatar" style="width:100%">
          </div>
        </div>

        <div class="container">
          <span class="health">Health Labels:</span>
         ${healthy.map(hLabel => `<span> ${hLabel} </span>`).join(',')}
       </div>
        <div class="ingredients">
          <h4><b>Ingredients</b></h4>
         <div class="card-ingredients">

           ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
         </div>
        </div>
        <div class="recipe-card__nav">
          <a href="#" class="btn btn-primary" id="${meals.recipe.label}">Nutrition Info</a>
        <a href="${meals.recipe.url}" target="_blank" class="btn btn-primary getRecipe">Click for full recipe</a>
       </div>
   </div>
      </div>
    ` )






        document.getElementById(meals.recipe.label).addEventListener('click', function() {
           console.log(meals.recipe.label, ingredients)
           nutritionalLabels(meals.recipe.label, ingredients);

        });


        }




        async function nutritionalLabels(label, ingrList) {
          console.log(label,ingrList);
          document.querySelector('#showNutrition').innerHTML='';


         try{
                 const nutritionItem=await fetch("https://api.edamam.com/api/nutrition-details/?",
          {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "app_id":"3fbb56a0",
               "app_key":"7c1f1da42c85743aabd55887e22ca4aa",
             },
            body:{  "title":`${label}`,
              "ingr":[`${ingrList}`],
          }

          });
                 // const nutritionItem = await fetch(url2)
                 console.log(nutritionItem);
                 const nutritionItemData = await nutritionItem.json()
                 console.log(nutritionItemData);
           }catch(err){
             console.log('err2',err);
           };
         }
