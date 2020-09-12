if (!has('products')) {
    show('panier-vide');
    hide('vider-panier');
    hide('formulaire');
} else {
    hide('panier-vide');
    show('vider-panier');
    show('formulaire');
}

ajax('http://localhost:3000/api/teddies/', 'GET').then((products)=>{
    let productsInCart = getProductFromCart(products);
    cartEmptying('vider-panier');
    displayProducts(productsInCart);
    total(productsInCart)
    listenForCartSubmission()
})

function findProduct(id, products) {
    return products.find((product) => product._id == id);
} 
function getProductFromCart(products){
    let list =[];
    let productIdsInCart = get('products');
    for (let idInCart of productIdsInCart) {
        let product = findProduct(idInCart, products);
        list.push(product)      
    }
    return list;
}
function cartEmptying(id) {
    document.getElementById(id).addEventListener('click',() => {
        clear();
        location.reload();
    })
}

function displayProducts(products) {
    let html ='';
    products.forEach((product) => {
        html += renderHTMLProduct(product,'cart');
    }) 
   document.getElementById('panier').innerHTML = html;
      
}
function total(products) {
    let total = products.reduce((total,product) => total + product.price/100, 0);

    document.getElementById('total-order').innerHTML = "Le montant total de votre commande est de   " + total + " €" ;
}


function listenForCartSubmission() {
    document.getElementById('send-cart').addEventListener('submit',function(e) {
        e.preventDefault();
        isFormValid();    
        
        let products = get('products');
        let total = total(productsInCart)
        let contact = {
            nom: nom,
            mail: mail,
            location: location,
            city: city,
        }
        let payload = {
            contact: contact,
            products: products,
            total: total,
        }
        console.log(payload);
        ajax('http://localhost:3000/api/teddies/order/', 'POST', payload).then((e)=>{
            
            document.getElementById('order').innerHTML = payload ;
            document.getElementById('order-number').innerHTML = getOrderNumber();

        })

    })
}

function isNomValid(){
    let nom = document.getElementById('form-nom').value;
    if (nom.length > 3) {
        return true;
    }}

function isMailValid(){
    let mail = document.getElementById('form-mail').value;
    if (mail.length > 3) {
        return true;
    }}

function isLocationValid(){
    let location = document.getElementById('form-location').value;
    if (location.length > 3) {
        return true;
    }}

function isCityValid(){
    let city = document.getElementById('form-city').value;
    if (city.length > 3) {
        return true;
    }}

function isFormValid() {    
    return (
        isNomValid() &&
        isMailValid() &&
        isLocationValid() &&
        isCityValid() && 
        Storage.has('products')
    );
}

function getOrderNumber(id) {
    let numcommande = 1032;
    return (numcommande);
    console.log(numcommande);
} 