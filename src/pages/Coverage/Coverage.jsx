import { FaSearch } from "react-icons/fa";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import { useRef } from "react";

const Coverage = () => {
  const position = [23.8103, 90.4125];
  const serviceCenters = useLoaderData();
  const mapRef = useRef();
  //   console.log(serviceCenters);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value.trim().toLowerCase();
    const district = serviceCenters.find((center) =>
      center.district.toLowerCase().includes(location),
    );
    if (district) {
      const coordinate = [district.latitude, district.longitude];
      // console.log(district, coordinate);
      // go to location
      mapRef.current.flyTo(coordinate, 12);
    }
  };

  return (
    <div className="mx-2 md:mx-14 bg-white rounded-2xl mt-4 py-20 px-6 md:px-27.5">
      <h2 className="text-5xl text-center md:text-left text-secondary font-extrabold">
        We are available in 64 districts
      </h2>
      <div className="flex my-12.5 relative">
        <form onSubmit={handleSearch} className="relative flex items-center">
          <FaSearch
            className="absolute top-3 left-5 text-gray-500 z-10"
            size={20}
          />
          <input
            type="search"
            name="location"
            placeholder="Search Here (e.g. Dhaka)"
            className="border border-gray-300 py-2 pl-12 pr-28 rounded-full w-80 md:w-100 lg:w-145"
          />
          <button
            type="submit"
            className="btn border-0 bg-primary px-6 rounded-full absolute right-0 h-full"
          >
            Search
          </button>
        </form>
      </div>
      <div className="w-full border-t-2 border-gray-200 h-150 pb-20">
        <h3 className="text-3xl text-secondary text-center md:text-left font-extrabold my-12.5">
          We deliver almost all over Bangladesh
        </h3>
        <MapContainer
          className="h-full"
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviceCenters.map((center, i) => (
            <Marker key={i} position={[center.latitude, center.longitude]}>
              <Tooltip>
                <strong>
                  {center.district}
                  <br />
                  Service Area: {center.covered_area.join(",")}
                </strong>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
