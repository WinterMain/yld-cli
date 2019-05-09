const fs = require("fs")

function exists (dst) {
  //测试某个路径下文件是否存在
  var status = fs.existsSync(dst);
  if (!status) {
    fs.mkdirSync(dst);
  }
}

function copyDirSync (srcPath, targetPath) {
  exists(targetPath);
  var paths = fs.readdirSync(srcPath);

  paths.forEach(function (path) {
    var _src = srcPath + '/' + path;
    var _dst = targetPath + '/' + path;
    var readable;
    var writable;
    var st = fs.statSync(_src);

    if (st.isFile()) {
      readable = fs.createReadStream(_src); //创建读取流
      writable = fs.createWriteStream(_dst); //创建写入流
      readable.pipe(writable);
    } else if (st.isDirectory()) {
      exists(_dst);
      copyDirSync(_src, _dst);
    }
  });
}

module.exports = {
  copyDirSync: copyDirSync
};