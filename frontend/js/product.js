if (!getProductId()){
    alert('référence produit inconnu');
}

ajax('http://localhost:3000/api/teddies/'+ getProductId(),'GET')
.then((product)=>{
    displayProduct(product)
    listenForCartAddition();
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

        if (has('products')) {
            products = get('products');
        }
        console.log(get('products'));
        //let productId = document.getElementById('add-to-cart-button').dataset.id;
        
        if (products.includes(getProductId())) {
            alert('vous avez déjà selectionné ce produit');
            return;
        }

        products.push(getProductId());

        set('products' , products);
    })
}
