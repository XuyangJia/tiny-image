const path = require('path')
const fse = require('fs-extra')
const exts = ['.jpg', '.png']

/**
 * 检索目标文件夹中的所有文件，获取需要压缩的所有图片
 * @param {String} folder 目标文件夹
 */
const getImages = function (folder) {
  const arr = []
  const files = fse.readdirSync(folder)
  files.forEach(fn => {
    const data = fileFilter(path.join(folder, fn))
    if (Array.isArray(data)) {
      arr.push(...data)
    } else {
      data && arr.push(data)
    }
  })
  return arr
}

/**
   * 过滤符合压缩要求的文件
   * @param {String} fp 文件路径
   */
const fileFilter = function (fp) {
  const stats = fse.statSync(fp)
  if (
    stats.isFile() &&
    exts.includes(path.extname(fp))
  ) {
    return fp
  } else if (stats.isDirectory()) {
    return getImages(fp)
  }
}

module.exports = getImages
