ajax('http://localhost:3000/api/teddies/', 'GET').then((products)=>{
    let productIdsInCart = get('products');
    let cart = '';
    let sum = 0;
  
    for (let idInCart of productIdsInCart) {

        let product = findProduct(idInCart, products);

        cart += renderHTMLProduct(product, 'cart');
        console.log(idInCart);

        sum += renderHTMLProduct(product.price, 'amount');
        console.log(sum);
    }
    document.getElementById('order').innerHTML = cart;
    document.getElementById('total-price').innerHTML = sum;
})

function findProduct(id, products) {
    return products.find((product) => product._id == id);
}
