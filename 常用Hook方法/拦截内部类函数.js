function hook_overload_3() {
    if(Java.available) {
        Java.perform(function () {
            console.log("start hook");
            //注意此处类的路径填写更改所分析的路径
            var clz = Java.use('com.roysue.roysueapplication.User$clz');
            if(clz != undefined) {
                //这边也是像正常的函数来hook即可
                clz.toString.implementation = function (){
                    console.log("成功hook clz类");
                    return this.toString();
                }
            } else {
                console.log("clz: undefined");
            }
            console.log("start end");
        });
    }
}
