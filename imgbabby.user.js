// ==UserScript==
// @id             Imgbabby@such-doge
// @name           Imgbabby
// @namespace      https://github.com/such-doge/user-scripts
// @author         such-doge
// @version        1.0
// @description    There's a special place in hell for image hosts that encrypt the access token.
// @homepageURL    https://github.com/such-doge/user-scripts
// @icon           http://i.imgur.com/HRkC29b.png
// @icon64         http://i.imgur.com/wG4rTur.png
// @include        *://www.imgbabes.com/*
// @include        *://www.imgflare.com/*
// @grant          none
// @updateVersion  1
// @run-at         document-end
// ==/UserScript==

/*
Please note that the first chunk of this code is from the slowAES project,
which may be found at

    https://code.google.com/archive/p/slowaes/ 

It is licensed under the Apache 2.0 License which you may read at

    http://www.apache.org/licenses/LICENSE-2.0

*/


var slowAES = {
   /*
    * START AES SECTION
    */
   aes:{
      // structure of valid key sizes
      keySize:{
         SIZE_128:16,
         SIZE_192:24,
         SIZE_256:32
      },
      
      // Rijndael S-box
      sbox:[
      0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
      0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
      0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
      0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
      0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
      0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
      0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
      0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
      0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
      0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
      0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
      0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
      0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
      0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
      0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
      0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16 ],
      
      // Rijndael Inverted S-box
      rsbox:
      [ 0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb
      , 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb
      , 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e
      , 0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25
      , 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92
      , 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84
      , 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06
      , 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b
      , 0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73
      , 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e
      , 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b
      , 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4
      , 0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f
      , 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef
      , 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61
      , 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d ],
      
      /* rotate the word eight bits to the left */
      rotate:function(word)
      {
         var c = word[0];
         for (var i = 0; i < 3; i++)
            word[i] = word[i+1];
         word[3] = c;
         
         return word;
      },
      
      // Rijndael Rcon
      Rcon:[
      0x8d, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8,
      0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3,
      0x7d, 0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f,
      0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d,
      0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab,
      0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d,
      0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25,
      0x4a, 0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d, 0x01,
      0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d,
      0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa,
      0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25, 0x4a,
      0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02,
      0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a,
      0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef,
      0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94,
      0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02, 0x04,
      0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f,
      0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5,
      0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94, 0x33,
      0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb ],

      G2X: [
      0x00, 0x02, 0x04, 0x06, 0x08, 0x0a, 0x0c, 0x0e, 0x10, 0x12, 0x14, 0x16,
      0x18, 0x1a, 0x1c, 0x1e, 0x20, 0x22, 0x24, 0x26, 0x28, 0x2a, 0x2c, 0x2e,
      0x30, 0x32, 0x34, 0x36, 0x38, 0x3a, 0x3c, 0x3e, 0x40, 0x42, 0x44, 0x46,
      0x48, 0x4a, 0x4c, 0x4e, 0x50, 0x52, 0x54, 0x56, 0x58, 0x5a, 0x5c, 0x5e,
      0x60, 0x62, 0x64, 0x66, 0x68, 0x6a, 0x6c, 0x6e, 0x70, 0x72, 0x74, 0x76,
      0x78, 0x7a, 0x7c, 0x7e, 0x80, 0x82, 0x84, 0x86, 0x88, 0x8a, 0x8c, 0x8e,
      0x90, 0x92, 0x94, 0x96, 0x98, 0x9a, 0x9c, 0x9e, 0xa0, 0xa2, 0xa4, 0xa6,
      0xa8, 0xaa, 0xac, 0xae, 0xb0, 0xb2, 0xb4, 0xb6, 0xb8, 0xba, 0xbc, 0xbe,
      0xc0, 0xc2, 0xc4, 0xc6, 0xc8, 0xca, 0xcc, 0xce, 0xd0, 0xd2, 0xd4, 0xd6,
      0xd8, 0xda, 0xdc, 0xde, 0xe0, 0xe2, 0xe4, 0xe6, 0xe8, 0xea, 0xec, 0xee,
      0xf0, 0xf2, 0xf4, 0xf6, 0xf8, 0xfa, 0xfc, 0xfe, 0x1b, 0x19, 0x1f, 0x1d,
      0x13, 0x11, 0x17, 0x15, 0x0b, 0x09, 0x0f, 0x0d, 0x03, 0x01, 0x07, 0x05,
      0x3b, 0x39, 0x3f, 0x3d, 0x33, 0x31, 0x37, 0x35, 0x2b, 0x29, 0x2f, 0x2d,
      0x23, 0x21, 0x27, 0x25, 0x5b, 0x59, 0x5f, 0x5d, 0x53, 0x51, 0x57, 0x55,
      0x4b, 0x49, 0x4f, 0x4d, 0x43, 0x41, 0x47, 0x45, 0x7b, 0x79, 0x7f, 0x7d,
      0x73, 0x71, 0x77, 0x75, 0x6b, 0x69, 0x6f, 0x6d, 0x63, 0x61, 0x67, 0x65,
      0x9b, 0x99, 0x9f, 0x9d, 0x93, 0x91, 0x97, 0x95, 0x8b, 0x89, 0x8f, 0x8d,
      0x83, 0x81, 0x87, 0x85, 0xbb, 0xb9, 0xbf, 0xbd, 0xb3, 0xb1, 0xb7, 0xb5,
      0xab, 0xa9, 0xaf, 0xad, 0xa3, 0xa1, 0xa7, 0xa5, 0xdb, 0xd9, 0xdf, 0xdd,
      0xd3, 0xd1, 0xd7, 0xd5, 0xcb, 0xc9, 0xcf, 0xcd, 0xc3, 0xc1, 0xc7, 0xc5,
      0xfb, 0xf9, 0xff, 0xfd, 0xf3, 0xf1, 0xf7, 0xf5, 0xeb, 0xe9, 0xef, 0xed,
      0xe3, 0xe1, 0xe7, 0xe5
      ],

      G3X: [
      0x00, 0x03, 0x06, 0x05, 0x0c, 0x0f, 0x0a, 0x09, 0x18, 0x1b, 0x1e, 0x1d,
      0x14, 0x17, 0x12, 0x11, 0x30, 0x33, 0x36, 0x35, 0x3c, 0x3f, 0x3a, 0x39,
      0x28, 0x2b, 0x2e, 0x2d, 0x24, 0x27, 0x22, 0x21, 0x60, 0x63, 0x66, 0x65,
      0x6c, 0x6f, 0x6a, 0x69, 0x78, 0x7b, 0x7e, 0x7d, 0x74, 0x77, 0x72, 0x71,
      0x50, 0x53, 0x56, 0x55, 0x5c, 0x5f, 0x5a, 0x59, 0x48, 0x4b, 0x4e, 0x4d,
      0x44, 0x47, 0x42, 0x41, 0xc0, 0xc3, 0xc6, 0xc5, 0xcc, 0xcf, 0xca, 0xc9,
      0xd8, 0xdb, 0xde, 0xdd, 0xd4, 0xd7, 0xd2, 0xd1, 0xf0, 0xf3, 0xf6, 0xf5,
      0xfc, 0xff, 0xfa, 0xf9, 0xe8, 0xeb, 0xee, 0xed, 0xe4, 0xe7, 0xe2, 0xe1,
      0xa0, 0xa3, 0xa6, 0xa5, 0xac, 0xaf, 0xaa, 0xa9, 0xb8, 0xbb, 0xbe, 0xbd,
      0xb4, 0xb7, 0xb2, 0xb1, 0x90, 0x93, 0x96, 0x95, 0x9c, 0x9f, 0x9a, 0x99,
      0x88, 0x8b, 0x8e, 0x8d, 0x84, 0x87, 0x82, 0x81, 0x9b, 0x98, 0x9d, 0x9e,
      0x97, 0x94, 0x91, 0x92, 0x83, 0x80, 0x85, 0x86, 0x8f, 0x8c, 0x89, 0x8a,
      0xab, 0xa8, 0xad, 0xae, 0xa7, 0xa4, 0xa1, 0xa2, 0xb3, 0xb0, 0xb5, 0xb6,
      0xbf, 0xbc, 0xb9, 0xba, 0xfb, 0xf8, 0xfd, 0xfe, 0xf7, 0xf4, 0xf1, 0xf2,
      0xe3, 0xe0, 0xe5, 0xe6, 0xef, 0xec, 0xe9, 0xea, 0xcb, 0xc8, 0xcd, 0xce,
      0xc7, 0xc4, 0xc1, 0xc2, 0xd3, 0xd0, 0xd5, 0xd6, 0xdf, 0xdc, 0xd9, 0xda,
      0x5b, 0x58, 0x5d, 0x5e, 0x57, 0x54, 0x51, 0x52, 0x43, 0x40, 0x45, 0x46,
      0x4f, 0x4c, 0x49, 0x4a, 0x6b, 0x68, 0x6d, 0x6e, 0x67, 0x64, 0x61, 0x62,
      0x73, 0x70, 0x75, 0x76, 0x7f, 0x7c, 0x79, 0x7a, 0x3b, 0x38, 0x3d, 0x3e,
      0x37, 0x34, 0x31, 0x32, 0x23, 0x20, 0x25, 0x26, 0x2f, 0x2c, 0x29, 0x2a,
      0x0b, 0x08, 0x0d, 0x0e, 0x07, 0x04, 0x01, 0x02, 0x13, 0x10, 0x15, 0x16,
      0x1f, 0x1c, 0x19, 0x1a
      ],

      G9X: [
      0x00, 0x09, 0x12, 0x1b, 0x24, 0x2d, 0x36, 0x3f, 0x48, 0x41, 0x5a, 0x53,
      0x6c, 0x65, 0x7e, 0x77, 0x90, 0x99, 0x82, 0x8b, 0xb4, 0xbd, 0xa6, 0xaf,
      0xd8, 0xd1, 0xca, 0xc3, 0xfc, 0xf5, 0xee, 0xe7, 0x3b, 0x32, 0x29, 0x20,
      0x1f, 0x16, 0x0d, 0x04, 0x73, 0x7a, 0x61, 0x68, 0x57, 0x5e, 0x45, 0x4c,
      0xab, 0xa2, 0xb9, 0xb0, 0x8f, 0x86, 0x9d, 0x94, 0xe3, 0xea, 0xf1, 0xf8,
      0xc7, 0xce, 0xd5, 0xdc, 0x76, 0x7f, 0x64, 0x6d, 0x52, 0x5b, 0x40, 0x49,
      0x3e, 0x37, 0x2c, 0x25, 0x1a, 0x13, 0x08, 0x01, 0xe6, 0xef, 0xf4, 0xfd,
      0xc2, 0xcb, 0xd0, 0xd9, 0xae, 0xa7, 0xbc, 0xb5, 0x8a, 0x83, 0x98, 0x91,
      0x4d, 0x44, 0x5f, 0x56, 0x69, 0x60, 0x7b, 0x72, 0x05, 0x0c, 0x17, 0x1e,
      0x21, 0x28, 0x33, 0x3a, 0xdd, 0xd4, 0xcf, 0xc6, 0xf9, 0xf0, 0xeb, 0xe2,
      0x95, 0x9c, 0x87, 0x8e, 0xb1, 0xb8, 0xa3, 0xaa, 0xec, 0xe5, 0xfe, 0xf7,
      0xc8, 0xc1, 0xda, 0xd3, 0xa4, 0xad, 0xb6, 0xbf, 0x80, 0x89, 0x92, 0x9b,
      0x7c, 0x75, 0x6e, 0x67, 0x58, 0x51, 0x4a, 0x43, 0x34, 0x3d, 0x26, 0x2f,
      0x10, 0x19, 0x02, 0x0b, 0xd7, 0xde, 0xc5, 0xcc, 0xf3, 0xfa, 0xe1, 0xe8,
      0x9f, 0x96, 0x8d, 0x84, 0xbb, 0xb2, 0xa9, 0xa0, 0x47, 0x4e, 0x55, 0x5c,
      0x63, 0x6a, 0x71, 0x78, 0x0f, 0x06, 0x1d, 0x14, 0x2b, 0x22, 0x39, 0x30,
      0x9a, 0x93, 0x88, 0x81, 0xbe, 0xb7, 0xac, 0xa5, 0xd2, 0xdb, 0xc0, 0xc9,
      0xf6, 0xff, 0xe4, 0xed, 0x0a, 0x03, 0x18, 0x11, 0x2e, 0x27, 0x3c, 0x35,
      0x42, 0x4b, 0x50, 0x59, 0x66, 0x6f, 0x74, 0x7d, 0xa1, 0xa8, 0xb3, 0xba,
      0x85, 0x8c, 0x97, 0x9e, 0xe9, 0xe0, 0xfb, 0xf2, 0xcd, 0xc4, 0xdf, 0xd6,
      0x31, 0x38, 0x23, 0x2a, 0x15, 0x1c, 0x07, 0x0e, 0x79, 0x70, 0x6b, 0x62,
      0x5d, 0x54, 0x4f, 0x46
      ],

      GBX: [
      0x00, 0x0b, 0x16, 0x1d, 0x2c, 0x27, 0x3a, 0x31, 0x58, 0x53, 0x4e, 0x45,
      0x74, 0x7f, 0x62, 0x69, 0xb0, 0xbb, 0xa6, 0xad, 0x9c, 0x97, 0x8a, 0x81,
      0xe8, 0xe3, 0xfe, 0xf5, 0xc4, 0xcf, 0xd2, 0xd9, 0x7b, 0x70, 0x6d, 0x66,
      0x57, 0x5c, 0x41, 0x4a, 0x23, 0x28, 0x35, 0x3e, 0x0f, 0x04, 0x19, 0x12,
      0xcb, 0xc0, 0xdd, 0xd6, 0xe7, 0xec, 0xf1, 0xfa, 0x93, 0x98, 0x85, 0x8e,
      0xbf, 0xb4, 0xa9, 0xa2, 0xf6, 0xfd, 0xe0, 0xeb, 0xda, 0xd1, 0xcc, 0xc7,
      0xae, 0xa5, 0xb8, 0xb3, 0x82, 0x89, 0x94, 0x9f, 0x46, 0x4d, 0x50, 0x5b,
      0x6a, 0x61, 0x7c, 0x77, 0x1e, 0x15, 0x08, 0x03, 0x32, 0x39, 0x24, 0x2f,
      0x8d, 0x86, 0x9b, 0x90, 0xa1, 0xaa, 0xb7, 0xbc, 0xd5, 0xde, 0xc3, 0xc8,
      0xf9, 0xf2, 0xef, 0xe4, 0x3d, 0x36, 0x2b, 0x20, 0x11, 0x1a, 0x07, 0x0c,
      0x65, 0x6e, 0x73, 0x78, 0x49, 0x42, 0x5f, 0x54, 0xf7, 0xfc, 0xe1, 0xea,
      0xdb, 0xd0, 0xcd, 0xc6, 0xaf, 0xa4, 0xb9, 0xb2, 0x83, 0x88, 0x95, 0x9e,
      0x47, 0x4c, 0x51, 0x5a, 0x6b, 0x60, 0x7d, 0x76, 0x1f, 0x14, 0x09, 0x02,
      0x33, 0x38, 0x25, 0x2e, 0x8c, 0x87, 0x9a, 0x91, 0xa0, 0xab, 0xb6, 0xbd,
      0xd4, 0xdf, 0xc2, 0xc9, 0xf8, 0xf3, 0xee, 0xe5, 0x3c, 0x37, 0x2a, 0x21,
      0x10, 0x1b, 0x06, 0x0d, 0x64, 0x6f, 0x72, 0x79, 0x48, 0x43, 0x5e, 0x55,
      0x01, 0x0a, 0x17, 0x1c, 0x2d, 0x26, 0x3b, 0x30, 0x59, 0x52, 0x4f, 0x44,
      0x75, 0x7e, 0x63, 0x68, 0xb1, 0xba, 0xa7, 0xac, 0x9d, 0x96, 0x8b, 0x80,
      0xe9, 0xe2, 0xff, 0xf4, 0xc5, 0xce, 0xd3, 0xd8, 0x7a, 0x71, 0x6c, 0x67,
      0x56, 0x5d, 0x40, 0x4b, 0x22, 0x29, 0x34, 0x3f, 0x0e, 0x05, 0x18, 0x13,
      0xca, 0xc1, 0xdc, 0xd7, 0xe6, 0xed, 0xf0, 0xfb, 0x92, 0x99, 0x84, 0x8f,
      0xbe, 0xb5, 0xa8, 0xa3
      ],

      GDX: [
      0x00, 0x0d, 0x1a, 0x17, 0x34, 0x39, 0x2e, 0x23, 0x68, 0x65, 0x72, 0x7f,
      0x5c, 0x51, 0x46, 0x4b, 0xd0, 0xdd, 0xca, 0xc7, 0xe4, 0xe9, 0xfe, 0xf3,
      0xb8, 0xb5, 0xa2, 0xaf, 0x8c, 0x81, 0x96, 0x9b, 0xbb, 0xb6, 0xa1, 0xac,
      0x8f, 0x82, 0x95, 0x98, 0xd3, 0xde, 0xc9, 0xc4, 0xe7, 0xea, 0xfd, 0xf0,
      0x6b, 0x66, 0x71, 0x7c, 0x5f, 0x52, 0x45, 0x48, 0x03, 0x0e, 0x19, 0x14,
      0x37, 0x3a, 0x2d, 0x20, 0x6d, 0x60, 0x77, 0x7a, 0x59, 0x54, 0x43, 0x4e,
      0x05, 0x08, 0x1f, 0x12, 0x31, 0x3c, 0x2b, 0x26, 0xbd, 0xb0, 0xa7, 0xaa,
      0x89, 0x84, 0x93, 0x9e, 0xd5, 0xd8, 0xcf, 0xc2, 0xe1, 0xec, 0xfb, 0xf6,
      0xd6, 0xdb, 0xcc, 0xc1, 0xe2, 0xef, 0xf8, 0xf5, 0xbe, 0xb3, 0xa4, 0xa9,
      0x8a, 0x87, 0x90, 0x9d, 0x06, 0x0b, 0x1c, 0x11, 0x32, 0x3f, 0x28, 0x25,
      0x6e, 0x63, 0x74, 0x79, 0x5a, 0x57, 0x40, 0x4d, 0xda, 0xd7, 0xc0, 0xcd,
      0xee, 0xe3, 0xf4, 0xf9, 0xb2, 0xbf, 0xa8, 0xa5, 0x86, 0x8b, 0x9c, 0x91,
      0x0a, 0x07, 0x10, 0x1d, 0x3e, 0x33, 0x24, 0x29, 0x62, 0x6f, 0x78, 0x75,
      0x56, 0x5b, 0x4c, 0x41, 0x61, 0x6c, 0x7b, 0x76, 0x55, 0x58, 0x4f, 0x42,
      0x09, 0x04, 0x13, 0x1e, 0x3d, 0x30, 0x27, 0x2a, 0xb1, 0xbc, 0xab, 0xa6,
      0x85, 0x88, 0x9f, 0x92, 0xd9, 0xd4, 0xc3, 0xce, 0xed, 0xe0, 0xf7, 0xfa,
      0xb7, 0xba, 0xad, 0xa0, 0x83, 0x8e, 0x99, 0x94, 0xdf, 0xd2, 0xc5, 0xc8,
      0xeb, 0xe6, 0xf1, 0xfc, 0x67, 0x6a, 0x7d, 0x70, 0x53, 0x5e, 0x49, 0x44,
      0x0f, 0x02, 0x15, 0x18, 0x3b, 0x36, 0x21, 0x2c, 0x0c, 0x01, 0x16, 0x1b,
      0x38, 0x35, 0x22, 0x2f, 0x64, 0x69, 0x7e, 0x73, 0x50, 0x5d, 0x4a, 0x47,
      0xdc, 0xd1, 0xc6, 0xcb, 0xe8, 0xe5, 0xf2, 0xff, 0xb4, 0xb9, 0xae, 0xa3,
      0x80, 0x8d, 0x9a, 0x97
      ],

      GEX: [
      0x00, 0x0e, 0x1c, 0x12, 0x38, 0x36, 0x24, 0x2a, 0x70, 0x7e, 0x6c, 0x62,
      0x48, 0x46, 0x54, 0x5a, 0xe0, 0xee, 0xfc, 0xf2, 0xd8, 0xd6, 0xc4, 0xca,
      0x90, 0x9e, 0x8c, 0x82, 0xa8, 0xa6, 0xb4, 0xba, 0xdb, 0xd5, 0xc7, 0xc9,
      0xe3, 0xed, 0xff, 0xf1, 0xab, 0xa5, 0xb7, 0xb9, 0x93, 0x9d, 0x8f, 0x81,
      0x3b, 0x35, 0x27, 0x29, 0x03, 0x0d, 0x1f, 0x11, 0x4b, 0x45, 0x57, 0x59,
      0x73, 0x7d, 0x6f, 0x61, 0xad, 0xa3, 0xb1, 0xbf, 0x95, 0x9b, 0x89, 0x87,
      0xdd, 0xd3, 0xc1, 0xcf, 0xe5, 0xeb, 0xf9, 0xf7, 0x4d, 0x43, 0x51, 0x5f,
      0x75, 0x7b, 0x69, 0x67, 0x3d, 0x33, 0x21, 0x2f, 0x05, 0x0b, 0x19, 0x17,
      0x76, 0x78, 0x6a, 0x64, 0x4e, 0x40, 0x52, 0x5c, 0x06, 0x08, 0x1a, 0x14,
      0x3e, 0x30, 0x22, 0x2c, 0x96, 0x98, 0x8a, 0x84, 0xae, 0xa0, 0xb2, 0xbc,
      0xe6, 0xe8, 0xfa, 0xf4, 0xde, 0xd0, 0xc2, 0xcc, 0x41, 0x4f, 0x5d, 0x53,
      0x79, 0x77, 0x65, 0x6b, 0x31, 0x3f, 0x2d, 0x23, 0x09, 0x07, 0x15, 0x1b,
      0xa1, 0xaf, 0xbd, 0xb3, 0x99, 0x97, 0x85, 0x8b, 0xd1, 0xdf, 0xcd, 0xc3,
      0xe9, 0xe7, 0xf5, 0xfb, 0x9a, 0x94, 0x86, 0x88, 0xa2, 0xac, 0xbe, 0xb0,
      0xea, 0xe4, 0xf6, 0xf8, 0xd2, 0xdc, 0xce, 0xc0, 0x7a, 0x74, 0x66, 0x68,
      0x42, 0x4c, 0x5e, 0x50, 0x0a, 0x04, 0x16, 0x18, 0x32, 0x3c, 0x2e, 0x20,
      0xec, 0xe2, 0xf0, 0xfe, 0xd4, 0xda, 0xc8, 0xc6, 0x9c, 0x92, 0x80, 0x8e,
      0xa4, 0xaa, 0xb8, 0xb6, 0x0c, 0x02, 0x10, 0x1e, 0x34, 0x3a, 0x28, 0x26,
      0x7c, 0x72, 0x60, 0x6e, 0x44, 0x4a, 0x58, 0x56, 0x37, 0x39, 0x2b, 0x25,
      0x0f, 0x01, 0x13, 0x1d, 0x47, 0x49, 0x5b, 0x55, 0x7f, 0x71, 0x63, 0x6d,
      0xd7, 0xd9, 0xcb, 0xc5, 0xef, 0xe1, 0xf3, 0xfd, 0xa7, 0xa9, 0xbb, 0xb5,
      0x9f, 0x91, 0x83, 0x8d
      ],
      
      // Key Schedule Core
      core:function(word,iteration)
      {
         /* rotate the 32-bit word 8 bits to the left */
         word = this.rotate(word);
         /* apply S-Box substitution on all 4 parts of the 32-bit word */
         for (var i = 0; i < 4; ++i)
            word[i] = this.sbox[word[i]];
         /* XOR the output of the rcon operation with i to the first part (leftmost) only */
         word[0] = word[0]^this.Rcon[iteration];
         return word;
      },
      
      /* Rijndael's key expansion
       * expands an 128,192,256 key into an 176,208,240 bytes key
       *
       * expandedKey is a pointer to an char array of large enough size
       * key is a pointer to a non-expanded key
       */
      expandKey:function(key,size)
      {
         var expandedKeySize = (16*(this.numberOfRounds(size)+1));
         
         /* current expanded keySize, in bytes */
         var currentSize = 0;
         var rconIteration = 1;
         var t = [];   // temporary 4-byte variable
         
         var expandedKey = [];
         for(var i = 0;i < expandedKeySize;i++)
            expandedKey[i] = 0;
      
         /* set the 16,24,32 bytes of the expanded key to the input key */
         for (var j = 0; j < size; j++)
            expandedKey[j] = key[j];
         currentSize += size;
      
         while (currentSize < expandedKeySize)
         {
            /* assign the previous 4 bytes to the temporary value t */
            for (var k = 0; k < 4; k++)
               t[k] = expandedKey[(currentSize - 4) + k];
      
            /* every 16,24,32 bytes we apply the core schedule to t
             * and increment rconIteration afterwards
             */
            if(currentSize % size == 0)
               t = this.core(t, rconIteration++);
      
            /* For 256-bit keys, we add an extra sbox to the calculation */
            if(size == this.keySize.SIZE_256 && ((currentSize % size) == 16))
               for(var l = 0; l < 4; l++)
                  t[l] = this.sbox[t[l]];
      
            /* We XOR t with the four-byte block 16,24,32 bytes before the new expanded key.
             * This becomes the next four bytes in the expanded key.
             */
            for(var m = 0; m < 4; m++) {
               expandedKey[currentSize] = expandedKey[currentSize - size] ^ t[m];
               currentSize++;
            }
         }
         return expandedKey;
      },
      
      // Adds (XORs) the round key to the state
      addRoundKey:function(state,roundKey)
      {
         for (var i = 0; i < 16; i++)
            state[i] ^= roundKey[i];
         return state;
      },
      
      // Creates a round key from the given expanded key and the
      // position within the expanded key.
      createRoundKey:function(expandedKey,roundKeyPointer)
      {
         var roundKey = [];
         for (var i = 0; i < 4; i++)
            for (var j = 0; j < 4; j++)
               roundKey[j*4+i] = expandedKey[roundKeyPointer + i*4 + j];
         return roundKey;
      },
      
      /* substitute all the values from the state with the value in the SBox
       * using the state value as index for the SBox
       */
      subBytes:function(state,isInv)
      {
         for (var i = 0; i < 16; i++)
            state[i] = isInv?this.rsbox[state[i]]:this.sbox[state[i]];
         return state;
      },
      
      /* iterate over the 4 rows and call shiftRow() with that row */
      shiftRows:function(state,isInv)
      {
         for (var i = 0; i < 4; i++)
            state = this.shiftRow(state,i*4, i,isInv);
         return state;
      },
      
      /* each iteration shifts the row to the left by 1 */
      shiftRow:function(state,statePointer,nbr,isInv)
      {
         for (var i = 0; i < nbr; i++)
         {
            if(isInv)
            {
               var tmp = state[statePointer + 3];
               for (var j = 3; j > 0; j--)
                  state[statePointer + j] = state[statePointer + j-1];
               state[statePointer] = tmp;
            }
            else
            {
               var tmp = state[statePointer];
               for (var j = 0; j < 3; j++)
                  state[statePointer + j] = state[statePointer + j+1];
               state[statePointer + 3] = tmp;
            }
         }
         return state;
      },

      // galois multiplication of 8 bit characters a and b
      galois_multiplication:function(a,b)
      {
         var p = 0;
         for(var counter = 0; counter < 8; counter++)
         {
            if((b & 1) == 1)
               p ^= a;
            if(p > 0x100) p ^= 0x100;
            var hi_bit_set = (a & 0x80); //keep p 8 bit
            a <<= 1;
            if(a > 0x100) a ^= 0x100; //keep a 8 bit
            if(hi_bit_set == 0x80)
               a ^= 0x1b;
            if(a > 0x100) a ^= 0x100; //keep a 8 bit
            b >>= 1;
            if(b > 0x100) b ^= 0x100; //keep b 8 bit
         }
         return p;
      },
      
      // galois multipication of the 4x4 matrix
      mixColumns:function(state,isInv)
      {
         var column = [];
         /* iterate over the 4 columns */
         for (var i = 0; i < 4; i++)
         {
            /* construct one column by iterating over the 4 rows */
            for (var j = 0; j < 4; j++)
               column[j] = state[(j*4)+i];
            /* apply the mixColumn on one column */
            column = this.mixColumn(column,isInv);
            /* put the values back into the state */
            for (var k = 0; k < 4; k++)
               state[(k*4)+i] = column[k];
         }
         return state;
      },

      // galois multipication of 1 column of the 4x4 matrix
      mixColumn:function(column,isInv)
      {
         var mult = []; 
         if(isInv)
            mult = [14,9,13,11];
         else
            mult = [2,1,1,3];
         var cpy = [];
         for(var i = 0; i < 4; i++)
            cpy[i] = column[i];
         
         column[0] =    this.galois_multiplication(cpy[0],mult[0]) ^
               this.galois_multiplication(cpy[3],mult[1]) ^
               this.galois_multiplication(cpy[2],mult[2]) ^
               this.galois_multiplication(cpy[1],mult[3]);
         column[1] =    this.galois_multiplication(cpy[1],mult[0]) ^
               this.galois_multiplication(cpy[0],mult[1]) ^
               this.galois_multiplication(cpy[3],mult[2]) ^
               this.galois_multiplication(cpy[2],mult[3]);
         column[2] =    this.galois_multiplication(cpy[2],mult[0]) ^
               this.galois_multiplication(cpy[1],mult[1]) ^
               this.galois_multiplication(cpy[0],mult[2]) ^
               this.galois_multiplication(cpy[3],mult[3]);
         column[3] =    this.galois_multiplication(cpy[3],mult[0]) ^
               this.galois_multiplication(cpy[2],mult[1]) ^
               this.galois_multiplication(cpy[1],mult[2]) ^
               this.galois_multiplication(cpy[0],mult[3]);
         return column;
      },
      
      // applies the 4 operations of the forward round in sequence
      round:function(state, roundKey)
      {
         state = this.subBytes(state,false);
         state = this.shiftRows(state,false);
         state = this.mixColumns(state,false);
         state = this.addRoundKey(state, roundKey);
         return state;
      },
      
      // applies the 4 operations of the inverse round in sequence
      invRound:function(state,roundKey)
      {
         state = this.shiftRows(state,true);
         state = this.subBytes(state,true);
         state = this.addRoundKey(state, roundKey);
         state = this.mixColumns(state,true);
         return state;
      },
      
      /*
       * Perform the initial operations, the standard round, and the final operations
       * of the forward aes, creating a round key for each round
       */
      main:function(state,expandedKey,nbrRounds)
      {
         state = this.addRoundKey(state, this.createRoundKey(expandedKey,0));
         for (var i = 1; i < nbrRounds; i++)
            state = this.round(state, this.createRoundKey(expandedKey,16*i));
         state = this.subBytes(state,false);
         state = this.shiftRows(state,false);
         state = this.addRoundKey(state, this.createRoundKey(expandedKey,16*nbrRounds));
         return state;
      },
      
      /*
       * Perform the initial operations, the standard round, and the final operations
       * of the inverse aes, creating a round key for each round
       */
      invMain:function(state, expandedKey, nbrRounds)
      {
         state = this.addRoundKey(state, this.createRoundKey(expandedKey,16*nbrRounds));
         for (var i = nbrRounds-1; i > 0; i--)
            state = this.invRound(state, this.createRoundKey(expandedKey,16*i));
         state = this.shiftRows(state,true);
         state = this.subBytes(state,true);
         state = this.addRoundKey(state, this.createRoundKey(expandedKey,0));
         return state;
      },

      numberOfRounds:function(size)
      {
         var nbrRounds;
         switch (size) /* set the number of rounds */
         {
            case this.keySize.SIZE_128:
               nbrRounds = 10;
               break;
            case this.keySize.SIZE_192:
               nbrRounds = 12;
               break;
            case this.keySize.SIZE_256:
               nbrRounds = 14;
               break;
            default:
               return null;
               break;
         }
         return nbrRounds;
      },
      
      // encrypts a 128 bit input block against the given key of size specified
      encrypt:function(input,key,size)
      {
         var output = [];
         var block = []; /* the 128 bit block to encode */
         var nbrRounds = this.numberOfRounds(size);
         /* Set the block values, for the block:
          * a0,0 a0,1 a0,2 a0,3
          * a1,0 a1,1 a1,2 a1,3
          * a2,0 a2,1 a2,2 a2,3
          * a3,0 a3,1 a3,2 a3,3
          * the mapping order is a0,0 a1,0 a2,0 a3,0 a0,1 a1,1 ... a2,3 a3,3
          */
         for (var i = 0; i < 4; i++) /* iterate over the columns */
            for (var j = 0; j < 4; j++) /* iterate over the rows */
               block[(i+(j*4))] = input[(i*4)+j];
      
         /* expand the key into an 176, 208, 240 bytes key */
         var expandedKey = this.expandKey(key, size); /* the expanded key */
         /* encrypt the block using the expandedKey */
         block = this.main(block, expandedKey, nbrRounds);
         for (var k = 0; k < 4; k++) /* unmap the block again into the output */
            for (var l = 0; l < 4; l++) /* iterate over the rows */
               output[(k*4)+l] = block[(k+(l*4))];
         return output;
      },
      
      // decrypts a 128 bit input block against the given key of size specified
      decrypt:function(input, key, size)
      {
         var output = [];
         var block = []; /* the 128 bit block to decode */
         var nbrRounds = this.numberOfRounds(size);
         /* Set the block values, for the block:
          * a0,0 a0,1 a0,2 a0,3
          * a1,0 a1,1 a1,2 a1,3
          * a2,0 a2,1 a2,2 a2,3
          * a3,0 a3,1 a3,2 a3,3
          * the mapping order is a0,0 a1,0 a2,0 a3,0 a0,1 a1,1 ... a2,3 a3,3
          */
         for (var i = 0; i < 4; i++) /* iterate over the columns */
            for (var j = 0; j < 4; j++) /* iterate over the rows */
               block[(i+(j*4))] = input[(i*4)+j];
         /* expand the key into an 176, 208, 240 bytes key */
         var expandedKey = this.expandKey(key, size);
         /* decrypt the block using the expandedKey */
         block = this.invMain(block, expandedKey, nbrRounds);
         for (var k = 0; k < 4; k++)/* unmap the block again into the output */
            for (var l = 0; l < 4; l++)/* iterate over the rows */
               output[(k*4)+l] = block[(k+(l*4))];
         return output;
      }
   },
   /*
    * END AES SECTION
    */
    
   /*
    * START MODE OF OPERATION SECTION
    */
   //structure of supported modes of operation
   modeOfOperation:{
      OFB:0,
      CFB:1,
      CBC:2
   },
   
   // get a 16 byte block (aes operates on 128bits)
   getBlock: function(bytesIn,start,end,mode)
   {
      if(end - start > 16)
         end = start + 16;
      
      return bytesIn.slice(start, end);
   },
   
   /*
    * Mode of Operation Encryption
    * bytesIn - Input String as array of bytes
    * mode - mode of type modeOfOperation
    * key - a number array of length 'size'
    * size - the bit length of the key
    * iv - the 128 bit number array Initialization Vector
    */
   encrypt: function (bytesIn, mode, key, iv)
   {
      var size = key.length;
      if(iv.length%16)
      {
         throw 'iv length must be 128 bits.';
      }
      // the AES input/output
      var byteArray = [];
      var input = [];
      var output = [];
      var ciphertext = [];
      var cipherOut = [];
      // char firstRound
      var firstRound = true;
      if (mode == this.modeOfOperation.CBC)
         this.padBytesIn(bytesIn);
      if (bytesIn !== null)
      {
         for (var j = 0;j < Math.ceil(bytesIn.length/16); j++)
         {
            var start = j*16;
            var end = j*16+16;
            if(j*16+16 > bytesIn.length)
               end = bytesIn.length;
            byteArray = this.getBlock(bytesIn,start,end,mode);
            if (mode == this.modeOfOperation.CFB)
            {
               if (firstRound)
               {
                  output = this.aes.encrypt(iv, key, size);
                  firstRound = false;
               }
               else
                  output = this.aes.encrypt(input, key, size);
               for (var i = 0; i < 16; i++)
                  ciphertext[i] = byteArray[i] ^ output[i];
               for(var k = 0;k < end-start;k++)
                  cipherOut.push(ciphertext[k]);
               input = ciphertext;
            }
            else if (mode == this.modeOfOperation.OFB)
            {
               if (firstRound)
               {
                  output = this.aes.encrypt(iv, key, size);
                  firstRound = false;
               }
               else
                  output = this.aes.encrypt(input, key, size);
               for (var i = 0; i < 16; i++)
                  ciphertext[i] = byteArray[i] ^ output[i];
               for(var k = 0;k < end-start;k++)
                  cipherOut.push(ciphertext[k]);
               input = output;
            }
            else if (mode == this.modeOfOperation.CBC)
            {
               for (var i = 0; i < 16; i++)
                  input[i] = byteArray[i] ^ ((firstRound) ? iv[i] : ciphertext[i]);
               firstRound = false;
               ciphertext = this.aes.encrypt(input, key, size);
               // always 16 bytes because of the padding for CBC
               for(var k = 0;k < 16;k++)
                  cipherOut.push(ciphertext[k]);
            }
         }
      }
      return cipherOut;
   },
   
   /*
    * Mode of Operation Decryption
    * cipherIn - Encrypted String as array of bytes
    * originalsize - The unencrypted string length - required for CBC
    * mode - mode of type modeOfOperation
    * key - a number array of length 'size'
    * size - the bit length of the key
    * iv - the 128 bit number array Initialization Vector
    */
   decrypt:function(cipherIn,mode,key,iv)
   {
      var size = key.length;
      if(iv.length%16)
      {
         throw 'iv length must be 128 bits.';
      }
      // the AES input/output
      var ciphertext = [];
      var input = [];
      var output = [];
      var byteArray = [];
      var bytesOut = [];
      // char firstRound
      var firstRound = true;
      if (cipherIn !== null)
      {
         for (var j = 0;j < Math.ceil(cipherIn.length/16); j++)
         {
            var start = j*16;
            var end = j*16+16;
            if(j*16+16 > cipherIn.length)
               end = cipherIn.length;
            ciphertext = this.getBlock(cipherIn,start,end,mode);
            if (mode == this.modeOfOperation.CFB)
            {
               if (firstRound)
               {
                  output = this.aes.encrypt(iv, key, size);
                  firstRound = false;
               }
               else
                  output = this.aes.encrypt(input, key, size);
               for (i = 0; i < 16; i++)
                  byteArray[i] = output[i] ^ ciphertext[i];
               for(var k = 0;k < end-start;k++)
                  bytesOut.push(byteArray[k]);
               input = ciphertext;
            }
            else if (mode == this.modeOfOperation.OFB)
            {
               if (firstRound)
               {
                  output = this.aes.encrypt(iv, key, size);
                  firstRound = false;
               }
               else
                  output = this.aes.encrypt(input, key, size);
               for (i = 0; i < 16; i++)
                  byteArray[i] = output[i] ^ ciphertext[i];
               for(var k = 0;k < end-start;k++)
                  bytesOut.push(byteArray[k]);
               input = output;
            }
            else if(mode == this.modeOfOperation.CBC)
            {
               output = this.aes.decrypt(ciphertext, key, size);
               for (i = 0; i < 16; i++)
                  byteArray[i] = ((firstRound) ? iv[i] : input[i]) ^ output[i];
               firstRound = false;
               for(var k = 0;k < end-start;k++)
                  bytesOut.push(byteArray[k]);
               input = ciphertext;
            }
         }
         if(mode == this.modeOfOperation.CBC)
             this.unpadBytesOut(bytesOut);
      }
      return bytesOut;
   },
   padBytesIn: function(data) {
      var len = data.length;
      var padByte = 16 - (len % 16);
      for (var i = 0; i < padByte; i++) {
         data.push(padByte);
      }
   },
   unpadBytesOut: function(data) {
      var padCount = 0;
      var padByte = -1;
      var blockSize = 16;
      if (data.length > 16) {
      for (var i = data.length - 1; i >= data.length-1 - blockSize; i--) {
         if (data[i] <= blockSize) {
            if (padByte == -1)
               padByte = data[i];
            if (data[i] != padByte) {
               padCount = 0;
               break;
            }
            padCount++;
         } else
            break;
         if (padCount == padByte)
            break;
      }
      if (padCount > 0)
         data.splice(data.length - padCount, padCount);
   }
   }
   /*
    * END MODE OF OPERATION SECTION
    */
};

