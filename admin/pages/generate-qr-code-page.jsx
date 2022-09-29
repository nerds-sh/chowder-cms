import { jsx } from '@keystone-ui/core'
import { PageContainer } from '@keystone-6/core/admin-ui/components'

import { Heading } from '@keystone-ui/core'
import { gql, useQuery } from '@keystone-6/core/admin-ui/apollo'
import { get } from 'lodash'

const GenerateQrCodePage = () => {

const { data, error } = useQuery(
  gql`
  query Restaurants{
    restaurants {
        id
        name
    }
}
  `
)
const restaurants = get(data, 'restaurants', 'null')
console.log('restaurants', restaurants);
return( <PageContainer header={<Heading type="h3">Generate QR code</Heading>}>
<h1>This is a custom Admin UI Page</h1>
<p>It can be accessed via the route <a href="/custom-page">/custom-page</a></p>
</PageContainer>
)
}

export default GenerateQrCodePage