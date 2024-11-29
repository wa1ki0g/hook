var MainActivity = Java.use('ese.xposedtest.MainActivity');
//外部类 修改返回值
MainActivity.OutClass.implementation = function (arg) {
    var ret = this.OutClass(arg);
    console.log('Done:' + arg);
    return ret;
}
