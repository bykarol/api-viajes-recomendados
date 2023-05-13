const sharp = require('sharp');
const uuid = require('uuid');
const path = require('path');


const savePhoto = async (file) => {
    const img = sharp(file.data);
  
    const fileName = `${uuid.v4()}_${file.name}`;
  
    await img.toFile(
      path.join(__dirname, process.env.UPLOADS_DIRECTORY, fileName)
    );
  
    return fileName;
  };
  module.exports = savePhoto;