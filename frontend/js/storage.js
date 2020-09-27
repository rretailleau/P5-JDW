const Storage = {
    engine: localStorage,

    has(name) {
        if (this.engine.getItem(name)) {
            return true;
    }
        return false;
    },
    
    get(name) {
        return JSON.parse(this.engine.getItem(name));
    },

    set(name, value) {
        this.engine.setItem(name , JSON.stringify(value));
    },

    clear() {
        this.engine.clear();
    }
}