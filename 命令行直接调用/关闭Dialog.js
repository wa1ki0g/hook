var Dialog = Java.use("android.app.Dialog")
Dialog.dismiss.implementation = function () {
    console.log("Dialog dismiss");
    console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));

    this.dismiss()
}
