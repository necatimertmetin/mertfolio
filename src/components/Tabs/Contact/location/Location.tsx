import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
export const Location = () => {
  // Statik bir konum (enlem ve boylam)
  const position: [number, number] = [40.490441, 29.308436]; // Enlem ve Boylam

  return (
    <MapContainer
      center={position} // Haritayı bu konumda merkezi yap
      zoom={20} // Zoom seviyesini ayarla
      style={{ height: "180px", width: "100%" }} // Harita boyutları
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>Your Location</Popup>
      </Marker>
    </MapContainer>
  );
};
