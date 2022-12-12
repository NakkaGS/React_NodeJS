import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import { Link } from 'react-router-dom'

export default function NewProductMUI({ product }) {
  return (
    <div>
      <Card sx={{ maxWidth: 200 }}>
      <CardActionArea>
        <Link to={`/product/${product._id}`}>
          <CardMedia
            component="img"
            height="140"
            image={product?.image}
            alt="green iguana"/>
        </Link>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${product?.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

    </div>

  );
}
