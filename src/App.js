// Startig point of the application
import React, {useEffect, useState} from 'react';
import {CssBaseline, Grid} from '@material-ui/core';

// Importing components
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import PlaceDetails from './components/PlaceDetails/PlaceDetails';

// Importing data from api file
import {getPlacesData} from './api';

const App = () => {
    const [places, setPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    // moved in from List.jsx. State lifting
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

    const [childClicked, setChildClicked] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    
    //  u   se state to get current browser location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoordinates({lat: latitude, lng: longitude});
        });
    }, []);

    useEffect(() => {
        const filteredPlaces = places.filter((place) => place.rating > rating);
        setFilteredPlaces(filteredPlaces);
    }, [rating])

    // Use state to set boundries and get data from API call
    useEffect(() => {
        if (bounds.sw && bounds.ne){
        setIsLoading(true);
        getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
            //console.log(data);
            setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
            setFilteredPlaces([]);
            setIsLoading(false);

        })
        }

    }, [type,bounds]);

    return(
        <>
            <CssBaseline />
            <Header setCoordinates = {setCoordinates} />
            <Grid container spacing={3} style={{width : '100%'}}>
                <Grid item xs={12} md={4}>
                    <List 
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked = {childClicked}
                        isLoading = {isLoading}
                        type = {type}
                        setType = {setType} 
                        rating = {rating}
                        setRating = {setRating}                
                    />
                </Grid>

                <Grid item xs={12} md={8}>
                    <Map 
                    setCoordinates = {setCoordinates}
                    setBounds = {setBounds}
                    coordinates = {coordinates}
                    places={filteredPlaces.length ? filteredPlaces : places}
                    setChildClicked = {setChildClicked}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default App;