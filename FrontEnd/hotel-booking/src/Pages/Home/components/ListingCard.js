import React from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from '@mui/material/Link';
import Typography from "@mui/material/Typography";

export default function ListingCard({ listing }){
  return (
    <Card key={listing.listing_id} sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">
          <Link href={`/bookings?listing_id=${listing.listing_id}`}>
            {listing.name}
          </Link>
        </Typography>
        <Typography variant="body2">{listing.summary}</Typography>
        <Typography variant="body2">Price per night: {listing.daily_price}</Typography>
        <Typography variant="body2">Rating: {listing.review_score_rating}</Typography>
      </CardContent>
    </Card>
  );
};