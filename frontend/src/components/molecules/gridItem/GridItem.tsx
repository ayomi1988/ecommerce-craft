import { Grid, Typography, CardContent, CardActions, Card,  CardMedia } from "@mui/material";
import { ViewDetail } from "../../atoms/Button"; 


export type CrafttistType = {
  craft: any;
    redirectToDetail :Function,
  }

const CraftsGrid = ({
  craft,
  redirectToDetail,
}: CrafttistType) => {
  return craft && craft.map((craft: any, index: number) => (
    

<Grid item md={3} key={index} data-cy="grid-item">
  <Card>
 
<CardContent>
  <Typography data-cy="emp-name" gutterBottom variant="h5" component="div">
  {craft.product_name}
  </Typography>
  <Typography data-cy="emp-email" variant="body2" color="text.secondary">
 $ {craft.price}
  </Typography>
  <Typography data-cy="emp-number" variant="body2" color="text.secondary">
  {craft.quantity}
  </Typography>
  <Typography data-cy="emp-number" variant="body2" color="text.secondary">
  {craft.description}
  </Typography>

</CardContent>
<CardActions>
<ViewDetail onClick={redirectToDetail} id={craft._id} />
</CardActions>
</Card>
</Grid>


  ));
};

export default CraftsGrid;
