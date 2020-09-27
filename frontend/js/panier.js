if (!Storage.has('products')) {
    show('panier-vide');
    hide('vider-panier');
    hide('formulaire');
} else {
    hide('panier-vide');
    show('vider-panier');
    show('formulaire');
    ajax('http://localhost:3000/api/teddies/', 'GET').then((products)=>{
        let productsInCart = getProductFromCart(products);
        listenForCartEmptying('vider-panier');
        displayProducts(productsInCart);
        total(productsInCart);
        listenForCartSubmission();
    }) 
}

updateCart();

function displayProducts(products) {
    let html ='';
    products.forEach((product) => {
        html += renderHTMLProduct(product,'cart');
    }) 
    document.getElementById('panier').innerHTML = html;

    products.forEach((product) => {
        listenForProductRemoval(product._id);
    }) 
}
function findProduct(id, products) {
    return products.find((product) => product._id == id);
} 

function getProductFromCart(products){
    let list =[];
    let productIdsInCart = Storage.get('products');
    for (let idInCart of productIdsInCart) {
        let product = findProduct(idInCart, products);
        list.push(product)      
    }
    return list;
}

function listenForCartEmptying(id) {
    document.getElementById(id).addEventListener('click',() => {
        Storage.clear();
        location.reload();
    })
}

function listenForCartSubmission() {
    document.getElementById('send-cart').addEventListener('click',function(e) {
        e.preventDefault();
       
        if (!isFormValid()){
            alert ('la forme nest pas correcte');
            return;
        }
        let products = Storage.get('products');

        let contact = {
            firstName: document.getElementById('form-firstname').value,
            lastName: document.getElementById('form-name').value,
            address: document.getElementById('form-location').value,
            city: document.getElementById('form-city').value,
            email: document.getElementById('form-mail').value,
        }
        
        let payload = {
            contact: contact,
            products: products,
        }
        console.log(1, payload);

        ajax('http://localhost:3000/api/teddies/order/', 'POST', payload).then((response)=>{
            window.location = `order.html?id=${response.orderId}`;         
        })

    })
}

function listenForProductRemoval(id) {
    document.getElementById('remove-' + id).addEventListener('click',() => {
        console.log(id);
        let products = Storage.get('products');
        if (products.includes(id)) {
            let index = products.findIndex((productId) => productId == id);
            products.splice((index),1);
            Storage.set('products', products);
            location.reload(); 
        }
    }) 
}

function isFirstNameValid(){
    let firstname = document.getElementById('form-firstname').value;
    if (firstname.length > 3) {
        return true;
    } else {
        return false;
    }
}

function isNameValid(){
    let name = document.getElementById('form-name').value;
    if (name.length > 3) {
        return true;
    } else { 
        return false;
    }
    
}

function isMailValid(){
    let mail = document.getElementById('form-mail').value;
    if (mail.length > 3) {
        return true;
    } else {
        return false;
    }
}

function isLocationValid(){
    let location = document.getElementById('form-location').value;
    if (location.length > 3) {
        return true;
    } else {
        return false;
    }
}

function isCityValid(){
    let city = document.getElementById('form-city').value;
    if (city.length > 3) {
        return true;
    } else {
        return false;
    }
}

function isFormValid() {    
    return (
        isFirstNameValid() &&
        isNameValid() &&
        isMailValid() &&
        isLocationValid() &&
        isCityValid() && 
        Storage.has('products')
    );
}


