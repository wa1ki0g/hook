# Frida-Android-unpack
this script for Android O and Android P.After Android 7.X,we cann't get OpenMemory function in libart.so,so the old script failed.we find the OpenCommon function to replace it.we can get dex file from this func,its parameters contain the memory address and size of dex.<br>
## Runtime environment
u need a root mobile and installed Frida<br>
ro.debuggable = true<br>
## How to use this script?
frida -U -f com.xxx.xxx.xxx -l dupDex.js --no-pause<br>
Please modify the "/data/data/com.jjwxc.reader/"
## Function
```
art::DexFile::OpenCommon(unsigned char const*, unsigned long, std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&, unsigned int, art::OatDexFile const*, bool, bool, std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> >*, art::DexFile::VerifyResult*)
```
## Test
Tencent<br>
360<br>
others<br>
