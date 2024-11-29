so 层方法注册到 js 中, 主动调用
address : 函数地址
returnType : 指定返回类型
argTypes : 数组指定参数类型
类型可选: void, pointer, int, uint, long, ulong, char, uchar, float, double, int8, uint8, int16, int32, uint32, int64, uint64; 参照函数所需的 type 来定义即可;

function invoke_native_func() {
    var baseAddr = Module.findBaseAddress("libnative-lib.so");
    console.log("baseAddr", baseAddr);
    var offset = 0x0000A28C + 1;
    var add_c_addr = baseAddr.add(offset);
    var add_c_func = new NativeFunction(add_c_addr, "int", ["int","int"]);
    var result = add_c_func(1, 2);
    console.log(result);
}


Java.perform(function () {
    // 获取 so 文件基地址
    var base = Module.findBaseAddress("libnative-lib.so");
    // 获取目标函数偏移
    var sub_834_addr = base.add(0x835) // thumb 需要 +1
    // 使用 new NativeFunction 将函数注册到 js
    var sub_834 = new NativeFunction(sub_834_addr, 'pointer', ['pointer']);
    // 开辟内存, 创建入参
    var arg0 = Memory.alloc(10);
    ptr(arg0).writeUtf8String("123");
    var result = sub_834(arg0);
    console.log("result is :", hexdump(result));
})
