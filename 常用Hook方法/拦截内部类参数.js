var inInnerClass = Java.use('ese.xposedtest.MainActivity$inInnerClass');

inInnerClass.methodInclass.implementation = function(){
    var arg0 = arguments[0];
    var arg1 = arguments[1];
    send("params1: "+ arg0 +" params2: " + arg1);
    return this.formInclass(1,"Frida");
}
