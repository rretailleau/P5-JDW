function renderHTMLProduct(product, type) {
    if (type === 'list') {
        return`
        <div class="product-single">
            ${product.name}
            <a href="product.html?product_id=${product._id}">voir+</a>
            </br>
            <img src= ${product.imageUrl} width="400px"/>
        </div>`
    }
    if (type === 'single') {
        return`
        <div class "product-single">
            ${product.name}
            </br>
            ${product.description}
            </br>
            ${product.couleur}
            </br>
            ${product.price/100}€
            </br>
            <img src= ${product.imageUrl} width="300px"/>
            <button data-id="${product._id}" id="add-to-cart-button">ajouter au Panier</button>
            </br>
            </br>
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

function ajax(url){
    return new Promise ((resolve, reject)=> {
        let req = new XMLHttpRequest();
        req.open('GET', url);
        
        req.addEventListener("load", function(){
            if(req.status>=200){
                let data = JSON.parse(req.responseText);
                resolve(data);
            }
            else{
                reject();
            }
            
        });

    req.setRequestHeader("content-type", "application/json;charset=UTF-8");

    req.send();
    });
}