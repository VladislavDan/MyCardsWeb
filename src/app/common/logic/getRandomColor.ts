const colors: string[] = ['red', 'blue', 'orange', 'grey', 'green'];
let chosenColors: string[] = []

export const getRandomColor = () => {
    let color = colors[0];
    let isChosenColor = true;
    do {
        color = colors[Math.floor(Math.random() * colors.length)];
        isChosenColor = chosenColors.indexOf(color) > -1;
        if (chosenColors.length === colors.length) {
            chosenColors = [];
        }
    } while (isChosenColor)
    chosenColors.push(color);
    return color;
}