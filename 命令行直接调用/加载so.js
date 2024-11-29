var System = Java.use("java.lang.System")
System.load.implementation = function (libname) {

    console.log('【System load = ' + libname);
    console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));

    this.load(libname)
}

System.loadLibrary.implementation = function (libname) {

    console.log('【System loadLibrary = ' + libname);
    console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));

    this.loadLibrary(libname)
}
