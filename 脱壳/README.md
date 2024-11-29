# 原项目作者及链接：
https://github.com/xiaokanghub/Frida-Android-unpack

# Frida-Android-解压

此脚本适用于Android O和Android P，Android 7.X之后，在libart.so中已经找不到OpenMemory函数，所以旧的脚本失效了，我们找到了OpenCommon函数来代替它，通过这个函数我们可以获取dex文件，它的参数里面包含了dex的内存地址和大小。

# 运行环境

你需要一个 root 手机并且安装了 Frida
ro.debuggable = true

# 如何使用这个脚本？

frida -U -f com.xxx.xxx.xxx -l dupDex.js --no-pause
请修改“/data/data/com.jjwxc.reader/”

# 功能

art::DexFile::OpenCommon(unsigned char const*, unsigned long, std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&, unsigned int, art::OatDexFile const*, bool, bool, std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> >*, art::DexFile::VerifyResult*)

测试
腾讯
360
其他
