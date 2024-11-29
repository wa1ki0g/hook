//拦截java的初始化java.lang.Stringbuilder的重载构造函数,将部分参数写入控制台。
const StringBuilder = Java.use('java.lang.StringBuilder');
//我们需要重载.$init() 代替 .$new()。 .$new() = .alloc() + .init()
StringBuilder.$init.overload('java.lang.String').implementation = function (arg) {
    var partial = "";
    var result = this.$init(arg);
    if (arg !== null) {
         partial = arg.toString().replace('\n', '').slice(0,10);
    }
    // console.log('new StringBuilder(java.lang.String); => ' + result)
    console.log('new StringBuilder("' + partial + '");')
    return result;
}

console.log('[+] new StringBuilder(java.lang.String) hooked');
