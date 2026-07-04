import { MapPin } from "lucide-react";
import "./StoreMap.css";

export function StoreMap({ latitude, longitude }) {
  if (latitude == null || longitude == null) {
    return (
      <p className="store-map__caption">Online store — no physical location.</p>
    );
  }

  const mapUrl = `https://www.google.com/maps?search_api=1&query=${latitude},${longitude}`;

  return (
    <a
      href={mapUrl}
      target="_blank"
      rel="noreferrer"
      className="store-map__link"
    >
      <MapPin size={14} strokeWidth={2} aria-hidden="true" />
      View on map
    </a>
  );
}

export default StoreMap;
