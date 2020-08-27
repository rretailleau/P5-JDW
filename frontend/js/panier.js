// requete ajax
ajax('http://localhost:3000/api/teddies/').then((products)=>{
    let productIdsInCart = get('products');
    let cart = '';

    for (let idInCart of productIdsInCart) {
        let product = findProduct(idInCart, products);
        console.log(product)

        cart += renderHTMLProduct(product, 'cart');
    }
    document.getElementById('panier').innerHTML = cart;
})

function findProduct(id, products) {
    return products.find((product) => product._id == id);
}
  
