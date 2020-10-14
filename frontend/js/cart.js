// option d'affichage et de requete selon l'etat du panier 
if (!Storage.has('products')) {
    show('panier-vide');
    hide('vider-panier');
    hide('formulaire');
} else {
    hide('panier-vide');
    show('vider-panier');
    show('formulaire');
    //requete sur serveur affiche les pdts du storage, le total attend de valider ou de vider
    ajax('http://localhost:3000/api/teddies/', 'GET').then((products)=> {
        let productsInCart = getProductFromCart(products);
        displayProducts(productsInCart);
        let total = countTotal(productsInCart);
        displayTotal(total);
        listenForCartSubmission(total);
        listenForCartEmptying('vider-panier');
    }) 
}

qtyInCart();

// exécute la somme des prix des produits du storage
function countTotal(products) {
    return products.reduce((total,product) => total + product.price, 0);  
}

// boucle les produits du storage et affiche les produits présent + attend le retrait d'un produit
function displayProducts(products) {
    let html ='';
    products.forEach((product) => {
        html += renderHTMLProduct(product,'cart');
    }) 
    document.getElementById('panier').innerHTML = html;

    products.forEach((product) => {
        listenForProductRemoval(product._id);
    }) 
}

// pour chaque id dans le storage, récupèere ts les champs objet dans un [] list
function getProductFromCart(products){
    let list =[];
    let productIdsInCart = Storage.get('products');
    for (let idInCart of productIdsInCart) {
        let product = findProduct(idInCart, products);
        list.push(product)      
    }
    return list;
}

// cherche un produit dans le [] d'id
function findProduct(id, products) {
    return products.find((product) => product._id == id);
}

// ecoute la suppression du panier
function listenForCartEmptying(id) {
    document.getElementById(id).addEventListener('click',() => {
        Storage.clear();
        location.reload();
    })
}

//  écoute pour envoyer le panier et les infos clients au serveur // si le test est validé
function listenForCartSubmission(total) {
    document.getElementById('send-cart').addEventListener('click',function(e) {
        e.preventDefault();
       
        if (!isFormValid()){
            alert ('la forme nest pas correcte');
            return;
        }
               
        let payload = { 
            contact: {
                firstName: document.getElementById('form-firstname').value,
                lastName: document.getElementById('form-name').value,
                address: document.getElementById('form-location').value,
                city: document.getElementById('form-city').value,
                email: document.getElementById('form-mail').value,
            },
            products: Storage.get('products')

        }

        ajax('http://localhost:3000/api/teddies/order/', 'POST', payload).then((response)=>{
            window.location = `order.html?id=${response.orderId}&total=${total}`;         
        })

    })
}

//récupère tout le storage > si mon id est prsent recherche son index pour le retirer
function listenForProductRemoval(id) {
    document.getElementById('remove-' + id).addEventListener('click',() => {
        let products = Storage.get('products');
        if (products.includes(id)) {
            let index = products.findIndex((productId) => productId == id);
            products.splice(index,1);
            Storage.set('products', products);
            location.reload(); 
        }
    }) 
}

// validation du formuaire par champs puis complet
function isFirstNameValid(){
    let firstname = document.getElementById('form-firstname').value;
    if (firstname.length > 3) {
        return true;
    } else {
        return false;
    }
}

function isNameValid(){
    let name = document.getElementById('form-name').value;
    if (name.length > 3) {
        return true;
    } else { 
        return false;
    }
    
}

function isMailValid(){
    let mail = document.getElementById('form-mail').value;
    if (mail.length > 3) {
        return true;
    } else {
        return false;
    }
}

function isLocationValid(){
    let location = document.getElementById('form-location').value;
    if (location.length > 3) {
        return true;
    } else {
        return false;
    }
}

function isCityValid(){
    let city = document.getElementById('form-city').value;
    if (city.length > 3) {
        return true;
    } else {
        return false;
    }
}

function isFormValid() {    
    return (
        isFirstNameValid() &&
        isNameValid() &&
        isMailValid() &&
        isLocationValid() &&
        isCityValid() && 
        Storage.has('products')
    );
}


