function main(){
    // get base address of target so;
    var libnative_lib_addr = Module.findBaseAddress("libnative-lib.so");
    console.log("base module addr ->", libnative_lib_addr);
    if (libnative_lib_addr){
        var add_addr1 = Module.findExportByName("libnative-lib.so", "_Z5r0addii");
        var add_addr2 = libnative_lib_addr.add(0x94B2 + 1); // 32位需要加1
        console.log(add_addr1);
        console.log(add_addr2);
    }

    // 主动调用
    var add1 = new NativeFunction(add_addr1, "int", ["int", "int"]);
    var add2 = new NativeFunction(add_addr2, "int", ["int", "int"]);

    console.log("add1 result is ->" + add1(10, 20));
    console.log("add2 result is ->" + add2(10, 20));

}

setImmediate(main);

/*
base module addr -> 0xd430b000
0xd43144b3
0xd43144b3
add1 result is ->30
add2 result is ->30
*/
