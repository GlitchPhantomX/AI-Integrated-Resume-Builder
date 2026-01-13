import ImageKit from '@imagekit/nodejs';

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KET, 
});

export default imageKit