/*

The rest of this code is licensed under the terms of the 3-clause BSD License
which is found in the LICENSE file.

*/

console.log("Declared AES functions");

function toNumbers(d) {
	var e = [];
	d.replace(/(..)/g, function(d) {
		e.push(parseInt(d, 16))
	});
	return e
}

function toHex() {
	for (var d = [], d = 1 == arguments.length && arguments[0].constructor == Array ? arguments[0] : arguments, e = "", f = 0; f < d.length; f++) e += (16 > d[f] ? "0" : "") + d[f].toString(16);
	return e.toLowerCase()
}

function Decode(a, b, c) {
	var site = window.location.href;
	var re = /imgbabes/;
	if (re.test(site)) {
		console.log("window.location.href matches /imgbabes/");
		var variable_name = "denial=";
	} else {
		console.log("window.location.href doesn't match /imgbabes/");
		var variable_name = "verifid=";
	}
	decrypted_cookie = variable_name + toHex(slowAES.decrypt(c, 2, a, b)) + "; max-age=" + 60 * 60 * 24 * 1 + "; path=/";
	console.log("Cookie plus decrypted key is: " + decrypted_cookie);
	document.cookie = decrypted_cookie;
}

function getImage() {
	imagetag = document.getElementById("this_image");
	if (imagetag) {
		return imagetag;
	}
	else {
		return false;
	}
}

