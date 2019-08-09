const path = require('path')
const imagemin = require('imagemin')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')

module.exports = (imgPath, quality) => {
  return imagemin([imgPath], {
    destination: path.dirname(imgPath),
    plugins: [
      imageminJpegtran(),
      imageminPngquant({ quality })
    ]
  })
}
