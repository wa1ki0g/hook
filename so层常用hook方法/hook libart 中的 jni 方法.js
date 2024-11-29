# jni 全部定在在 /system/lib(64)/libart.so 文件中, 通过枚举 symbols 筛选出指定的方法

function hook_libart() {
    var GetStringUTFChars_addr = null;

    // jni 系统函数都在 libart.so 中
    var module_libart = Process.findModuleByName("libart.so");
    var symbols = module_libart.enumerateSymbols();
    for (var i = 0; i < symbols.length; i++) {
        var name = symbols[i].name;
        if ((name.indexOf("JNI") >= 0) 
						&& (name.indexOf("CheckJNI") == -1) 
						&& (name.indexOf("art") >= 0)) {
            if (name.indexOf("GetStringUTFChars") >= 0) {
                console.log(name);
                // 获取到指定 jni 方法地址
                GetStringUTFChars_addr = symbols[i].address;
            }
        }
    }

    Java.perform(function(){
        Interceptor.attach(GetStringUTFChars_addr, {
            onEnter: function(args){
                // console.log("args[0] is : ", args[0]);
                // console.log("args[1] is : ", args[1]);
                console.log("native args[1] is :",Java.vm.getEnv().getStringUtfChars(args[1],null).readCString());
                console.log('GetStringUTFChars onEnter called from:\n' +
                    Thread.backtrace(this.context, Backtracer.FUZZY)
                    .map(DebugSymbol.fromAddress).join('\n') + '\n');
                // console.log("native args[1] is :", Java.cast(args[1], Java.use("java.lang.String")));
                // console.log("native args[1] is :", Memory.readCString(Java.vm.getEnv().getStringUtfChars(args[1],null)));
            }, onLeave: function(retval){
                // retval const char*
                console.log("GetStringUTFChars onLeave : ", ptr(retval).readCString());
            }
        })
    })
}
