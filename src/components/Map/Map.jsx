import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

//Importing styles
//import mapStyles from '../../mapStyles';
import useStyles from './styles.js';

const Map = ({setCoordinates, setBounds, coordinates, places, setChildClicked}) => {
    const isDesktop = useMediaQuery('(min-width:600px)');
    const classes = useStyles(); //Hook
    const theIMage = 'https://www.collinsdictionary.com/images/full/restaurant_135621509.jpg'

    return(
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key: ''}}
                defaultCenter = {coordinates}
                center= {coordinates}
                defaultZoom = {14}
                margin = {[50,50,50,50]}
                options = {''}
                onChange = {(e)=>{
                    //console.log(e)
                    setCoordinates({lat: e.center.lat, lng: e.center.lng});
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw});
                }}
                onChildClick = {(child) => setChildClicked(child)}
            >
                {places?.map((place, i) => (
                    <div
                        className = {classes.markerContainer}
                        lat = {Number(place.latitude)}
                        lng = {Number(place.longitude)}
                        key = {i}
                    >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color='primary' fontSize='large' />
                            ): (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant="subtitle2" gutterBottom>{place.name}</Typography>
                                    <img
                                        className={classes.pointer}
                                        src={place.photo ? place.photo.images.large.url : theIMage}
                                    />
                                    <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                                </Paper>
                            )
                        }
                    </div>
                ))}

            </GoogleMapReact>
        </div>
    );
}

export default Map;
