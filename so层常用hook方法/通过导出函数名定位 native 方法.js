function hook_func_from_exports(){
    var add_c_addr = Module.findExportByName("libnative-lib.so", "add_c");
    console.log("add_c_addr is :",add_c_addr);
}
