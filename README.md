# Frida hook

之前收集到本地的一些frida下常用的hook脚本，如自吐算法，脱壳，过root、frida检测等等，收集的js中有些是自己写的，有些是收集用过的，还有些是收集了还没用的，后续有空将逐个去测试并去删掉一些不好用的


感谢所有分享的大佬们，侵权可提issue，这里会立马删掉的，欢迎对安卓sec感兴趣的大佬们来提交PR一起维护这个项目



# 下面是一个使用案例

一个通杀md5，sha，mac，des，3des，aes，rsa，数字签名 算法的hook脚本。


原理呢其实就是hook监控了一些加密库会调用到的底层函数。


例子：

这里还是以嘟嘟牛来举例子。登陆的数据包：


<img width="666" alt="image" src="https://user-images.githubusercontent.com/70200814/216800246-c881bfa6-39b1-4818-96a8-be124502c116.png">


这里可以看到登陆的请求数据包的内容的密文：

```xml
{"Encrypt":"NIszaqFPos1vd0pFqKlB42Np5itPxaNH\/\/FDsRnlBfgL4lcVxjXii\/UNcdXYMk0EYvcSRbr1TuoB\nsJgXGX8PVraEsOG990ViYRnY0aMqHtUpvZZdJeIQ\/OmD6Watu53ljmELISj4T8OaC3okf13vqPmz\n8+81YuNEjE+5eajFCE+9NtXfzsgPdNmS6+F14e0EgDIzPcjbCT0Bo900PH8nuvLecYmphBQp\n"}
```


我们看一下我们hook脚本监控到的内容，直接找到了明文密文与加密方式：

<img width="666" alt="image" src="https://user-images.githubusercontent.com/70200814/216800268-23a5f313-08f5-4132-9b8f-bf0b1c78c848.png">


明文内容：

```xml
{"equtype":"ANDROID","loginImei":"Androidnull","sign":"7623B263EB072D0182BD6B7C93470C0D","timeStamp":"1675347372942","userPwd":"gghhhhh","username":"15149029981"}
```

但是可以看到我们的sign字段是同样经过加密过的，密文为


```javascript
7623B263EB072D0182BD6B7C93470C0D
```

同样，我们去我们hook脚本监控到的内容中去找这段东西，也是找到了签名sign的明文和密文以及加密方式：



<img width="665" alt="image" src="https://user-images.githubusercontent.com/70200814/216800279-0bc0d71f-77ca-4a4b-ad2c-445712c6df19.png">


<img width="666" alt="image" src="https://user-images.githubusercontent.com/70200814/216800288-22e059b4-1bf6-4cea-b6ae-114e1cccc2dc.png">



这里使用了好几组登陆数据进行抓包，发现hook到的sign的中的key的字段的值是一个常量。接下来就可以去对数据进行伪造了。

app逆向的文章大部分为这个师傅收集的，项目原址：https://github.com/darbra/sperm  感谢大佬



