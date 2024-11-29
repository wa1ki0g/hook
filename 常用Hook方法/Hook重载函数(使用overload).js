//如果一个类的两个方法具有相同的名称,您需要使用"重载"，若不知具体参数，出错会有提示的。
myClass.myMethod.overload().implementation = function(){
  // do sth
}

myClass.myMethod.overload("[B", "[B").implementation = function(param1, param2) {
  // do sth
}

myClass.myMethod.overload("android.context.Context", "boolean").implementation = function(param1, param2){
  // do sth
}
