// Récupérer nom de la page
var pageName = document.title;
pageName = pageName.split(' - ')[0];

var productPage = ["Tous les produits","T-Shirt", "Sweatshirt", "Tenue de sport", "Accessoires"]

// Afficher nb produits dans le panier
drawPanier();

if (productPage.includes(pageName)){
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
    // Si #product-type est disponible sur la page
    if(document.getElementById('product-type')){
        tshirt = document.getElementById('tshirt').checked;
        sweatshirt = document.getElementById('sweatshirt').checked;
        sportswear = document.getElementById('sportswear').checked;
        accessories = document.getElementById('accessories').checked;    
    } else {
        // Récupérer text de .section-title-name
        var titleCategory = document.getElementsByClassName('section-title-name')[0].innerHTML;
        // Si la catégorie est T-shirt
        if(titleCategory == 'T-Shirt'){
            tshirt = true;
            sweatshirt = false;
            sportswear = false;
            accessories = false;
        } else if(titleCategory == 'Sweat-shirts'){
            tshirt = false;
            sweatshirt = true;
            sportswear = false;
            accessories = false;
        }
        else if(titleCategory == 'Tenue de sport'){
            tshirt = false;
            sweatshirt = false;
            sportswear = true;
            accessories = false;
        }
        else if(titleCategory == 'Accessoires'){
            tshirt = false;
            sweatshirt = false;
            sportswear = false;
            accessories = true;
        }
    }
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
    product = '<div id="" class="boite_article"> <img class="image" src="' +retour.repeat(count) +'assets/articles/claquettes/claquettes.png" alt="Claquettes"><div class="bas_article"><div class="medium-important-text product-btn">Lorem ipsum</div><div class="stars"><img alt="Etoile Jaune" src="'+retour.repeat(count)+'assets/icons/marquer-comme-star-preferee.svg"><img alt="Etoile Jaune" src="'+retour.repeat(count)+'assets/icons/marquer-comme-star-preferee.svg"><img alt="Etoile Jaune" src="'+retour.repeat(count)+'assets/icons/marquer-comme-star-preferee.svg"><img alt="Etoile Jaune" src="'+retour.repeat(count)+'assets/icons/marquer-comme-star-preferee.svg"><img alt="Etoile Gris" src="'+retour.repeat(count)+'assets/icons/marquer-comme-star-pas-preferee.svg"></div><div class="availablity"><div class="small-text">Disponibilité :</div><div class="small-text green">En stock</div></div><div class="price-btn"><div class="price">0,00€</div><a class="button medium-size basic-text">Ajouter au panier</a></div></div></div>'
    // Lire le fichier JSON
    var requestURL = retour.repeat(count)+'products/products.json';
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
            pushProduct = pushProduct.replace(retour.repeat(count)+'assets/articles/claquettes/claquettes.png', retour.repeat(count)+"products/" + productsFiltered[i].nomDeDossier + "/" + productsFiltered[i].images[0]);
            // Ajouter l'ID : nomDeDossier
            pushProduct = pushProduct.replace('id=""', 'id="' + productsFiltered[i].nomDeDossier + '"');
            document.getElementById('products-section').innerHTML += pushProduct;
        }
        nbArticles.innerHTML = productsFiltered.length + ' articles';
        chargerProduits();
        ajouterClickableSurProduit();
    }
}

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

// FILTER IN SMARTPHONE
// Si #filter-section-title:after est cliqué
priceSlider = document.getElementById('price-slider');
if (document.getElementById('product-type')){
    typeCheckbox = document.getElementById('type-checkbox'); 
}
colorCheckbox = document.getElementById('color-checkbox');

// Quand on clique sur filter-section-title:after
filterSectionTitle = document.getElementById('filter-section-title');

filterSectionTitle.addEventListener('click', function(){
    // Mettre les ID à display: none
    if(priceSlider.style.display == 'none'){
        priceSlider.style.display = 'block';
        if (document.getElementById('product-type')){
            typeCheckbox.style.display = 'block';
        }
        colorCheckbox.style.display = 'block';
    } else {
        priceSlider.style.display = 'none';
        if (document.getElementById('product-type')){
            typeCheckbox.style.display = 'none';
        }
        colorCheckbox.style.display = 'none';
    }
});

} // Fin de la condition de produit

