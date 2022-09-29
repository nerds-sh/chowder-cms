import { jsx } from '@keystone-ui/core'
import { PageContainer } from '@keystone-6/core/admin-ui/components'
import { Heading } from '@keystone-ui/core'
import { gql, useQuery } from '@keystone-6/core/admin-ui/apollo'
import { get, isEmpty } from 'lodash'
import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { Button, Box, Typography } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem } from '@mui/material'

const useHandleSubmit = () => {
  console.log("Submit");
};

const GenerateQrCodePage = () => {

const [restaurant, setRestaurant] = React.useState('');

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

return( <PageContainer header={<Heading type="h3">Generate QR code</Heading>}>
<Typography variant={'h5'} sx={{marginTop: 2, marginButtom: 2}}>Generate a QR code for your restaurants</Typography>
    <Box sx={{ maxWidth: 200, marginTop: 4 }}>
      <FormControl fullWidth>
        <InputLabel>Restaurants</InputLabel>
        <Select value={restaurant} label="Restaurants" onChange={handleChange}>
          {
            restaurantsData.map((restaurant, index) => <MenuItem key={index} value={restaurant.id}>{restaurant.name}</MenuItem>)
          }
        </Select>
      </FormControl>
    </Box>
    <Box sx={{ maxWidth: 250, marginTop: 5 }}>
      <Button variant="contained" color="primary" onClick={useHandleSubmit} disabled={isDisabled}>
        Generate QR
      </Button>
    </Box>
</PageContainer>
)
}

export default GenerateQrCodePage