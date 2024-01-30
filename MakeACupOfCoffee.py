def make_coffee(add_milk=False, add_sugar=False):
    #Ingredients and equipment.
    coffee_powder = "Coffee powder"
    hot_water = "Hot water"
    milk = "Milk"
    sugar = "Sugar"
    cup = "Cup"
    spoon = "Spoon"

    #Add coffee powder to the cup.
    cup_contents = [coffee_powder]

    #Pour hot water into the cup.
    cup_contents.append(hot_water)

    #Add milk or sugar.
    if add_milk:
        cup_contents.append(milk)
    if add_sugar:
        cup_contents.append(sugar)

    #Stir the coffee.
    cup_contents.append(spoon)

    # Result (show the order of the procedure)
    return cup_contents

#Example
result = make_coffee(add_milk=True, add_sugar=False)
print(result)