import json

# Load food database
with open("foods.json", "r") as file:
    foods = json.load(file)

# Ask user for food
food_name = input("Enter food name: ").lower()

# Check food
if food_name in foods:

    print("\nNutrition Info")
    print("----------------")

    print("Calories:",
          foods[food_name]["calories"],
          "kcal")

    print("Protein:",
          foods[food_name]["protein"],
          "g")

else:
    print("Food not found")