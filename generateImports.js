const fs = require('fs');
const gm = require('gm');
const sourceDir = '';
const destDir = '';
const dimentionsDir = '';

const file = new fs.createWriteStream('./images.js');

// get a list of all files in a directory
const getFiles = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, list) => {
      if (err) return reject(err);
      return resolve(list);
    });
  });
};

// TODO: generate watermarked images
// TODO: generate large images
// TODO: generate medium images
// TODO: generate small images
// TODO: generate thumbnails

// get the dimensions of a single image at a path
const getOneDim = (path) => {
  return new Promise((resolve, reject) => {
    gm(path)
      .size((err, size) => {
        if (err) return reject(err);
        resolve(size);
      })
  })
};

// get the dimentions of an array of images
const getDims = (path, images) => (
  Promise.all(
    images.map(image => (
      getOneDim(`${path}/${image}`)
        .then(size => ({
          filename: image,
          size,
        }))
    ))
  )
);

// generate image meta data for one image
const generateOneImgMeta = (metaObj) => {
  return {
    src: `${metaObj.filename.slice(0, -4)}_large`,
    thumbnail: `${metaObj.filename.slice(0, -4)}_medium`,
    thumbnailWidth: metaObj.size.width,
    thumbnailHeight: metaObj.size.height,
    caption: "INSERT_CAPTION"
  };
};

// generate image meta data for an array of images
const generateImgsMeta = (imagesMetaObj) => {
  return imagesMetaObj.map(imageMeta => (
    generateOneImgMeta(imageMeta)
  ))
};

// generate import statements
const generateOneImport = (imageId) => (
  `import ${imageId}_medium from '../../assets/images/gallery/highlights/medium/${imageId}.jpg';\n` +
  `import ${imageId}_large from '../../assets/images/gallery/highlights/large/${imageId}.jpg';\n\n`
);

const generateImports = (images) => (
  images
    .map(image => generateOneImport(image.filename.slice(0, -4)))
    .join('')
);

// main prog
getFiles('./highlights')
  .then(files => getDims('./watermarked/small', files))
  .then(imagesMeta => {
    file.write(
      generateImports(imagesMeta)
    );
    return imagesMeta;
  })
  .then(imagesMeta => (
    generateImgsMeta(imagesMeta)
  ))
  .then(meta => (
    file
      .write(
      `\nconst IMAGES=${
      JSON.stringify(meta, null, 2)
        .replace(/\"/g, '')
        .replace(/INSERT_CAPTION/g, '\"INSERT_CAPTION\"')
      };\n\nmodule.exports = { IMAGES }`
      )
  ))
  .then(() => file.end())
  .catch(err => console.log('THERE WAS AN ERROR!', err));
