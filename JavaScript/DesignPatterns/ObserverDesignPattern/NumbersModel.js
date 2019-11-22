class NumbersModel{
    constructor(){
        this.number =0 ;
        this.color='red';
        this.observers=[];
    }

    increment(){       
        const colors=['orange','red','blue','green']
        
        this.number++;
        this.color=colors[Math.floor(Math.random() * colors.length)]

        this.notifyObservers();
    }

    addObserver(o){
        this.observers.push(o);
    }

    notifyObservers(){
        for(let observer of this.observers){
            observer.update(this);
        }
    }
}