// Récupérer la position de la page dans arborecence
var path = window.location.pathname;
// compter le nombre de /
var count = (path.match(/\//g) || []).length - 1;
// Si path comment par = "/iutStyleShop"
if(path.startsWith('/iutStyleShop')){
    // Retirer 1 au nombre de /
    count--;
}
var retour = '../';



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



// PANNIER
// Récupérer fichier JSON 
shoopingCard = JSON.parse(localStorage.getItem(retour.repeat(count)+'products/shopping-card.json'));
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
        nomDeDossier: this.id,
        prix: this.getElementsByClassName('price')[0].innerHTML,
        image: this.getElementsByClassName('image')[0].src,
        quantite: 1
    }
    // Traiter le nom de l'image pour garder le nom de l'image
    var image = article.image.split('/');
    article.image = image[image.length - 1];
    // Ecrire dans le localStorage
    // Si le panier est vide
    if(localStorage.length == 0){
        localStorage.setItem(article.nomDeDossier, JSON.stringify(article));
    }
    else{
        // Si l'article est déjà présent
        var present = false;
        for(var i = 0; i < localStorage.length; i++){
            // Si l'article est déjà présent
            if(article.nomDeDossier == localStorage.key(i)){
                // Ajouter 1 à la quantité
                article.quantite = JSON.parse(localStorage.getItem(article.nomDeDossier)).quantite + 1;
                // Supprimer l'ancien article
                localStorage.removeItem(article.nomDeDossier);
                // Mettre l'article à jour
                localStorage.setItem(article.nomDeDossier, JSON.stringify(article));
                present = true;
            }

        }

        // Si l'article n'est pas présent
        if(!present){
            localStorage.setItem(article.nomDeDossier, JSON.stringify(article));
        }
    }
    drawPanier();
}

// PAGE PANIER
if(pageName == "Panier"){
    drawPricePanier();
    drawNbArticles();
    article = '<div class="article_rectangle big-size"><div class="image_article_panier small-size"></div><div class="informations-article"><div class="dispo_rect_article"><div class="medium-important-text">Lorem ipsum dolor sit amet</div><div class="availablity"><div class="small-text">Disponibilité :</div><div class="small-text green">En stock</div></div><div class="small-text">Taille : S</div></div><div><select class="quantity-size clickable"><option>1</option><option>2</option><option>3</option></select></div><div class="price2">25,99€</div><div><img src="../assets/icons/cross.svg" class="cross clickable"></div></div></div>'
    // Lire localStorage et mettre dans un tableau
    shoopingCard = [];
    for(var i = 0; i < localStorage.length; i++){
        shoopingCard.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }

    // Si le panier n'est pas vide
    if(shoopingCard != null){
        // Ajouter les articles au panier
        for(var i = 0; i < shoopingCard.length; i++){
            // Remplacer les valeurs
            var pushArticle = article;
            pushArticle = pushArticle.replace('<div class="image_article_panier small-size"></div>', ("<img class='image_article_panier small-size' src='"+ retour.repeat(count)+"products/" + shoopingCard[i].nomDeDossier + "/" + shoopingCard[i].image +"'/>") );
            pushArticle = pushArticle.replace('Lorem ipsum dolor sit amet', shoopingCard[i].nom);
            pushArticle = pushArticle.replace('25,99€', shoopingCard[i].prix);
            pushArticle = pushArticle.replace('../assets/icons/cross.svg', retour.repeat(count)+'assets/icons/cross.svg');
            // Quantité = à la quantité de l'article
            // Si la quantité > 3, rajouter 3 options à la fin de la balise <select>
            if (shoopingCard[i].quantite > 3){
                for(var j = 4; j <= shoopingCard[i].quantite; j++){
                    pushArticle = pushArticle.replace('</select>', '<option>'+ j +'</option></select>');
                }
            }                
            pushArticle = pushArticle.replace('<option>'+ shoopingCard[i].quantite +'</option>', '<option selected>'+ shoopingCard[i].quantite +'</option>');
            pushArticle = pushArticle.replace('../assets/images/produits/1/1.jpg', shoopingCard[i].image);
            // Ajouter l'id du nom de dossier à l'élément <img src="../assets/icons/cross.svg" class="cross clickable">
            pushArticle = pushArticle.replace('<img src="../assets/icons/cross.svg" class="cross clickable">', '<img src="../assets/icons/cross.svg" class="cross clickable" id="'+ shoopingCard[i].nomDeDossier +'">');
            // Ajouter l'article au panier
            document.getElementById('all-articles').innerHTML += pushArticle;
        }
    }
    // Si cross est cliqué, supprimer l'article du panier et du JSON
    var cross = document.getElementsByClassName('cross');
    for(var i = 0; i < cross.length; i++){
        cross[i].addEventListener('click', function(){
            // Supprimer l'article du localStorage (en récupérant le nom de dossier)
            localStorage.removeItem(this.id);
            // Supprimer l'article de la page
            this.parentElement.parentElement.parentElement.remove();
            drawPanier();
            drawPricePanier();
            drawNbArticles();
        });
    }
}

