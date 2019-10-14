class IndexSingleton{
    constructor(val){
        this.index = val;
    }
    increment(){
        this.index = this.index + 1;
    }
}

export default new IndexSingleton(40);
