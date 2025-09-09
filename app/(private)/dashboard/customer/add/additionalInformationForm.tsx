"use client";

export default function AdditionalInformation() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Route */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Route
        </label>
        <select className="w-full h-11 rounded-md border border-gray-300 px-3 text-sm shadow-sm focus:outline-none">
          <option>Select Route</option>
          <option>Route 1</option>
          <option>Route 2</option>
        </select>
      </div>

      {/* Assign Latitude */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Assign Latitude
        </label>
        <input
          type="text"
          placeholder="Assign Latitude"
          className="w-full h-11 rounded-md border border-gray-300 px-3 text-sm shadow-sm focus:outline-none"
        />
      </div>

      {/* Assign Longitude */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Assign Longitude
        </label>
        <input
          type="text"
          placeholder="Assign Longitude"
          className="w-full h-11 rounded-md border border-gray-300 px-3 text-sm shadow-sm focus:outline-none"
        />
      </div>

      {/* Assign Accuracy */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Assign Accuracy
        </label>
        <input
          type="text"
          placeholder="Assign Accuracy"
          className="w-full h-11 rounded-md border border-gray-300 px-3 text-sm shadow-sm focus:outline-none"
        />
      </div>

      {/* Available Days */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Available Days
        </label>
        <div className="flex flex-wrap gap-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
            <button
              key={i}
              type="button"
              className={`px-4 py-1.5 rounded-full border text-sm font-medium
                ${
                  i < 5
                    ? "border-red-400 text-red-500 bg-red-50"
                    : "border-gray-300 text-gray-500 bg-gray-100"
                }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
