function DataStore(name){
    this.name = name;
}
DataStore.prototype.data = {
};
DataStore.prototype.setup = function(){
    if (localStorage.getItem(this.name) == undefined){
        localStorage.setItem(this.name,"{}");
    }else{
        this.data = JSON.parse(localStorage.getItem(this.name));
        console.log(this.data);
        console.log(localStorage.getItem(this.name));
    }
}
DataStore.prototype.data.allname = []
DataStore.prototype.Update = function(){
    localStorage.setItem(this.name,JSON.stringify(this.data));
    console.log("LocalStore is updated.",new Date());
};

DataStore.prototype.set = function(name,value){
    this.data[name] = value;
};

DataStore.prototype.get = function(name){
    return this.data[name]
};