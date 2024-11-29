import codecs
import frida
from time import sleep

# 附加进程名称为：com.roysue.roysueapplication
session = frida.get_remote_device().attach('com.roysue.roysueapplication')

# 这是需要执行的js脚本，rpc需要在js中定义
source = """
    //定义RPC
    rpc.exports = {
        //这里定义了一个给外部调用的方法：sms
        sms: function () {
            var result = "";
            //嵌入HOOK代码
            Java.perform(function () {
                //拿到class类
                var Ordinary_Class = Java.use("com.roysue.roysueapplication.Ordinary_Class");
                //最终rpc的sms方法会返回add(1,3)的结果！
                result = Ordinary_Class.add(1,3);
             });
            return result;
        },
    };
"""

# 创建js脚本
script = session.create_script(source)
script.load()

# 这里可以直接调用java中的函数
rpc = script.exports
# 在这里也就是python下直接通过rpc调用sms()方法
print(rpc.sms())
sleep(1)

session.detach()
