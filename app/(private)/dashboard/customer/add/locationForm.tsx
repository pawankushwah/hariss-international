"use client";

export default function LocationInformation() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Region */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Region
        </label>
        <select className="w-full rounded-md border border-gray-300 px-3 text-sm h-11 focus:outline-none shadow-sm">
          <option>Select Region</option>
          <option>Region 1</option>
          <option>Region 2</option>
        </select>
      </div>

      {/* Sub Region */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sub Region
        </label>
        <select className="w-full rounded-md border border-gray-300 px-3 text-sm h-11 focus:outline-none shadow-sm">
          <option>Select Sub Region</option>
          <option>Sub Region 1</option>
          <option>Sub Region 2</option>
        </select>
      </div>

      {/* District */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          District
        </label>
        <input
          type="text"
          placeholder="Enter District"
          className="w-full rounded-md border border-gray-300 px-3 text-sm h-11 shadow-sm focus:outline-none"
        />
      </div>

      {/* Town/Village */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Town/Village
        </label>
        <input
          type="text"
          placeholder="Enter Town/Village"
          className="w-full rounded-md border border-gray-300 px-3 text-sm h-11 shadow-sm focus:outline-none"
        />
      </div>

      {/* Street */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Street
        </label>
        <input
          type="text"
          placeholder="Enter Street"
          className="w-full rounded-md border border-gray-300 px-3 text-sm h-11 shadow-sm focus:outline-none"
        />
      </div>

      {/* Landmark */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Landmark
        </label>
        <input
          type="text"
          placeholder="Enter Landmark"
          className="w-full rounded-md border border-gray-300 px-3 text-sm h-11 shadow-sm focus:outline-none"
        />
      </div>

      {/* Latitude */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Latitude
        </label>
        <input
          type="text"
          placeholder="Enter Latitude"
          className="w-full rounded-md border border-gray-300 px-3 text-sm h-11 shadow-sm focus:outline-none"
        />
      </div>

      {/* Longitude */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Longitude
        </label>
        <input
          type="text"
          placeholder="Enter Longitude"
          className="w-full rounded-md border border-gray-300 px-3 text-sm h-11 shadow-sm focus:outline-none"
        />
      </div>

      {/* Threshold Radius */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Threshold Radius
        </label>
        <input
          type="text"
          placeholder="Enter Threshold Radius"
          className="w-full rounded-md border border-gray-300 px-3 text-sm h-11 shadow-sm focus:outline-none"
        />
      </div>
    </div>
  );
}
