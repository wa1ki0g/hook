function frida_Interceptor() {
    Java.perform(function () {
       //这个c_getSum方法有两个int参数、返回结果为两个参数相加
       //这里用NativeFunction函数自己定义了一个c_getSum函数
       var add_method = new NativeFunction(Module.findExportByName('libhello.so', 'c_getSum'), 
       'int',['int','int']);
       //输出结果 那结果肯定就是 3
       console.log("result:",add_method(1,2));
       //这里对原函数的功能进行替换实现
       Interceptor.replace(add_method, new NativeCallback(function (a, b) {
           //h不论是什么参数都返回123
            return 123;
       }, 'int', ['int', 'int']));
       //再次调用 则返回123
       console.log("result:",add_method(1,2));
    });
}
