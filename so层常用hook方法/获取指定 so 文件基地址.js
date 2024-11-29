function hook_module() {
    var baseAddr = Module.findBaseAddress("libnative-lib.so");
    console.log("baseAddr", baseAddr);
}
