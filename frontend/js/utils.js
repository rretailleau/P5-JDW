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

function renderHTMLProduct(product, type) {
    if (type === 'list') {
        return`
        <div class="product-list">
            <div>${product.name}</div>
            <button id="see-product"><a href="product.html?product_id=${product._id}"> voir+</a></button>
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
            </br>
            <img src= ${product.imageUrl} width="200px"/>
            </br>
            <button class="remove-from-cart-button" id="remove-${product._id}">supprimer ce produit</button>
        </div>`
    }
}
 
function total(products) {
    let total = products.reduce((total,product) => total + product.price/100, 0);

    document.getElementById('total-order').innerHTML = `Le montant total de votre commande est de ${total} €` ;
}

function updateCart(){
    let total = 0;
    if (Storage.has('products')){
        total = Storage.get('products').length;
    }  
    document.getElementById('total-product').innerHTML = total;
}
