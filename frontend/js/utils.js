// Requete HTML avec promesse /si la requete est valide on recupere ou envoie les donnees sinon rejet
function ajax(url, verb, payload = {}){
    return new Promise ((resolve, reject)=> {
        let req = new XMLHttpRequest();
        req.open(verb, url);
        
        req.addEventListener("load", function() {
            if(req.status>=200) {
                let data = JSON.parse(req.responseText);
                resolve(data);
            } else {
                reject();
            }
            
        });

        req.setRequestHeader("content-type", "application/json;charset=UTF-8");

        req.send(JSON.stringify(payload));
    });
}

// affiche le total 
function displayTotal(total) {
    document.getElementById('total-order').innerHTML = `Le montant total de votre commande est de ${money(total)}` ;
}

// masque des élements incohérents à la situation
function hide(id) {
    document.getElementById(id).style.display = 'none';
}

// converti le prix centime en € 2 decimale 
function money(price) {
    return (price/100).toFixed(2) + '€';
}

// si produits dans storage affiche le nb d'elet du storage 
function qtyInCart(){
    let total = 0;
    if (Storage.has('products')){
        total = Storage.get('products').length;
    }  
    document.getElementById('total-product').innerHTML = total;
}

// rendu html d’une liste de produit, d’un produit ou du panier
function renderHTMLProduct(product, type) {
    if (type === 'list') {
        return`
        <div class="product-list">
            <div>${product.name}</div>
            <div>${money(product.price)}</div>
            <a href="product.html?product_id=${product._id}" title="voir+"><img src= ${product.imageUrl} id="img-catalog"/></a>
        </div>`
    }

    if (type === 'single') {
        return`
        <div>
            <div class="product-single">
                <img src="${product.imageUrl}" id="img-product"/> 
                <div id="product-info">    
                    <div>${product.name}</div>
                    <form id="select" method="POST" >
                        <p>
                            <select type="text" name="couleur">
                                <option> brun </option>
                                <option> marron </option>
                                <option> blanc </option>
                            </select>
                        </p>
                    </form>  
                    <div>${product.description}</div>
                    <div>${money(product.price)}</div>
                </div>
            </div>
            <button data-id="${product._id}" id="add-to-cart-button">ajouter au Panier</button>
        </div>`
    }

    if (type === 'cart') {
        return`
        <div class="product-cart"> 
            <img src="${product.imageUrl}" id="img-cart"/>    
            <div>${product.name}</div>
            <div>${money(product.price)}</div>
            <button class="remove-from-cart-button" id="remove-${product._id}">supprimer ce produit</button>
        </div>
        <div id="border"></div>`
    }
}
 
// affiche les élements nécéssaires à la situation
function show(id) {
    document.getElementById(id).style.display = 'block';
}
