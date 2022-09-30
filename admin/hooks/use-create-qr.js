import React from 'react'
import axios from 'axios'

export const useCreateQr = (restaurant, setQrImage) => React.useCallback(() => {
  axios.post(
    'https://create-qr-api.herokuapp.com/create-qr',
    { menu_link: restaurant }
  ).then((response) => {
    console.log('Response: ', response)


    setQrImage(response.data)
    window.location.href = 'data:application/octet-stream;base64,' + response.data;

  })
    .catch((err) => console.log('Err: ', err))
}, [restaurant])