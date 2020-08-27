
ajax('http://localhost:3000/api/teddies/').then((products)=>{
    displayProducts(products);
})

function displayProducts(products) {
        let html =''; 
       
        for (let i = 0; i < products.length; i++) {
            let product = products[i];
                    
            html += renderHTMLProduct(product,'list');
        }
       
       document.getElementById('result').innerHTML = html;
       
}
