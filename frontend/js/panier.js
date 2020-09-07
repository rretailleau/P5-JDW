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
    displayProducts(productsInCart);
    total(productsInCart)
    cartEmptying('vider-panier');
})

function findProduct(id, products) {
    return products.find((product) => product._id == id);
} 
function hide(id) {
    document.getElementById(id).style.display = 'none';
}
function show(id) {
    document.getElementById(id).style.display = 'block';
}
function cartEmptying(id) {
    document.getElementById(id).addEventListener('click',() => {
        clear();
        location.reload();
    })
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
function displayProducts(products) {
    let html ='';
    products.forEach((product) => {
        html += renderHTMLProduct(product,'cart');
    }) 
   document.getElementById('panier').innerHTML = html;
      
}
function total(products){
    //let prices = [];
    //prices.push(product.price); 
    //document.getElementById("total-order").innerHTML = prices.reduce(Func);
    //function Func(total, num) {
    //return total - num; }
    let total = 0;
    products.forEach((product) => {
        total += product.price/100;
    })
    document.getElementById('total-order').innerHTML = "Le montant total de votre commande est de   " + total + " €" ;
}
function cartSubmission() {
    document.getElementById('send-cart').addEventListener('click',() => {
        let response = {
            customer: formulaire,
            panier: panier,
        }
        numeroDeCommande();
    })
}
