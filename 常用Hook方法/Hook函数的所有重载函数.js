function hook_overload_8() {
    if(Java.available) {
        Java.perform(function () {
            console.log("start hook");
            var targetMethod = 'add';
            var targetClass = 'com.roysue.roysueapplication.Ordinary_Class';
            var targetClassMethod = targetClass + '.' + targetMethod;
            //目标类
            var hook = Java.use(targetClass);
            //重载次数
            var overloadCount = hook[targetMethod].overloads.length;
            //打印日志：追踪的方法有多少个重载
            console.log("Tracing " + targetClassMethod + " [" + overloadCount + " overload(s)]");
            //每个重载都进入一次
            for (var i = 0; i < overloadCount; i++) {
                    //hook每一个重载
                    hook[targetMethod].overloads[i].implementation = function() {
                        console.warn("n*** entered " + targetClassMethod);
                        //可以打印每个重载的调用栈，对调试有巨大的帮助，当然，信息也很多，尽量不要打印，除非分析陷入僵局
                        Java.perform(function() {
                            var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
                                console.log("nBacktrace:n" + bt);
                        });   
                        // 打印参数
                        if (arguments.length) console.log();
                        for (var j = 0; j < arguments.length; j++) {
                            console.log("arg[" + j + "]: " + arguments[j]);
                        }
                        //打印返回值
                        var retval = this[targetMethod].apply(this, arguments); // rare crash (Frida bug?)
                        console.log("nretval: " + retval);
                        console.warn("n*** exiting " + targetClassMethod);
                        return retval;
                    }
                }
            console.log("hook end");
        });
    }
}
