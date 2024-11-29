// 获取当前安卓设备的系统版本
var v = Java.androidVersion;
send('Version:' + v);

// 打印调用堆栈
function printstack()
{
 send(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
}
