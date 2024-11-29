Java.perform(function () {
    var className = "android.util.Log";
    var Log = Java.use(className);
    // Hook Log.d() 方法
   Log.d.overload('java.lang.String','java.lang.String').implementation = function(tag,msg) {
      console.log(tag+'_hook',msg);
      return this.d(tag+'_hook', msg);
   };

   // Hook Log.e() 方法
   Log.e.overload('java.lang.String','java.lang.String').implementation = function(tag,msg) {
      console.log(tag+'_hook',msg);
      return this.e(tag+'_hook', msg);
   };
});

