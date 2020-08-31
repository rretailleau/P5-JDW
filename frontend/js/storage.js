function has(name) {
    if (localStorage.getItem(name)) {
        return true;
    }
    return false;
}

function get(name) {
    return JSON.parse(localStorage.getItem(name));
}

function set(name, value) {
    localStorage.setItem(name , JSON.stringify(value));
}

function clear() {
    localStorage.clear();
}
