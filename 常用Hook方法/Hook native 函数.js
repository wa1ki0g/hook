Interceptor.attach(Module.findExportByName("xxx.so" , "xxxx"), {
    onEnter: function(args) {
        send("open(" + Memory.readCString(args[0])+","+args[1]+")");
    },
    onLeave:function(retval){
    }
});
