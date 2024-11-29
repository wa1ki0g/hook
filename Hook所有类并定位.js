setTimeout(function (){
  Java.perform(function (){
    console.log("n[*] enumerating classes...");
    //Java对象的API enumerateLoadedClasses
    Java.enumerateLoadedClasses({
      //该回调函数中的_className参数就是类的名称，每次回调时都会返回一个类的名称
      onMatch: function(_className){
        //在这里将其输出
        console.log("[*] found instance of '"+_className+"'");

        //如果只需要打印出com.roysue包下所有类把这段注释即可，想打印其他的替换掉indexOf中参数即可定位到~
        //if(_className.toString().indexOf("com.roysue")!=-1)
        //{
        //    console.log("[*] found instance of '"+_className+"'");
        //}
      },
      onComplete: function(){
        //会在枚举类结束之后回调一次此函数
        console.log("[*] class enuemration complete");
      }
    });
  });
});
