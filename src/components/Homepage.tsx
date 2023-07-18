import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
// import { Popup } from 'react-leaflet/lib/Popup'
// import { Marker } from 'react-leaflet/lib/Marker'
import { MdArrowForwardIos } from "react-icons/md";
import { useState } from "react";
import axios from "axios";

interface ipDataProps {
  ip: string;
  location: {
    city: string;
    lat: number;
    lng: number;
    region: string;
    timezone: string;
  };
  isp: string;
}

export default function Homepage() {
  const [activeIp, setActiveIp] = useState("8.8.8.8");
  const [ipData, setIpData] = useState<ipDataProps>({
    ip: "8.8.8.8",
    location: {
      city: "Mountain View",
      lat: 37.40599,
      lng: -122.078514,
      region: "California",
      timezone: "-07:00",
    },
    isp: "Google LLC",
  });

  const sendRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await axios.get(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_P2JVjCPUfsK2NJazZSs7k2r0fy57u&ipAddress=${activeIp}`
    );

    setIpData(response.data);
  };

  return (
    <div className="relative">
      <div className="bg-hero h-[250px]">
        <div className="flex flex-col gap-3 pt-5 items-center justify-center">
          <p className="text-white font-primary font-bold text-[20px]">
            IP ADDRESS TRACKER
          </p>
          <div className="bg-white w-[300px] sm:w-[400px] h-[40px]  flex items-center rounded-lg">
            <form
              className="flex  h-full rounded-lg overflow-clip  bg-white "
              onSubmit={sendRequest}
            >
              <input
                className="bg-transparent pl-3 focus:outline-none  w-[360px]"
                type="text"
                placeholder="search for any ip address of domain"
                name="search"
                value={activeIp}
                onChange={(e) => setActiveIp(e.target.value)}
              />
              <button
                title="button"
                className="bg-black w-10 rounded-r-lg flex justify-center items-center h-full"
                type="submit"
              >
                <MdArrowForwardIos className="text-white" />
              </button>
            </form>
          </div>
        </div>
      </div>
      <MapContainer
        center={[ipData.location.lat, ipData.location.lng]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[ipData.location.lat, ipData.location.lng]}>
          <Popup>
            {ipData.location.city} <br /> {ipData.location.region}
          </Popup>
        </Marker>
      </MapContainer>{" "}
      <div className="sm:w-[80%] w-[60%] sm:flex-row flex-col flex sm:flex-wrap  items-center sm:divide-x min-h-[150px] sm:left-[10%] left-[20%] absolute z-[1000] top-[170px] rounded-2xl bg-white">
        <div className="sm:flex-1 flex items-center  flex-col sm:px-4 py-2   ">
          <p className="text-gray-400 font-bold text-[13px] mb-2">IP ADDRESS</p>
          <p className="text-black font-primary font-bold">{ipData?.ip}</p>
        </div>
        <div className="sm:flex-1 flex items-center  flex-col sm:px-4 py-2   ">
          <p className="text-gray-400 font-bold ">LOCATION</p>
          <p className="text-black font-primary w-[100px] font-bold">
            {ipData?.location.city}
          </p>
        </div>
        <div className="sm:flex-1 flex items-center  flex-col sm:px-4 py-2   ">
          <p className="text-gray-400 font-bold text-[">TIMEZONE</p>
          <p className="text-black font-primary font-bold">
            {ipData?.location.timezone}
          </p>
        </div>
        <div className="sm:flex-1 flex items-center  flex-col sm:px-4 py-2 ">
          <p className="text-gray-400 font-bold text-[13px] mb-2">ISP</p>
          <p className="text-black font-primary font-bold w-[150px] sm:w-[100px]">
            {ipData?.isp}
          </p>
        </div>
      </div>
    </div>
  );
}
