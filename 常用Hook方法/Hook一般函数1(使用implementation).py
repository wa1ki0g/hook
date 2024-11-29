import frida, sys

# Hook软件的类名下的方法实现Hook 传入需要的参数 看方法是否有返回值  
bscode = """
Java.perform(
    function () {
        //获取当前安卓设备的系统版本
        var v=Java.androidVersion;
        send('Version:'+v);

        //打印调用堆栈
        function printstack() {
            send(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
        }

        //Hook软件包的类名为：com.myclass
        var myclass= Java.use('com.myclass');
        //调用Hook软件包类名下的方法：mymethod
        myclass.mymethod.implementation = function (bytearray) {
            send('com.myclass.mymethod.implementation');
            printstack();
            var ret = this.mymethod(bytearray);
            send("result:"+ret);
            return ret;
        }
    }
);
"""

def on_message(message, data):
    if message['type'] == 'send':
        print("[*] {0}".format(message['payload']))
    else:
        print(message)

process = frida.get_remote_device().attach('这里是包名') #Hook软件的包名
script = process.create_script(bscode)
script.on('message', on_message)
print('[*] Running CTF')
script.load()
sys.stdin.read()
