"use client";

export default function ContactForm() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Primary Contact */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Primary Contact
        </label>
        <div className="flex rounded-md shadow-sm border border-gray-300 overflow-hidden">
          <select className="h-11 px-2 text-sm font-medium text-gray-700 border-r border-gray-300 focus:outline-none">
            <option>UAE</option>
            <option>IN</option>
            <option>US</option>
          </select>
          <input
            type="text"
            placeholder="Contact Number"
            className="flex-1 h-11 px-3 text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Secondary Contact */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Secondary Contact
        </label>
        <div className="flex rounded-md shadow-sm border border-gray-300 overflow-hidden">
          <select className="h-11 px-2 text-sm font-medium text-gray-700 border-r border-gray-300 focus:outline-none">
            <option>UAE</option>
            <option>IN</option>
            <option>US</option>
          </select>
          <input
            type="text"
            placeholder="Secondary Contact"
            className="flex-1 h-11 px-3 text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter Email Address"
          className="w-full h-11 rounded-md border border-gray-300 px-3 text-sm shadow-sm focus:outline-none"
        />
      </div>
    </div>
  );
}
