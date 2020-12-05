import React, {useState, useEffect}from 'react';
import { Wrapper, Left, Right, LoadingDiv } from './styles';
import { Marker, Popup, TileLayer, Map } from "react-leaflet";
import { Icon } from 'leaflet';
import GymItem from '../../components/GymItem';
import { getAllGyms } from '../../api/gymApi';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';
import Boxed from '../../components/Boxed';
import { useHistory } from 'react-router-dom';
import { HOME_PATH } from '../../constants/Path';

const newIcon = new Icon({
    iconUrl: '/2562aacd1a4c2af60cce9629b1e05cf2.png',
    iconSize: [25, 25]
})

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2-lat1);
    var dLon = degreesToRadians(lon2-lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return earthRadiusKm * c;
}

const NearBy = () => {
    const [latLng, setLatLng] = useState(null);
    const [gyms, setGyms] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const getCurrentLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    setLatLng([position.coords.latitude, position.coords.longitude])
                });
            } else {
                history.push(HOME_PATH);
            }
        }
        getCurrentLocation();
    }, [history])

    useEffect(() => {
        const getAllGymsApi = async () => {
            try {
                const res = await getAllGyms();
                const newGyms = res.gym.map(item => {
                    return {
                        ...item._doc,
                        reviews: item.reviews
                    }
                })
                var findedGyms = [];
                for (const g of newGyms) {
                    const distance = distanceInKmBetweenEarthCoordinates(latLng[0], latLng[1], parseFloat(g.addresses.lat), parseFloat(g.addresses.lng));
                    if (distance < 2) {
                        findedGyms.push({gym: g, address: [g.addresses.lat, g.addresses.lng]});
                    }
                }
                setLoading(false);
                setGyms(findedGyms);
            } catch (error) {
                setLoading(false);
                console.log(error)
            }
        }
        if (latLng) {
            getAllGymsApi();
        }
    }, [latLng])

    return (
        <Boxed>
            <Wrapper>
                <Left>
                    <h3>Các phòng tập gần đây</h3>
                    {loading ? 
                        <LoadingDiv>
                            <MiniLoadingSpinner />
                        </LoadingDiv> : gyms.length > 0 ? gyms.map((item, index, arr) => {
                            return (
                                <><GymItem key={item._id} gym={item.gym} /><br /></>
                            )
                        }) : <h2>Không có phòng tập gần đây</h2>}
                </Left>
                <Right>
                    <Map center={latLng ? latLng : [16.054407, 108.202164]} zoom={16} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker icon={newIcon} position={latLng ? latLng : [16.054407, 108.202164]}>
                            <Popup>
                                Your place
                            </Popup>
                        </Marker>
                        {gyms && gyms.map(item => {
                            return (
                                <Marker key={item._id} position={item.address}>
                                    <Popup>
                                        {item.gym.title}
                                    </Popup>
                                </Marker>
                            )
                        })}
                    </Map>
                </Right>
            </Wrapper>
        </Boxed>
    );
};

export default NearBy;