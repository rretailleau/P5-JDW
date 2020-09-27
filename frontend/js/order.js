const params = new URLSearchParams(window.location.search);
let orderId = params.get('id');

document.getElementById('order-id').innerHTML = `Votre reference commande est ${orderId}`;

Storage.clear();

