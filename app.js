let mealList=document.getElementById('meal');
function getMealList(){
    const inputValue=document.getElementById('inputValue').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
    .then(res=> res.json())
    .then(data=> {
         let html="";
         if(data.meals){
             data.meals.forEach(meal => {
                 html+=`
                     <div onclick="displayRecipeItems(${meal.idMeal})" class="col-md-3 ">
                      <div class="mealItem"  >
                          <div class="mealImg">
                              <img class="img-fluid" src="${meal.strMealThumb}" alt="burger"  >
                          </div>
                          <div class="mealName">
                              <h5>${meal.strMeal}</h5>
                          </div>
                      </div>
                     </div>
                 `;
             });
             mealList.classList.remove('notFound');
         }else{
             html="Sorry!The item is not found";
             mealList.classList.add('notFound');
         }
         mealList.innerHTML=html;
    });
}
function displayRecipeItems(event){
    const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${event}`
    fetch(url)
    .then(res=> res.json())
    .then(data=> {
         let displayInfo=`
         <div class="card  " id="mealDetails" style="width: 18rem;">
         <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="...">
         <div class="card-body">
           <h5 class="card-title">${data.meals[0].strMeal}</h5>
           <p>Ingredients</p>
            <ul>
                <li>${data.meals[0].strIngredient1}</li>
                <li>${data.meals[0].strIngredient2}</li>
                <li>${data.meals[0].strIngredient3}</li>
                <li>${data.meals[0].strIngredient4}</li>
                <li>${data.meals[0].strIngredient5}</li>
                <li>${data.meals[0].strIngredient6}</li>
            </ul>
         </div>
       </div>
        `
         document.getElementById('mealDetails').innerHTML=displayInfo;
    })
}