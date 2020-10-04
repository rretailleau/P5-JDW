qtyInCart();

// test 
if (!getProductId()){
    alert('référence produit inconnu');
}

// requete sur url produit et affichage display l.20
// test si le produit est deja dans le panier l.55 l.66 on arret ele processus sinon on attend la selection
ajax('http://localhost:3000/api/teddies/'+ getProductId(),'GET')
    .then((product)=>{
        displayProduct(product);
        if (isProductAlreadyInCart()) {
            disableButton('add-to-cart-button');
        } else {
            listenForCartAddition();
        }
    })
    
function displayProduct(product) {
    document.getElementById('product').innerHTML = renderHTMLProduct(product, 'single');
}

// recupere l'id dans lURL 
function getProductId() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('product_id')) {
        return params.get('product_id');
    }
    return null;
}

//recupere les id, si deja présent > stop / sinon ajoute 
function listenForCartAddition() {    
    document.getElementById('add-to-cart-button').addEventListener('click', function() {
        let products = [];

        if (Storage.has('products')) {
            products = Storage.get('products');
        }
          if (isProductAlreadyInCart()){
              alert('deja ajouté');
              return
            }

            
        products.push(getProductId());
        Storage.set('products' , products);
        qtyInCart();
        location.reload();
        
        
    })
}

// si il y a des produits dans le storage et si cet id l.24 est dans le storage 
function isProductAlreadyInCart() {
    if (!Storage.has('products')) {
        return false;
    } 
    let products = Storage.get('products');
    if (products.includes(getProductId())) { 
        return true;
    }
    return false;
}
// desactive le btn
function disableButton(id) {
    document.getElementById(id).disabled = true;
    document.getElementById(id).innerHTML = 'déja commandé';
}

