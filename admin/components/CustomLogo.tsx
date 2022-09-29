import { jsx, H3 } from '@keystone-ui/core'
import { Link } from '@mui/material';

export const CustomLogo = () => {
  return(
    <H3>
      <Link href="/" underline="none" color="inherit">
          Chowder
      </Link>
    </H3>
  );
}

