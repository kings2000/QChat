import React from 'react'



export function uploadFile (file) {
    return RNFetchBlob.fetch('POST', 'https://api.cloudinary.com/v1_1/<cloud name>/<resource_type>/upload', {
      'Content-Type': 'multipart/form-data'
    }, [
      {name: 'file', filename: file.name, type: file.type, data: RNFetchBlob.wrap(file.uri)},
      {name: 'upload_preset', data: '<upload_preset>'}
    ])
  }