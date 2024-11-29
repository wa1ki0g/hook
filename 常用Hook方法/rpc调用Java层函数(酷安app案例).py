import frida, sys, codecs, os

# def adbforward():
#     os.system('adb forward tcp:27042 tcp:27042')
#     os.system('adb forward tcp:27043 tcp:27043')

# 酷安10.5.3版本 Frida_hook_rpc
jscode = """
rpc.exports = {
    //gethello 是自己定义的函数名，str是参数，根据实际传参,不要大写。
    gethello: function(str){
        send('hello');
        var sig = ''
        Java.perform(function(){
                //拿到软件里的context上下文信息  这是一个生命周期之后启动的类，启动后就可看到里面有上下文信息
                var currentApplication = Java.use('android.app.ActivityThread').currentApplication();
                var context = currentApplication.getApplicationContext();
                
                //软件的类名
                var AuthUtils = Java.use('com.coolapk.market.util.AuthUtils');
                //类下面的方法，传入的参数信息string类型 可以模拟传入
                sig = AuthUtils.getAS(context, str);
                send(sig);
        });
        return sig;
    }
}
"""


def on_message(message, data):
    if message['type'] == 'send':
        print("[*] {0}".format(message['payload']))
    else:
        print(message)


# Hook的软件包名
process = frida.get_remote_device().attach('com.coolapk.market')
script = process.create_script(jscode)
script.on('message', on_message)
print('[*] Running CTF')
script.load()
# 回调执行函数，传入模拟字段参数的信息
script.exports.gethello('fd017bd5ed4e942da40e5673')
# sys.stdin.read()

