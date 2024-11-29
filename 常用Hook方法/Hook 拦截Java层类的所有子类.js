//枚举所有已经加载的类
Java.enumerateLoadedClasses({
    onMatch: function(aClass) {
        //迭代和判断
        if (aClass.match(pattern)) {
            //做一些更多的判断，适配更多的pattern
            var className = aClass.match(/[L]?(.*);?/)[1].replace(///g, ".");
            //进入到traceClass里去
            traceClass(className);
        }
    },
    onComplete: function() {}
});
