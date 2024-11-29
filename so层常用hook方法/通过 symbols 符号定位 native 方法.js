function find_func_from_symbols() {
    var NewStringUTF_addr = null;
    var symbols = Process.findModuleByName("libart.so").enumerateSymbols();
    for (var i in symbols) {
        var symbol = symbols[i];
        if (symbol.name.indexOf("art") >= 0 &&
            symbol.name.indexOf("JNI") >= 0 &&
            symbol.name.indexOf("CheckJNI") < 0
        ){
            if (symbol.name.indexOf("NewStringUTF") >= 0) {
                console.log("find target symbols", symbol.name, "address is ", symbol.address);
                NewStringUTF_addr = symbol.address;
            }
        }
    }

    console.log("NewStringUTF_addr is ", NewStringUTF_addr);

    Interceptor.attach(NewStringUTF_addr, {
        onEnter: function (args) {
            console.log("args0",args[0])
            console.log("args0", args[0], hexdump(args[0]));
            console.log("args1", args[1], hexdump(args[1]));
            var env = Java.vm.tryGetEnv();
            if (env != null) {
                // 直接读取 c 里面的 char
                console.log("Memory readCstring is :", Memory.readCString(args[1]));
            }else{
                console.log("get env error");
            }
        },
        onLeave: function (returnResult) {
            console.log("result: ", Java.cast(returnResult, Java.use("java.lang.String")));
            var env = Java.vm.tryGetEnv();
            if (env != null) {
                var jstring = env.newStringUtf("修改返回值");
                returnResult.replace(ptr(jstring));
            }
        }
    })
}
