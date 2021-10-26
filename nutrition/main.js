



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
           <h3 class="card-title">${meal.recipe.label}</h3>
           <p class="cuisine"><strong>CUISINE:</strong>${meal.recipe.cuisineType}</p>
           <p class="cuisine">SOurce:${meal.recipe.source}</p>
           <p class="cuisine">Type of dish:${meal.recipe.dishType}</p>
           <p class="cuisine">Total Calories:${ meal.recipe.calories.toFixed(2)}</p>
           <p class="time">Total time:${meal.recipe.totalTime}</p>
           <p class="servings">Servings:${meal.recipe.yield}</p>
         </div>
          <div class="card-image">
            <img class="images" src="${meal.recipe.image}" alt="Avatar" style="width:100%">
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
        <a href="#" onclick="nutritionValues()">click1</a>
        <a href="${meal.recipe.url}" target="_blank" class="btn btn-primary getRecipe">Click for full recipe</a>
       </div>
   </div>
      </div>
    ` )


  //


document.querySelector('#getNutrition').addEventListener('click', nutritionValues);





}


 function nutritionValues() {
   console.log("meals")
 }

//
// <div class="entireContainer">
//  <div class="card">
//    <div class="leftContainer">
//        <div class="profile-main">
//            <h2 class="profile-name">${meal.recipe.label}</h2>
//            <p class="profile-position"><strong>Cuisine:</strong>${meal.recipe.cuisineType}</p>
//            <p class="profile-position"><strong>Type of Dish:</strong> ${meal.recipe.dishType}</p>
//            <p class="profile-position"><strong>Source:</strong>${meal.recipe.source}</p>
//            <p class="profile-position"><strong>Total Calories:</strong>${meal.recipe.calories.toFixed(2)}</p>
//            <ul class="recipe-card__nav">
//            <a href="${meal.recipe.url}" target="_blank" class="btn btn-primary getRecipe">Click for full recipe</a>
//
//        </ul>
//        </div>
//    </div>
//    <div class="rightContainer">
//      <div class="profile-sidebar">
//          <img class="profile-image" src="${meal.recipe.image}"  onerror="this.onerror=null;this.src='../images/plate.jpg';" width=70% alt="recipe image">
//
//
//       </div>
//    </div>
//    <div class"bottomContainer">
//     <h3 class="healthHeader">Health Labels:</h3>
//       <div class="recipe-card__health">
//
//           ${healthy.map(health => `<span>${health}</span>`).join(',')}
//
//        </div>
//     <h3 class="ingredientsHeader">Ingredients:</h3>
//       <div class="recipe-card__ingredients">
//
//           ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
//
//        </div>
//     </div>
//
//
//
//      </div>
