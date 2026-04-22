"use client";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function LocationSelector({ setLocation }) {
    useMapEvents({
        click(e) {
            setLocation({
                latitude: e.latlng.lat,
                longitude: e.latlng.lng,
            });
        },
    });
    return null;
}

export default function MapView({ location, setLocation }) {
    return (
        <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                position={[location.latitude, location.longitude]}
                icon={markerIcon}
            />
            <LocationSelector setLocation={setLocation} />
        </MapContainer>
    );
}
