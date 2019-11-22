class ElementObserver{
    constructor(elementID){
        this.element = document.getElementById(elementID);
    }

    update(model){
        this.element.innerHTML = model.number;
        this.element.style.backgroundColor=model.color;
    }
}