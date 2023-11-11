// 'use client';

// import axios from 'axios';
// import React, { useEffect, useRef, useState } from 'react';
// import { Loader } from "@googlemaps/js-api-loader"
// import mapboxgl, { LngLatBounds, LngLatBoundsLike } from 'mapbox-gl';
// import "mapbox-gl/dist/mapbox-gl.css";

// // mapboxgl.accessToken ='pk.eyJ1IjoidTYzODgwNTYiLCJhIjoiY2xvZWJ1NWhlMGhhODJxcXBvYTljc2J5dCJ9.QsBB2OQEMBgs0vKcioIELg';


// const MapboxComponent: React.FC = () => {
//     const [map, setMap] = useState<mapboxgl.Map | null>(null);
//     const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
//     const mapContainer = useRef<HTMLDivElement | null>(null);
//     const markerRef = useRef<mapboxgl.Marker | null>(null);

//     // const [userlocation, setuserlocation] = useState();
//     // const getUserLocation = ()=>{
//     //   navigator.geolocation.getCurrentPosition(function(pos){
//     //     console.log(pos);
//     //   })
//     // }
    
//   const [userlocation, setuserlocation] = useState<any>();
//   const getUserLocation = ()=>{
//     navigator.geolocation.getCurrentPosition(function(pos){
//       setuserlocation({
//         lat: pos.coords.latitude , lng: pos.coords.longitude
//       })
//       console.log(pos);
//     })
//   }

//     useEffect(() => {
//        mapboxgl.accessToken ='pk.eyJ1IjoidTYzODgwNTYiLCJhIjoiY2xvbjJoY25xMzU1czJqbXZ3MHcxcmhyciJ9.DrzWvlgvbGeNMU1IXsNUYg';

//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const { latitude, longitude } = position.coords;
//             setUserLocation(userlocation);
  
//             const newMap = new mapboxgl.Map({
//               container: mapContainer.current!,
//               style: 'mapbox://styles/mapbox/streets-v11',
//               center: userlocation,
//               zoom: 18,
//             });
  
//             markerRef.current = new mapboxgl.Marker({
//               color: 'red'
//             }).setLngLat(userlocation).addTo(newMap);
  
//             setMap(newMap);
  
//             newMap.on('move', () => {
//               const mapBounds = newMap.getBounds();
//               const markerLngLat = markerRef.current?.getLngLat();
  
//               if (markerLngLat && !mapBounds.contains(markerLngLat)) {
//                 const [lng, lat] = markerLngLat.toArray();
//                 const newLng = Math.min(Math.max(lng, mapBounds.getWest()), mapBounds.getEast());
//                 const newLat = Math.min(Math.max(lat, mapBounds.getSouth()), mapBounds.getNorth());
//                 markerRef.current?.setLngLat([newLng, newLat]);
//               }
//             });
  
//             newMap.on('error', (err) => {
//               console.error('Map error:', err.error.message);
//             });
//           },
//           (error) => {
//             console.error('Error getting user location:', error.message);
//           }
//         );
//       } else {
//         console.error('Geolocation is not supported.');
//       }
    
//     }, []);
  
//     return <div ref={mapContainer} id="map" style={{ height: '70%', width: '500' , borderRadius: 10 }}></div>;
//   };
  
//   export default MapboxComponent;
//mapboxgl.accessToken ='pk.eyJ1IjoidTYzODgwNTYiLCJhIjoiY2xvZWJ1NWhlMGhhODJxcXBvYTljc2J5dCJ9.QsBB2OQEMBgs0vKcioIELg';
'use client';
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mapboxgl.accessToken ='pk.eyJ1IjoidTYzODgwNTYiLCJhIjoiY2xvZWJ1NWhlMGhhODJxcXBvYTljc2J5dCJ9.QsBB2OQEMBgs0vKcioIELg';

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const map = new mapboxgl.Map({
              container: mapContainer.current!,
              style: 'mapbox://styles/mapbox/streets-v11',
              center: [longitude, latitude], // Center the map on user's geolocation
              zoom: 12,
            });

            const markerElement = document.createElement('div');
            markerElement.style.width = '30px';
            markerElement.style.height = '30px';
            markerElement.style.background = 'red';
            markerElement.style.borderRadius = '50%';
            markerElement.style.border = '2px solid #000';

            new mapboxgl.Marker({ element: markerElement })
              .setLngLat([longitude, latitude])
              .addTo(map);
          },
          (error) => {
            console.error('Error getting user location:', error.message);
          }
        );
      } else {
        console.error('Geolocation is not supported.');
      }
    };

    getUserLocation();

    return () => {
      // Cleanup, if necessary
    };
  }, []);

  return <div ref={mapContainer} style={{ height: '70vh', width: '100%', borderRadius: 10 }}></div>;
};

export default MapboxComponent;