updateCart();


if (!getProductId()){
    alert('référence produit inconnu');
}

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

function getProductId() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('product_id')) {
        return params.get('product_id');
    }
    return null;
}

function listenForCartAddition() {
    
    document.getElementById('add-to-cart-button').addEventListener('click', function() {
        let products = [];

        if (Storage.has('products')) {
            products = Storage.get('products');
        }
        if (isProductAlreadyInCart()){
            location.reload();
            return
        }

            
        products.push(getProductId());
        Storage.set('products' , products);
        updateCart();
        
        
    })
}

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

function enableButton(id) {
    document.getElementById(id).disabled = false;
    document.getElementById(id).innerHTML = 'ajouter au panier';
}
function disableButton(id) {
    document.getElementById(id).disabled = true;
    document.getElementById(id).innerHTML = 'déja commandé';
}

