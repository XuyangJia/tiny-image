const path = require('path')
const getImages = require('./lib/getImages')
const root = 'E:\\meng52\\Client\\release\\web67' // 图片所在的路径
const compressImage = require('./lib/compressImage')
let excludeFiles = [
  'res\\atlas\\comp.png',
  'res\\atlas\\ui.png',
  'res\\atlas\\ui1.png',
  'res\\atlas\\ui2.png',
  'res\\atlas\\icon.png',
  'res\\atlas\\icon1.png',
  'res\\atlas\\science.png'
]
// 默认的压缩质量
const defaultQuality = [0.6, 0.8]

// 压缩质量需要特殊指出的目录
const specialMap = [
  {
    path: 'hero',
    quality: [0.8, 0.9]
  },
  {
    path: 'spine',
    quality: [0.8, 0.9]
  }
]

let imgsData = getImages(root)
excludeFiles = excludeFiles.map(file => path.resolve(root, file)) // 需要排除的文件

// 过滤掉需要排除的文件
imgsData = imgsData.filter(fp => {
  return !excludeFiles.includes(fp)
})

specialMap.forEach(data => {
  data.path = path.resolve(root, data.path)
})

imgsData.forEach(fp => {
  const special = specialMap.find(data => fp.includes(data.path))
  const quality = special ? special.quality : defaultQuality  
  fp = fp.replace(/\\/g, '/')
  compressImage(fp, quality).then(console.log, console.error)
})
