var run = new Main();

const storedata = ()=>{
    run.store();
}
window.onclose = ()=>{storedata};