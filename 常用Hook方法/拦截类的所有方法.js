function traceClass(targetClass)
{
    //Java.use是新建一个对象哈，大家还记得么？
    var hook = Java.use(targetClass);
    //利用反射的方式，拿到当前类的所有方法
    var methods = hook.class.getDeclaredMethods();
    //建完对象之后记得将对象释放掉哈
    hook.$dispose;
    //将方法名保存到数组中
    var parsedMethods = [];
    methods.forEach(function(method) {
        //通过getName()方法获取函数名称
        parsedMethods.push(method.getName());
    });
    //去掉一些重复的值
    var targets = uniqBy(parsedMethods, JSON.stringify);
    //对数组中所有的方法进行hook
    targets.forEach(function(targetMethod) {
        traceMethod(targetClass + "." + targetMethod);
    });
}
function hook_overload_9() {
    if(Java.available) {
        Java.perform(function () {
            console.log("start hook");
            traceClass("com.roysue.roysueapplication.Ordinary_Class");
            console.log("hook end");
        });
    }
}
s1etImmediate(hook_overload_9);