function drawPanier(){
    // Récupérer le nombre d'articles dans le panier
    var nombreArticles = document.getElementsByClassName('navigation-link-header-desc')[1];
    nombreArticles.innerHTML = localStorage.length + " articles";
}

function drawPricePanier(){
    // Récupérer le prix total du panier
    var prixTotal = document.getElementsByClassName('price')[0];
    var total = 0;
    for(var i = 0; i < localStorage.length; i++){
        total += parseFloat(JSON.parse(localStorage.getItem(localStorage.key(i))).prix) * parseInt(JSON.parse(localStorage.getItem(localStorage.key(i))).quantite);
    }
    // Garder 2 chiffres après la virgule
    total = total.toFixed(2);
    prixTotal.innerHTML = total + "€";
    // Afficher le "sous-total" id: st
    var st = document.getElementById('st');
    stnb = total * 0.8;
    stnb = stnb.toFixed(2);
    st.innerHTML = stnb + "€";
    // Afficher taxes id: taxes
    var taxes = document.getElementById('taxes');
    taxesnb = total * 0.2;
    taxesnb = taxesnb.toFixed(2);
    taxes.innerHTML = taxesnb + "€";
}

function drawNbArticles(){
    // Récupérer le nombre d'articles dans le panier
    var nombreArticles = document.getElementsByClassName('section-title-results')[0];
    nombreArticles.innerHTML = localStorage.length + " articles";
}

// PAGE PRODUIT
function ajouterClickableSurProduit(){
    var productBtn = document.getElementsByClassName('product-btn');
    var productImage = document.getElementsByClassName('image');

    for(var i = 0; i < productBtn.length; i++){
        // Ajouter un event listener sur les titres des produits
        productBtn[i].addEventListener('click', function(){
            afficherPageProduit(this.parentElement.parentElement.id)
        });
        productImage[i].addEventListener('click', function(){
            afficherPageProduit(this.parentElement.parentElement.id)
        });
    }
}

function afficherPageProduit(dos){  
    // Cette fonction va récupérer les infos du produit et les afficher sur la page produit
    // Les infos sont dans le JSON
    // Récupérer le JSON
    var requestURL = retour.repeat(count)+'products/products.json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function(){
        var products = request.response.articles;
        // Récupérer le produit
        for (var i = 0; i < products.length; i++){
            if (products[i].nomDeDossier == dos){
                // Récupérer les infos du produit
                var nom = products[i].nom;
                var description = products[i].description;
                var images = products[i].images;
                var prix = products[i].prix;
                var nomDeDossier = products[i].nomDeDossier;
                // Mettre les infos dans une mémoire tampon
                var productOpen = {
                    nom: nom,
                    description: description,
                    images: images,
                    prix: prix,
                    nomDeDossier: nomDeDossier
                };
                // Mettre la mémoire tampon dans le localStorage
                localStorage.setItem('productOpen', JSON.stringify(productOpen));
                // Ouvrir la page produit
                window.open(retour.repeat(count)+'article/', '_self');
            }
        }
    }
}

// PAGE PRODUIT (ouverte)
if (pageName == 'Article'){
    // Récupérer les infos du produit dans le localStorage
    var product = JSON.parse(localStorage.getItem('productOpen'));
    // Supprimer cet élément du localStorage
    localStorage.removeItem('productOpen');
    // Remplacer les valeurs
    var article = document.getElementsByClassName('acticle-name')[0];
    article.innerHTML = article.innerHTML.replace('Titre', product.nom);
    var article = document.getElementsByClassName('article-description')[0];
    article.innerHTML = article.innerHTML.replace('Description', product.description);
    var article = document.getElementById('price');
    article.innerHTML = article.innerHTML.replace('prix', product.prix + '€');
    // Mettre l'image dans #active-image
    var activeImage = document.getElementById('active-image');
    // Aller chercher l'image dans le dossier
    activeImage.src = retour.repeat(count)+'/products/'+ product.nomDeDossier +'/'+ product.images[0];
    // Mettre les images dans #product-images :                     <button class="product-images"><img src="../assets/articles/claquettes/claquettes.png" alt="Article2"></button>
    var productImages = document.getElementById('product-images');
    for(var i = 0; i < product.images.length; i++){
        var pushImage = '<button class="product-images"><img src="'+ retour.repeat(count)+'/products/'+ product.nomDeDossier +'/'+ product.images[i] +'" alt="Article2"></button>';
        productImages.innerHTML += pushImage;
    }
}