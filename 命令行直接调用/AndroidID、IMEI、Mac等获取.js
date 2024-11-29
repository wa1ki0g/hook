Java.perform(function x() {

    console.log('重新加载脚本');

    //androidid
    var ANDROID_ID = "android_id"
    var Secure = Java.use("android.provider.Settings$Secure")
    Secure.getString.implementation = function (resolver, name) {
        var result = this.getString(resolver, name);
        console.log("getString  name = " + name + " val =" + result)
        if (ANDROID_ID == name) {
            console.log("getString 获取 androidID")
            console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
        }
        return result;
    }

    var Secure = Java.use("android.provider.Settings$Secure")
    Secure.getStringForUser.implementation = function (resolver, name, userHandle) {
        var result = this.getStringForUser(resolver, name, userHandle);
        console.log("getStringForUser  name = " + name + " val =" + result)
        if (ANDROID_ID == name) {
            console.log("Secure getStringForUser 获取 androidID")
            console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
        }
        return result;
    }

    var Secure = Java.use("android.provider.Settings$System")
    Secure.getStringForUser.implementation = function (resolver, name, userHandle) {
        var result = this.getStringForUser(resolver, name, userHandle);
        console.log("System getStringForUser  name = " + name + " val =" + result)
        if (ANDROID_ID == name) {
            console.log("System getStringForUser 获取 androidID")
            console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
        }

        return result;
    }

    //获取 IMEI【卡槽】
    var TelephonyManager = Java.use("android.telephony.TelephonyManager")
    TelephonyManager.getDeviceId.overload("int").implementation = function (slotIndex) {
        var iemi = this.getDeviceId(slotIndex)
        console.log("TelephonyManager 获取 IMEI slotIndex = " + slotIndex + "  iemi = " + iemi)
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
        return iemi;
    }

    //获取 IMEI
    TelephonyManager.getDeviceId.overload().implementation = function () {
        var iemi = this.getDeviceId()
        console.log("TelephonyManager 获取 IMEI = " + iemi)
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
        return iemi;
    }

    //获取 Mac
    var NetworkInterface = Java.use("java.net.NetworkInterface")
    NetworkInterface.getHardwareAddress.implementation = function () {
        var mac = this.getHardwareAddress()
        console.log("NetworkInterface 获取 MAC = " + mac)
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
        return mac;
    }
    
    
    //OAID
    var OAID_LIST = ["com.bun.supplier.IdSupplier",
        "com.bun.miitmdid.provider.DefaultProvider",
        "com.bun.miitmdid.supplier.IdSupplier",
        "com.bun.miitmdid.interfaces.IdSupplier"]

    for (let index in OAID_LIST) {
        try {
            var oaid = Java.use(OAID_LIST[index])
            oaid.getOAID.implementation = function () {
                var result = this.getOAID()

                console.log('获取 oaid   = ' + result);
                console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
                return result
            }

        } catch (e) {

        }
    }
})
