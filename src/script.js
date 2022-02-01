var run ;
const load = ()=>{
    run = new Main();
}

const storedata = ()=>{
    run.store();
    open("about:blank")
}
window.onload = ()=>{load()};
window.onclose = ()=>{storedata()};