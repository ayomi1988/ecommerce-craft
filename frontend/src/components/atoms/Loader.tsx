import { Box, LinearProgress } from '@mui/material';

export default function Loader ()   {
  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
       <LinearProgress data-cy="loader" color="success" sx={{ width: '100%', backgroundColor: 'gay'}} data-testid="progressbar" />
    </Box>   
  )
}