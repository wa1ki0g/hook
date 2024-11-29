Java.perform(function () {
    var Instrumentation = Java.use('android.app.Instrumentation');
    //1
    Instrumentation.execStartActivity
        .overload(
            'android.content.Context',
            'android.os.IBinder',
            'android.os.IBinder',
            'android.app.Activity',
            'android.content.Intent',
            'int',
            'android.os.Bundle')
        .implementation =
        function (
            who, contextThread, token, target, intent, requestCode, options) {
            console.log(
                '【当前应用 1   Instrumentation】 启动 execStartActivity  intent = ' +
                intent);
            var pkg = intent.getPackage()
            console.log('pkg = ' + pkg)
            if (pkg != undefined && pkg != NULL && pkg == 'com.xiaomi.market') {
                intent.setPackage('com.heytap.market')
            }

            console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));

            return this.execStartActivity(
                who, contextThread, token, target, intent, requestCode, options);
        }

    //2
    Instrumentation.execStartActivity
        .overload(
            'android.content.Context',
            'android.os.IBinder',
            'android.os.IBinder',
            "java.lang.String",
            'android.content.Intent',
            'int',
            'android.os.Bundle')
        .implementation =
        function (
            who, contextThread, token, target, intent, requestCode, options) {
            console.log(
                '【当前应用 2   Instrumentation】 启动 execStartActivity  intent = ' +
                intent);
            var pkg = intent.getPackage()
            console.log('pkg = ' + pkg)
            if (pkg != undefined && pkg != NULL && pkg == 'com.xiaomi.market') {
                intent.setPackage('com.heytap.market')
            }

            console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));

            return this.execStartActivity(
                who, contextThread, token, target, intent, requestCode, options);
        }


    //3
    Instrumentation.execStartActivity
        .overload(
            'android.content.Context',
            'android.os.IBinder',
            'android.os.IBinder',
            "java.lang.String",
            'android.content.Intent',
            'int',
            'android.os.Bundle',
            "android.os.UserHandle"
        )
        .implementation =
        function (
            who, contextThread, token, resultWho, intent, requestCode, options, user) {
            console.log(
                '【当前应用 3   Instrumentation】 启动 execStartActivity  intent = ' +
                intent);
            var pkg = intent.getPackage()
            console.log('pkg = ' + pkg)
            if (pkg != undefined && pkg != NULL && pkg == 'com.xiaomi.market') {
                intent.setPackage('com.heytap.market')
            }

            console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));

            return this.execStartActivity(who, contextThread, token, resultWho, intent, requestCode, options, user)
        }

    Instrumentation.checkStartActivityResult.implementation = function (res, intent) {
        console.log('【checkStartActivityResult 启动  intent = ' + intent);

        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));

        return this.checkStartActivityResult(res, intent)
    }
})

