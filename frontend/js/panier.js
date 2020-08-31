if (!has('products')) {
    document.getElementById('panier-vide').style.display = 'block';
    document.getElementById('vider-panier').style.display = 'none';
    document.getElementById('formulaire-commande').style.display = 'none';
} else {
    document.getElementById('panier-vide').style.display = 'none';
    document.getElementById('vider-panier').style.display = 'block';
    document.getElementById('formulaire-commande').style.display = 'block';
}

// requete ajax
ajax('http://localhost:3000/api/teddies/', 'GET').then((products)=>{
    let productIdsInCart = get('products');
    let cart = '';

    for (let idInCart of productIdsInCart) {
        let product = findProduct(idInCart, products);
        console.log(product)

        cart += renderHTMLProduct(product, 'cart');
    }
    document.getElementById('panier').innerHTML = cart;
    document.getElementById('vider-panier').addEventListener('click',() => {
        clear();
        location.reload();
    })
})

function findProduct(id, products) {
    return products.find((product) => product._id == id);
}
  
