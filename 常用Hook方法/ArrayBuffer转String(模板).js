function ab2str(buf) {
    return new Uint16Array(buf)
    // encodedString = String.fromCodePoint.apply(null, new Uint16Array(buf));
    // // decodedString = encodeURI(encodedString);//没有这一步中文会乱码
    // // console.log(decodedString);
    // return encodedString
}
