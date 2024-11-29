# onEnter: 函数(args) : 回调函数, 给定一个参数 args, 用于读取或者写入参数作为 NativePointer 对象的指针;
# onLeave: 函数(retval) : 回调函数给定一个参数 retval, 该参数是包含原始返回值的 NativePointer 派生对象; 可以调用 retval.replace(1234) 以整数 1234 替换返回值, 或者调用retval.replace(ptr("0x1234")) 以替换为指针;
# 注意: retval 对象会在 onLeave 调用中回收, 因此不要将其存储在回调之外使用, 如果需要存储包含的值, 需要制作深拷贝, 如 ptr(retval.toString())

function find_func_from_exports() {
    var add_c_addr = Module.findExportByName("libnative-lib.so", "add_c");
    console.log("add_c_addr is :",add_c_addr);
    // 添加拦截器
    Interceptor.attach(add_c_addr,{
        // 打印入参
        onEnter: function (args) {
            console.log("add_c called");
            console.log("arg1:",args[0].toInt32());
            console.log("arg2", args[1].toInt32());
        },
        // 打印返回值
        onLeave: function (returnValue) {
            console.log("add_c result is :", returnValue.toInt32());
            // 修改返回值
            returnValue.replace(100);
        }
    })
}
