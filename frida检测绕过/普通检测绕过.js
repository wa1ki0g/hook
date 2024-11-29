# 普通的检测总结以下几种手段：
# 检测/data/local/tmp下的frida特征文件，frida默认端口27042
# 双进程检测
# 检测/proc/pid/maps、/proc/pid/task/tid/stat、/proc/pid/fd中的frida特征
# 检测D-BUS
# 安卓系统使用Binder机制来实现进程间通信（IPC），而不是使用D-Bus。检测函数向所有端口发送d-bus消息，如果返回reject就说明fridaserver开启。

# 检测点说明：
# gmain：Frida 使用 Glib 库，其中的主事件循环被称为 GMainLoop。在 Frida 中，gmain 表示 GMainLoop 的线程。
# gdbus：GDBus 是 Glib 提供的一个用于 D-Bus 通信的库。在 Frida 中，gdbus 表示 GDBus 相关的线程。
# gum-js-loop：Gum 是 Frida 的运行时引擎，用于执行注入的 JavaScript 代码。gum-js-loop 表示 Gum 引擎执行 JavaScript 代码的线程。
# pool-frida：Frida 中的某些功能可能会使用线程池来处理任务，pool-frida 表示 Frida 中的线程池。
# linjector 是一种用于 Android 设备的开源工具，它允许用户在运行时向 Android 应用程序注入动态链接库（DLL）文件。通过注入 DLL 文件，用户可以修改应用程序的行为、调试应用程序、监视函数调用等，这在逆向工程、安全研究和动态分析中是非常有用的。


function replace_str() {
    var pt_strstr = Module.findExportByName("libc.so", 'strstr');
    var pt_strcmp = Module.findExportByName("libc.so", 'strcmp');
 
    Interceptor.attach(pt_strstr, {
        onEnter: function (args) {
            var str1 = args[0].readCString();
 
            var str2 = args[1].readCString();
            if (str2.indexOf("tmp") !== -1 ||
                str2.indexOf("frida") !== -1 ||
                str2.indexOf("gum-js-loop") !== -1 ||
                str2.indexOf("gmain") !== -1 ||
                str2.indexOf("gdbus") !== -1 ||
                str2.indexOf("pool-frida") !== -1||
                str2.indexOf("linjector") !== -1) {
                //console.log("strcmp-->", str1, str2);
                this.hook = true;
            }
        }, onLeave: function (retval) {
            if (this.hook) {
                retval.replace(0);
            }
        }
    });
 
    Interceptor.attach(pt_strcmp, {
        onEnter: function (args) {
            var str1 = args[0].readCString();
            var str2 = args[1].readCString();
            if (str2.indexOf("tmp") !== -1 ||
                str2.indexOf("frida") !== -1 ||
                str2.indexOf("gum-js-loop") !== -1 ||
                str2.indexOf("gmain") !== -1 ||
                str2.indexOf("gdbus") !== -1 ||
                str2.indexOf("pool-frida") !== -1||
                str2.indexOf("linjector") !== -1) {
                //console.log("strcmp-->", str1, str2);
                this.hook = true;
            }
        }, onLeave: function (retval) {
            if (this.hook) {
                retval.replace(0);
            }
        }
    })
 
}
 
replace_str();
