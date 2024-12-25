IRERPA 提供了一个持久化 Frida 脚本的能力，可以通过调用 Python 接口方便的将 js 脚本注入进程并保活脚本。使用非常简单，比如我们有下面这个 frida js 代码，他的作用是截获 okhttp 的响应并将数据提交出去。

Java.perform(function() {
        Java.use("com.android.okhttp.internal.http.HttpEngine").getResponse.implementation = function() {
                var res = this.getResponse()
                var data = {}
                data["url"] = res._request.value._url.value._url.value
                data["body"] = res.body().string()
                emit("report_data", JSON.stringify(data))
                return res
        }
})

然后调用如下的接口即可实现将脚本注入到应用进程，并将这个脚本截获到的数据提交到 10.1.1.1 服务器上的 redis 数据库。

app = d.application("com.android.settings")
app.attach_script(script, emit="redis://10.1.1.1/0 ", runtime=ScriptRuntime.RUNTIME_QJS, standup=5)

这里的 script 变量支持明文的 js 以及编译的 byte code，runtime 为对应的 runtime，默认为 qjs，frida 也支持 v8，standup 参数意思是仅在应用启动了 5 秒后再进行注入。
注入后，只要截获到 getResponse 调用，响应的数据就都会传输到 redis 的 report_data 队列里面，非常的方便。

同时，还支持将 frida 的 rpc.exports 方法导出作为 Python 接口调用，比如下面这个代码，定义了三个 rpc 方法，将这段代码注入到应用进程后。

Java.perform(function() {
rpc.exports = {
exampleFunc1: function (a, b) {
        return performRpcJVMCall(function() {
                var String = Java.use("java.lang.String")
                var msg = String.$new("Hello World").toString()
                return msg + ":" + a + b
        })
},
exampleFunc2: function (a, b) {
        return performRpcJVMCallOnMain(function() {
                var String = Java.use("java.lang.String")
                var msg = String.$new("Hello World").toString()
                return msg + ":" + a + b
        })
},
exampleFunc3: function (a, b) {
        return performRpcCall(function() {
                return a + b
        })
},
}
})

然后就可以像这样直接调用这个导出的方法，非常强大。

app = d.application("com.android.settings")
app.exampleFunc1("LAM", "DA")
