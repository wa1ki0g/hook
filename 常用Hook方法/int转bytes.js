function intTobytes(n) {
  var bytes = [];
  for (var i = 0; i < 2; i++) {
    bytes[i] = n >> (8 - i * 8);
 
  }
  return bytes;
}
