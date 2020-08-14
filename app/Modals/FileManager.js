import React from 'react'
import axios from 'axios'
import * as RNFS from 'react-native-fs';
import ImagePicker from 'react-native-image-picker';

const url = "https://api.cloudinary.com/v1_1/ninja3k/image/upload"

const options = {
  title: 'Media',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
    
  },
  
};

export class FileManager{


  GetImageFromLib(location){

    return new Promise(function(resolve, reject){

      if(location == 'cam'){

        ImagePicker.launchCamera(options, (response) => {
          
          if (response.didCancel) {
            reject('User cancelled image picker');
          } else if (response.error) {
            reject('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            reject('User tapped custom button: ', response.customButton);
          } else {
            
            resolve(response);
          }
  
        });
  
      }else{
  
        ImagePicker.launchImageLibrary (options, (response) => {
          
          if (response.didCancel) {
            reject('User cancelled image picker');
          } else if (response.error) {
            reject('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            reject('User tapped custom button: ', response.customButton);
          } else {
            resolve(response);
          }
        });
        
      }
    })
  }


  UploadImage(photo) {
    
    return new Promise(function(resolve, reject) {

      RNFS.readFile(photo.path, 'base64').then(res => {

        let base64Img = `data:${photo.type};base64,${photo.data}`;
        // console.log(photo);
        const data = new FormData()
        data.append('file', base64Img)
        data.append('upload_preset', 'gpcodes')
        data.append("cloud_name", "ninja3k")
  
        let imageUrl = "";
  
        axios({
        
          method: 'POST',
          url: "https://api.cloudinary.com/v1_1/ninja3k/image/upload",
          data: data
        }).then(function (response) {
          
          const imageUrl = response.data.secure_url;
          resolve(imageUrl);
          })
          .catch(function (error) {
            console.log(error);
            reject(error);
          });
  
        }).catch(err => {
    
          console.log(err.message, err.code);
          reject(err);
        });

    });
    
    

  }

}