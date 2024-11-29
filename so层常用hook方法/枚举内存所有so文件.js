function hook_native(){
    var modules = Process.enumerateModules();
    for (var i in modules){
        var module = modules[i];
        console.log(module.name);
        if (module.name.indexOf("target.so") > -1 ){
            console.log(module.base);
        }
    }
}
