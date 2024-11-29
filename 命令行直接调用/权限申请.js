Java.perform(function x() {

    console.log('重新加载脚本');

    var ActivityCompat = Java.use("android.app.Activity")
    ActivityCompat.requestPermissions.overload("[Ljava.lang.String;", "int")
        .implementation = function (permissions, requestCode) {
            console.log("requestPermissions 2 requestCode = " + requestCode + "  permissions = " + permissions)

            console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
            this.requestPermissions(permissions, requestCode)
        }
        
    var Fragment = Java.use("android.app.Fragment")
    Fragment.requestPermissions.implementation = function (permissions, code) {
        console.log('权限申请  android permissions = ' + permissions + "  code = " + code);
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));

        this.requestPermissions(permissions,code)
    }

    var Fragmentx = Java.use("androidx.fragment.app.Fragment")
    Fragmentx.requestPermissions.implementation = function (permissions, code) {
        console.log('权限申请 androidx permissions = ' + permissions + "  code = " + code);
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));

        this.requestPermissions(permissions,code)
    }
})

