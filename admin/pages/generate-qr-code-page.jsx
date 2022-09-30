import { PageContainer } from '@keystone-6/core/admin-ui/components'
import { Heading } from '@keystone-ui/core'
import { gql, useQuery } from '@keystone-6/core/admin-ui/apollo'
import { get, isEmpty } from 'lodash'
import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Button, Box, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material'
import { useCreateQr } from '../hooks/use-create-qr'

const GenerateQrCodePage = () => {


const [restaurant, setRestaurant] = React.useState({ name: '', id: '' });
const [qrImage, setQrImage] = React.useState('')

const { data } = useQuery(
  gql`query Restaurant {
    restaurants {
        id
        name
    }
}`
)

const restaurantsData = get(data, 'restaurants', [])
const isDisabled = isEmpty(restaurant)
const handleChange = (event) => setRestaurant(event.target.value)

  console.log('Qr image: ', qrImage)

return( <PageContainer header={<Heading type="h3">Generate QR code</Heading>}>
<Typography variant={'h5'} sx={{marginTop: 2, marginButtom: 2}}>Generate a QR code for your restaurants</Typography>
    <Box sx={{ maxWidth: 200, marginTop: 4 }}>
      <FormControl fullWidth>
        <InputLabel>Restaurants</InputLabel>
        <Select value={restaurant.name} label="Restaurants" onChange={handleChange}>
          {
            restaurantsData.map((restaurant, index) => <MenuItem key={index} value={{ name: restaurant.name, id: restaurant.id }}>{restaurant.name}</MenuItem>)
          }
        </Select>
      </FormControl>
    </Box>
    <Box sx={{ maxWidth: 250, marginTop: 5 }}>
      <Button variant="contained" color="primary" onClick={useCreateQr(restaurant, setQrImage)} disabled={isDisabled}>
        Generate QR
      </Button>
    </Box>
    {
      !isEmpty(qrImage) && <Box>
        <img src={`data:image/png;base64,${qrImage}`} alt={'qr'} />
      </Box>
    }
</PageContainer>
)
}

export default GenerateQrCodePage