// Récupérer 2 inputs de type range
const fromSlider = document.getElementById('fromSlider');
const toSlider = document.getElementById('toSlider');
// Récupérer les 2 span qui affichent les valeurs
const fromValue = document.getElementById('fromValue');
const toValue = document.getElementById('toValue');

// Si les valeurs des inputs changent
fromSlider.oninput = function() {
    putGoodValues();
    // Afficher la valeur de l'input dans le span
    fromValue.innerHTML = fromSlider.value;
    toValue.innerHTML = toSlider.value;
}
toSlider.oninput = function() {
    putGoodValues();
    toValue.innerHTML = toSlider.value;
    fromValue.innerHTML = fromSlider.value;
}

// Si un des sliders est déplacé
function putGoodValues(){
    var fromValue = fromSlider.value;
    var toValue = toSlider.value;
    // Si le slider de gauche est plus grand que le slider de droite
    if(fromValue > toValue && fromValue != 0 && toValue != 100){
        // Mettre la valeur du slider de gauche dans le slider de droite
        toSlider.value = fromValue;
    }
    else if(toValue < fromValue && toValue != 100 && fromValue != 0){
        // Mettre la valeur du slider de droite dans le slider de gauche
        fromSlider.value = toValue;
    }
}
