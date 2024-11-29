# /system/lib(64)/libc.so 导出的符号没有进行 namemanline , 直接过滤筛选即可

// hook libc.so
var pthread_create_addr = null;

// console.log(JSON.stringify(Process.enumerateModules())); 
// Process.enumerateModules() 枚举加载的so文件
var symbols = Process.findModuleByName("libc.so").enumerateSymbols();
for (var i = 0; i < symbols.length; i++){
    if (symbols[i].name === "pthread_create"){
        // console.log("symbols name is -> " + symbols[i].name);
        // console.log("symbols address is -> " + symbols[i].address);
        pthread_create_addr = symbols[i].address;
    }
}

Interceptor.attach(pthread_create_addr,{
    onEnter: function(args){
        console.log("args is ->" + args[0], args[1], args[2],args[3]);
    },
    onLeave: function(retval){
        console.log(retval);
    }
});

}
