import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
export const Location = () => {
  const position: [number, number] = [40.490441, 29.308436];

  return (
    <MapContainer
      center={position}
      zoom={20}
      style={{ height: "180px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>Your Location</Popup>
      </Marker>
    </MapContainer>
  );
};
