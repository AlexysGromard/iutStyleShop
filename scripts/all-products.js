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


// FILTRES
// Récupérer les filtres
// Min prince = fromSlider
// Max price = toSlider


// Si quelque chose change dans #filter-section 
// (un filtre est coché ou décoché)
window.onload = function(){
    filter();
}
document.getElementById('filter-section').onchange = function(){
    filter();
}

function filter(){
    minPrice = fromSlider.value;
    maxPrice = toSlider.value;
    // Récupérer les catégories (type checkbox)
    tshirt = document.getElementById('tshirt').checked;
    sweatshirt = document.getElementById('sweatshirt').checked;
    sportswear = document.getElementById('sportswear').checked;
    accessories = document.getElementById('accessories').checked;
    // Récupérer les couleurs (type checkbox)
    red = document.getElementById('red').checked;
    green = document.getElementById('green').checked;
    blue = document.getElementById('blue').checked;
    white = document.getElementById('white').checked;
    black = document.getElementById('black').checked;
    // Nb articles
    nbArticles = document.getElementById('nb-articles');
    // Mettre les produits dans la page
    addProductBox();
}

function checkColor(product){
    if(product.couleur == 'red' && red){
        return true;
    }
    else if(product.couleur == 'green' && green){
        return true;
    }
    else if(product.couleur == 'blue' && blue){
        return true;
    }
    else if(product.couleur == 'white' && white){
        return true;
    }
    else if(product.couleur == 'black' && black){
        return true;
    }
    else{
        return false;
    }
}

// Ajouter box produit dans la page
function addProductBox(){
    // Récupérer la div qui contient tous les produits
    product = '<div id="" class="boite_article"> <img class="image" src="../assets/articles/claquettes/claquettes.png" alt="Claquettes"><div class="bas_article"><div class="medium-important-text">Lorem ipsum</div><div class="stars"><img alt="Etoile Jaune" src="../assets/icons/marquer-comme-star-preferee.svg"><img alt="Etoile Jaune" src="../assets/icons/marquer-comme-star-preferee.svg"><img alt="Etoile Jaune" src="../assets/icons/marquer-comme-star-preferee.svg"><img alt="Etoile Jaune" src="../assets/icons/marquer-comme-star-preferee.svg"><img alt="Etoile Gris" src="../assets/icons/marquer-comme-star-pas-preferee.svg"></div><div class="availablity"><div class="small-text">Disponibilité :</div><div class="small-text green">En stock</div></div><div class="price-btn"><div class="price">0,00€</div><a class="button medium-size basic-text">Ajouter au panier</a></div></div></div>'
    // Lire le fichier JSON
    var requestURL = '../products/products.json';
    // Supprimer tous les produits de la page
    document.getElementById('products-section').innerHTML = '';
    // Récypérer les articles qui correspondent aux filtres
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        var products = request.response.articles;
        var productsFiltered = [];
        for(var i = 0; i < products.length; i++){
            // Si le prix est dans l'intervalle
            if(products[i].prix >= minPrice && products[i].prix <= maxPrice){
                // Si la catégorie est cochée
                if(products[i].category == 'tshirt' && tshirt){
                    if (checkColor(products[i])){
                        productsFiltered.push(products[i]);
                    }
                }
                else if(products[i].category == 'sweatshirt' && sweatshirt){
                    if (checkColor(products[i])){
                        productsFiltered.push(products[i]);
                    }                }
                else if(products[i].category == 'sportswear' && sportswear){
                    if (checkColor(products[i])){
                        productsFiltered.push(products[i]);
                    }                }
                else if(products[i].category == 'accessories' && accessories){
                    if (checkColor(products[i])){
                        productsFiltered.push(products[i]);
                    }
                }
            }
        }
        // Ajouter produit dans la page dans #products-section
        for(var i = 0; i < productsFiltered.length; i++){
            pushProduct = product;
            // Changer lee nom
            pushProduct = pushProduct.replace('Lorem ipsum', productsFiltered[i].nom);
            // Changer le prix 
            pushProduct = pushProduct.replace('0,00€', productsFiltered[i].prix + '€');
            // Changer l'image
            pushProduct = pushProduct.replace('../assets/articles/claquettes/claquettes.png', "../products/" + productsFiltered[i].nomDeDossier + "/" + productsFiltered[i].images[0]);
            // Ajouter l'ID : nomDeDossier
            pushProduct = pushProduct.replace('id=""', 'id="' + productsFiltered[i].nomDeDossier + '"');
            document.getElementById('products-section').innerHTML += pushProduct;
        }
        nbArticles.innerHTML = productsFiltered.length + ' articles';
        chargerProduits();
    }
}

// PANNIER
// Récupérer fichier JSON 
shoopingCard = JSON.parse(localStorage.getItem('../products/shopping-card.json'));
// Créer variable des articles present
var productBox = [];

// Récupérer les éléments sur la page de type .boite_article
function chargerProduits(){
    productBox = document.getElementsByClassName('boite_article');
    // Ajouter un event listener sur chaque boite_article
    for(var i = 0; i < productBox.length; i++){
        productBox[i].addEventListener('click', ajouterArticle);
    }
}

ajouterArticle = function(){
    // Ajouter l'article au panier
    // Créer objet article
    var article = {
        nom: this.getElementsByClassName('medium-important-text')[0].innerHTML,
        prix: this.getElementsByClassName('price')[0].innerHTML,
        image: this.getElementsByClassName('image')[0].src,
        quantite: 1
    }
    // Ecrire dans le fichier JSON
    // Si le panier est vide
    if(shoopingCard == null){
        shoopingCard = [];
        shoopingCard.push(article);
    }
    else{
        // Si l'article est déjà présent
        var present = false;
        for(var i = 0; i < shoopingCard.length; i++){
            if(shoopingCard[i].nom == article.nom){
                shoopingCard[i].quantite++;
                present = true;
            }
        }
        // Si l'article n'est pas présent
        if(!present){
            shoopingCard.push(article);
        }
    }
}

