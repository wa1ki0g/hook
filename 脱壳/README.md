# 原项目作者及链接：
https://github.com/xiaokanghub/Frida-Android-unpack

https://github.com/hluwa/frida-dexdump


# pip
或者可以先直接pip install frida-dexdump安装，直接运行试一下

之后就可以直接利用
frida-dexdump -U -p 进程号

frida-dexdump -U -n APP名字 

frida-dexdump -U -f app报名 

进行脱壳，之后可以在frida-dexdump 目录下找到与APP名字对应的文件，里面就是脱壳生成的dex文件。
