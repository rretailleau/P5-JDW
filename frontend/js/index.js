// Utils l.81
qtyInCart();

// utils l.1
ajax('http://localhost:3000/api/teddies/', 'GET').then((products)=>{
    displayProducts(products);
})

// boucle ajoute tous les produits du serveur et les ajoute la variable html puis affiche avec renderHTML utils l.31
function displayProducts(products) {
    let html =''; 
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        html += renderHTMLProduct(product,'list');
    }
    document.getElementById('result').innerHTML = html;      
}
