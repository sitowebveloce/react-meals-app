import React from 'react'
import axios from 'axios';
import './Meal.css';
import Card from './Card';
import Form from './Form';
import Wrap from './Wrap';
import Snack from './Snack';


export default function Meal() {
    //*** STATE */
    const [meal, setMeal] = React.useState('');
    const [meals, setMeals] = React.useState([]);
    const [msg, setMsg] = React.useState('');
    const [open, setOpen] = React.useState(false);

    let emptyMeal = [{
        idMeal: "0000",
        strMeal: "Not Found",
        strCategory: "?",
        strArea: "Nowhere",
        strInstructions: "No food ????????????????????????????????????????????",
        strMealThumb: "/404.jpg",
        strTags: "Soup",
        strYoutube: "https://www.youtube.com",
        strIngredient1: "?",
        strIngredient2: "?",
        strIngredient3: "?",
        strIngredient4: "?",
        strIngredient5: " ",
        strIngredient6: " ",
        strIngredient7: " ",
        strIngredient8: " ",
        strIngredient9: " ",
        strIngredient10: " ",
        strIngredient11: " ",
        strIngredient12: " ",
        strIngredient13: " ",
        strIngredient14: " ",
        strIngredient15: " ",
        strIngredient16: " ",
        strIngredient17: " ",
        strIngredient18: " ",
        strIngredient19: " ",
        strIngredient20: " ",
        strMeasure1: " ",
        strMeasure2: " ",
        strMeasure3: " ",
        strMeasure4: " ",
        strMeasure5: " ",
        strMeasure6: " ",
        strMeasure7: " ",
        strMeasure8: " ",
        strMeasure9: " ",
        strMeasure10: " ",
        strMeasure11: " ",
        strMeasure12: " ",
        strMeasure13: " ",
        strMeasure14: " ",
        strMeasure15: " ",
        strMeasure16: " ",
        strMeasure17: " ",
        strMeasure18: " ",
        strMeasure19: " ",
        strMeasure20: " "
    }]


    //*** RANDOM MEAL */
    let randomMeals = async () => {
        let url = `https://www.themealdb.com/api/json/v1/1/random.php`;
        try {
            let fetch = await axios.get(url);
            let res = fetch.data.meals;
            console.log(res);
            if (res == null) {
                setMsg((`Not Found.`).toUpperCase());
                setOpen(true);
                setMeals(emptyMeal)
            }

            if (res) {
                setMsg((`${res[0].strMeal} Found.`).toUpperCase());
                setOpen(true);
                setMeals(res);
            }

        }
        catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    }

    //*** FUNCTION FETCH MEALS */
    let fetchMeals = async (meal) => {
        let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;
        try {
            let fetch = await axios.get(url);
            let res = fetch.data.meals;

            if (res == null) {
                setMsg(` Not Found.`);
                setOpen(true);
                setMeals(emptyMeal)
            }

            if (res) {
                setMsg((`${res[0].strMeal} Found.`).toUpperCase());
                setOpen(true);
                setMeals(res);
            }

        }
        catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    }

    //*** Loop through and create Card */
    let mealsDOM = meals.map(m => (

        <span key={m.idMeal}>
            <Wrap>
                <Card meal={m} />

            </Wrap>

        </span>

    ));

    //*** USEEFFECT */
    React.useEffect(() => {
        fetchMeals(meal)
    }, []);

    //*** FIND RANDOM */
    let handleRandom = () => {
        randomMeals();
    };

    //*** RETURN */
    return (
        <div className='meal'>


            <h1 className='mealTitle'>   <span role='img' aria-label="meal">😋</span> Delicious Meal</h1>
            <div className='mealInfo'><small>from <a href="https://www.themealdb.com/api.php" target='blank'>the meal db</a></small></div>

            <div><a href="/catalog"><span className='home-link' role='img' aria-label='home'>🏠</span></a></div>

            <Form fetch={fetchMeals} />

            <div className='random-link' onClick={handleRandom}><span role='img' aria-label='random'>🔀</span></div>

            <Snack setOpen={setOpen} open={open} msg={msg} />

            <div className='mealCard'>
                {mealsDOM}
            </div>



        </div>
    )
}
