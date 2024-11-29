Interceptor.attach(f, {
  onEnter: function (args) {
    console.log('RegisterNatives called from:\n' +
        Thread.backtrace(this.context, Backtracer.ACCURATE)
        .map(DebugSymbol.fromAddress).join('\n') + '\n');
  }
});
