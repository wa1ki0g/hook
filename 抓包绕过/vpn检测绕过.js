// 检测原理
// 判断网络接口名字包含ppp0或tun0
// 获取当前网络Transpoart字样

function hook_vpn(){
    Java.perform(function (){
        var String = Java.use("java.lang.String");
        var NetworkInterface = Java.use("java.net.NetworkInterface");
        NetworkInterface.getName.implementation = function (){
            var result = this.getName();
            console.log("find getName：", result);
            if (result && (result.indexOf("ppp0") > -1 || result.indexOf("tun0") > -1)){
                result = String.$new("rmnet_data0");
            }
            return result;
        }

        var ConnectivityManager = Java.use("android.net.ConnectivityManager");
        ConnectivityManager.getNetworkCapabilities.implementation = function (arg){
            var result = this.getNetworkCapabilities(arg);
            console.log("find getNetworkCapabilities：", result);
            return null;
        }
        Java.use("android.net.NetworkCapabilities").hasTransport.implementation = function(v){
            console.log(v)
            var res = this.hasTransport(v)
            console.log("res hasTransport ==> ", res)
            return false;
        }

    })
}

setImmediate(hook_vpn);
