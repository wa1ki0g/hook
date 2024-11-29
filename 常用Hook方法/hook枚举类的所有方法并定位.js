function enumMethods(targetClass)
{
    var hook = Java.use(targetClass);
    var ownMethods = hook.class.getDeclaredMethods();
    hook.$dispose;
    return ownMethods;
}

function hook_overload_5() {
    if(Java.available) {
        Java.perform(function () {
           var a = enumMethods("com.roysue.roysueapplication.User$clz")
           a.forEach(function(s) {
                console.log(s);
           });
        });
    }
}
