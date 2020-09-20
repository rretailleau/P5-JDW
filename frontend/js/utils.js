

function renderHTMLProduct(product, type) {
    if (type === 'list') {
        return`
        <div class="product-list">
            <div>${product.name}<a href="product.html?product_id=${product._id}"> voir+</a></div>
            <img src= ${product.imageUrl} width="400px"/>
        </div>`
    }
    if (type === 'single') {
        return`
        <div class "product-single">
            <div>${product.name}</div>
            <div>${product.description}</div>
            <div>${product.price/100}€</div>
            <img src= ${product.imageUrl} width="300px"/>
            </br>
            <button data-id="${product._id}" id="add-to-cart-button">ajouter au Panier</button>
        </div>`
    }
    if (type === 'cart') {
        return`
        <div class="product-cart">      
            ${product.name}
            ${product.price/100}€
            <img src= ${product.imageUrl} width="200px"/>
            </br>
            <button onclick="removeFromCartSelection('${product._id}')" data-id="${product._id}" id="remove-from-cart-button">supprimer ce produit</button>
        </div>`
    }
}

function ajax(url, verb, payload = {}){
    return new Promise ((resolve, reject)=> {
        let req = new XMLHttpRequest();
        req.open(verb, url);
        
        req.addEventListener("load", function(){
            if(req.status>=200){
                let data = JSON.parse(req.responseText);
                resolve(data);
            } else {
                reject();
            }
            
        });

        req.setRequestHeader("content-type", "application/json;charset=UTF-8");

        req.send(JSON.stringify(payload));
    });
}

function hide(id) {
    document.getElementById(id).style.display = 'none';
}
function show(id) {
    document.getElementById(id).style.display = 'block';
}

 function updateCart(){
    let total = 0;
    if (has('products')){
        total = get('products').length;
    }  
    document.getElementById('total-product').innerHTML = total;
}
 
function total(products) {
    let total = products.reduce((total,product) => total + product.price/100, 0);

    document.getElementById('total-order').innerHTML = `Le montant total de votre commande est de ${total} €` ;
}
