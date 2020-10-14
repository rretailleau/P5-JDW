//objet proriete methode
const Storage = {
    engine: localStorage,
    //regarde si l’element est dans le storage
    has(name) {
        if (this.engine.getItem(name)) {
            return true;
        }
        return false;
    },
    //recupere un element du storage
    get(name) {
        return JSON.parse(this.engine.getItem(name));
    },
    //enregistre la paire name-value dans le storage
    set(name, value) {
        this.engine.setItem(name , JSON.stringify(value));
    },
    //vide le storage
    clear() {
        this.engine.clear();
    }
}