function isGateway(url) {
	var re_pic = /(?:jpeg|jpg|png|gif)\.html$/;
	console.log("regex is " + re_pic);
	if (re_pic.test(url)) {
      console.log("Is a gateway.");
		return true;
	} else {
      console.log("Is not a gateway.");
		return false;
	}
}

function getciphertext(rawHTML) {
	var re = /\"[abcdef0123456789]{32}\"/g;
	console.log("HTML passed to me was: " + rawHTML);
	console.log("Testing whether rawHTML contains 32-character hex strings...");
	console.log(re.test(rawHTML));
	if (re.test(rawHTML)) {
		var matched = rawHTML.match(re);
		return matched;
	}		
	else {
		return false;
	}
	
}

console.log("Shitty image host detected!");


if (getImage()) {
	console.log("This is an image page. Getting direct URL.");
	var imagetag = getImage();
	var url = imagetag.src;
	console.log("Redirecting.")
	window.location = url;
}

else if (isGateway(window.location.href)) {
	console.log("This page is a gateway. Retrieving script contents...");
	var scriptags = document.getElementsByTagName('script');
	for (var i = 0, len = scriptags.length; i < len; i++) {
		var script_re = /toNumbers/;
		if (script_re.test(scriptags[i].innerHTML)) {
			console.log("Found <script> tag that has what we need. Dumping into rawtext.")
			var rawtext = scriptags[i].innerHTML;
		}
	}
	var vars = getciphertext(rawtext);
	console.log("Got key, ciphertext, and iv from script.");
	var a = vars[0];
	a = a.replace(/"/g,"");
	var b = vars[1];
	b = b.replace(/"/g,"");
	var c = vars[2];
	c = c.replace(/"/g,"");
	console.log("key = " + a);
	console.log("iv = " + b);
	console.log("ciphertext = " + c);
	a = toNumbers(a);
	b = toNumbers(b);
	c = toNumbers(c);
	console.log("a = " + a);
	console.log("b = " + b);
	console.log("c = " + c);
	Decode(a, b, c);
	console.log("Creating redirect url " + window.location.href + "?attempt=1");
	var goto_location = window.location.href + "?attempt=1";
	console.log("Redirecting to image page.");
	window.location = goto_location;
} else {
	console.log("This is neither a gateway page nor an image page.");
}