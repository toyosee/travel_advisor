import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

// importing styles
import useStyles from './styles';

const PlaceDetails = ({place, selected, refProp}) => {
    //console.log(place);

    const classes = useStyles();
    const theIMage = 'https://www.collinsdictionary.com/images/full/restaurant_135621509.jpg';

    if(selected) refProp?.current?.scrollIntoView({behavior:'smooth', block:'start'})
    return(
        <Card elevation={6}>
            <CardMedia 
            style={{height:100}}
            image = {place.photo ? place.photo.images.large.url :theIMage }
            title = {place.name}           
            />
            <CardContent>
                <Typography gutterBottom variant='h5'>{place.name}</Typography>
                <Box display="flex" justifyContent="space-between" my={2}>
                    <Rating name="read-only" value={Number(place.rating)} readOnly />
                <Typography component="legend">{place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
                </Box>
                <Box display='flex' justifyContent='space-between'>
                    <Typography variant='subtitle1'>Price</Typography>
                    <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>
                </Box>
                <Box display='flex' justifyContent='space-between'>
                    <Typography variant='subtitle1'>Ranking</Typography>
                    <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
                </Box>

                <Box display='flex' justifyContent='space-between'>
                    <Typography variant='subtitle1'>Contact Mail</Typography>
                    <Typography gutterBottom variant='subtitle1'>{place.email}</Typography>
                </Box>
                {place?.awards?.map((award) => (
                    <Box my={1} display='flex' justifyContent='space-between' alignItems='center'>
                        <img src={award.images.small} alt={award.display_name} />
                        <Typography variant='subtitle2' color='textSecondary'>{award.display_name}</Typography>
                    </Box>
                ))}

                {place?.cuisine?.map(({ name }) => (
                        <Chip key={name} size="small" label={name} className={classes.chip} />
                ))}

                {place.address && (
                        <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
                            <LocationOnIcon />{place.address}
                        </Typography>
                )}

                {place.phone && (
                        <Typography gutterBottom variant="body2" color="textSecondary" className={classes.spacing}>
                            <PhoneIcon />{place.phone}
                        </Typography>
                )}
            </CardContent>

            <CardActions>
                    <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
                    Trip Advisor
                    </Button>
                    <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
                    Website
                    </Button>
            </CardActions>
        </Card>
    );
}

export default PlaceDetails;