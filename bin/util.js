const fs = require("fs")

function exists (dst) {
  // Check if the folder is exist.
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
    var st = fs.statSync(_src);

    if (st.isFile()) {
      fs.writeFileSync(_dst, fs.readFileSync(_src));
    } else if (st.isDirectory()) {
      exists(_dst);
      copyDirSync(_src, _dst);
    }
  });
}

module.exports = {
  copyDirSync: copyDirSync
};