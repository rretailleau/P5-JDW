
qtyInCart();

//affiche [] des pdts du serveur avec attributs
ajax('http://localhost:3000/api/teddies/', 'GET').then((products)=>{
    displayProducts(products);
})

// boucle ajoute tous les produits du serveur et les ajoute la variable html puis affiche avec renderHTML 
function displayProducts(products) {
    let html ='';
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        html += renderHTMLProduct(product,'list');
    }
    document.getElementById('result').innerHTML = html;      
}
