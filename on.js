let aa = {
  SongImage0: [
    {
      fieldname: 'SongImage0',
      originalname: '-001.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      buffer: ""
    }
  ],
  SongImage1: [
    {
      fieldname: 'SongImage1',
      originalname: '000-0.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      buffer:""
    }
  ],
  SongImage2: [
    {
      fieldname: 'SongImage1',
      originalname: '000-0.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      buffer:""
    }
  ],
  SongImage3: [
    {
      fieldname: 'SongImage1',
      originalname: '000-0.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      buffer:""
    }
  ],
  SongImage4: [
    {
      fieldname: 'SongImage1',
      originalname: '000-0.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      buffer:""
    }
  ]
}

// let allObj  = []
// for(va in aa){
//   allObj.push(aa[va][0]);
// }
// console.log(allObj)

var b = 1;
function outer(){
var b = 2
function inner(){
b++;
var b = 3;
console.log(b)
}
inner();
}
outer();

// function inner () {
//   var b;
//   b++;
//   b = 3;
//   console.log(b);
// }

// inner()