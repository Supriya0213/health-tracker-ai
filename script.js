const foodDatabase = {

    roti: {
        calories: 120,
        protein: 3
    },

    rice: {
        calories: 130,
        protein: 2.5
    },

    paneer: {
        calories: 265,
        protein: 18
    },

    egg: {
        calories: 78,
        protein: 6
    }
};



let totalCalories =
    Number(localStorage.getItem("totalCalories"))
    || 0;


let totalProtein =
    Number(localStorage.getItem("totalProtein"))
    || 0;


let calorieHistory =
    JSON.parse(localStorage.getItem("calorieHistory"))
    || [];



function calculateBMI() {

    const height =
        Number(document.getElementById("height").value);

    const weight =
        Number(document.getElementById("weight").value);

    const targetWeight =
        Number(document.getElementById("targetWeight").value);


    const bmi =
        weight / ((height / 100) ** 2);


    document.getElementById(
        "bmiResult"
    ).innerText =
        bmi.toFixed(1);


    const lose =
        weight - targetWeight;


    document.getElementById(
        "weightLoss"
    ).innerText =
        lose + " kg";


    let insight = "";


    if (bmi < 18.5) {

        insight =
            "⚠ Underweight";
    }

    else if (bmi < 25) {

        insight =
            "✅ Healthy";
    }

    else {

        insight =
            "⚠ Overweight";
    }


    insight +=
        `<br><br>
        Goal:
        Lose ${lose} kg`;


    document.getElementById(
        "healthInsights"
    ).innerHTML =
        insight;
}



function trackMeal() {

    const input =
        document
        .getElementById("mealInput")
        .value
        .toLowerCase();


    let calories = 0;

    let protein = 0;

    let foods = [];


    for (let food in foodDatabase) {

        if (input.includes(food)) {

            calories +=
                foodDatabase[food].calories;

            protein +=
                foodDatabase[food].protein;

            foods.push(food);
        }
    }


    totalCalories += calories;

    totalProtein += protein;


    calorieHistory.push(calories);


    localStorage.setItem(
        "totalCalories",
        totalCalories
    );


    localStorage.setItem(
        "totalProtein",
        totalProtein
    );


    localStorage.setItem(
        "calorieHistory",
        JSON.stringify(calorieHistory)
    );


    document.getElementById(
        "totalCalories"
    ).innerText =
        totalCalories;


    document.getElementById(
        "totalProtein"
    ).innerText =
        totalProtein + " g";


    document.getElementById(
        "mealResult"
    ).innerHTML = `

    Foods:
    ${foods.join(", ")}

    <br><br>

    Calories:
    ${calories} kcal

    <br><br>

    Protein:
    ${protein} g
    `;
}



if (document.getElementById("calorieChart")) {

    new Chart(

        document.getElementById(
            "calorieChart"
        ),

        {

            type: "line",

            data: {

                labels:
                calorieHistory.map(
                    (_, i) => "Meal " + (i + 1)
                ),

                datasets: [{

                    label: "Calories",

                    data: calorieHistory,

                    borderWidth: 3
                }]
            }
        }
    );
}
function calculateNutrition() {

    const age =
        Number(document.getElementById("age").value);

    const height =
        Number(document.getElementById("height").value);

    const weight =
        Number(document.getElementById("weight").value);

    const gender =
        document.getElementById("gender").value;

    const activity =
        Number(document.getElementById("activity").value);


    let bmr = 0;


    if (gender === "male") {

        bmr =
            10 * weight +
            6.25 * height -
            5 * age + 5;
    }

    else {

        bmr =
            10 * weight +
            6.25 * height -
            5 * age - 161;
    }


    const maintenance =
        Math.round(bmr * activity);

    const fatLoss =
        maintenance - 400;

    const protein =
        Math.round(weight * 1.8);

    const fats =
        Math.round(weight * 0.8);

    const carbs =
        Math.round(
            (fatLoss -
            (protein * 4 + fats * 9))
            / 4
        );

    const water =
        (weight * 0.035).toFixed(1);


    document.getElementById(
        "maintenance"
    ).innerText =
        maintenance + " kcal";


    document.getElementById(
        "fatLoss"
    ).innerText =
        fatLoss + " kcal";


    document.getElementById(
        "proteinNeed"
    ).innerText =
        protein + " g";


    document.getElementById(
        "carbsNeed"
    ).innerText =
        carbs + " g";


    document.getElementById(
        "fatsNeed"
    ).innerText =
        fats + " g";


    document.getElementById(
        "waterNeed"
    ).innerText =
        water + " L";


    document.getElementById(
        "nutritionInsights"
    ).innerHTML = `

    ✅ Your maintenance calories are
    <strong>${maintenance} kcal</strong>

    <br><br>

    🔥 For fat loss eat around
    <strong>${fatLoss} kcal</strong>

    <br><br>

    💪 Target at least
    <strong>${protein} g protein</strong>

    <br><br>

    💧 Drink around
    <strong>${water} liters</strong>
    of water daily.

    `;
}