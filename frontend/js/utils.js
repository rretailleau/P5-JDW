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

        req.send(payload);
    });
}