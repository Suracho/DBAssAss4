import React from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from '@mui/material/Link';
import Typography from "@mui/material/Typography";

export default function ListingCard({ listing }){
    console.log("lising price is " + listing.price.toString());

  return (
    <Card key={listing.listing_id} sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">
          <Link href={`/bookings?listing_id=${listing._id}`}>
            {listing.name}
          </Link>
        </Typography>
        <Typography variant="body2">{listing.summary}</Typography>
        <Typography variant="body2">Price per night: $ {listing.price.$numberDecimal}</Typography>
        <Typography variant="body2">Rating: {listing.review_scores.review_scores_rating === undefined ? 'N/A' : listing.review_scores.review_scores_rating}</Typography>
      </CardContent>
    </Card>
  );
};