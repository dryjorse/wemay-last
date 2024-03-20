import { FC, useState } from "react";
import geoIcon from "../../../assets/images/icons/geo.svg";
import Modal from "../../ui/modal/Modal";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

const LocationFinderDummy = () => {
  const map = useMapEvents({
    click(e) {
      console.log(e.latlng);
    },
  });
  return null;
};

const Addreses: FC = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <div>
      <h3 className="mb-[8px] title-3">Адрес</h3>
      <button
        onClick={() => setIsMapOpen(true)}
        className="box-input flex gap-[6px] items-center"
      >
        <img src={geoIcon} alt="geo" />
        <span>Выберите адрес</span>
      </button>
      <Modal
        isOpen={isMapOpen}
        close={() => setIsMapOpen(false)}
        contentStyle="relative w-full max-w-[1012px] h-full max-h-[800px] flex justify-center items-center overflow-hidden"
      >
        <MapContainer
          zoom={12}
          center={[42.8670976, 74.579968]}
          className="w-full h-full z-[5]"
        >
          <TileLayer
            // @ts-ignore
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationFinderDummy />
        </MapContainer>
      </Modal>
    </div>
  );
};

export default Addreses;
