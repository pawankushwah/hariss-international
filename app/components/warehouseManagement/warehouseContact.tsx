"use client";

import { useState } from "react";
import InputFields from "@/app/components/inputFields";

export default function WarehouseContactDetails() {
  const [primaryCode, setPrimaryCode] = useState("uae");
  const [contact, setContact] = useState("");
  const [tinCode, setTinCode] = useState("uae");
  const [tinNumber, setTinNumber] = useState("");
  const [email, setEmail] = useState("");

  const countryOptions = [
    { value: "uae", label: "UAE" },
    { value: "in", label: "India" },
    { value: "us", label: "USA" },
    { value: "uk", label: "UK" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
      {/* Primary Contact */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm font-medium text-gray-700">Contact</label>
        <div className="flex w-full">
          <select
            value={primaryCode}
            onChange={(e) => setPrimaryCode(e.target.value)}
            className="border h-[44px] border-gray-300 rounded-l-md px-3 text-gray-900 w-[35%] sm:w-[30%] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {countryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Contact Number"
            className="border border-gray-300 h-[44px] rounded-r-md px-3 text-gray-900 placeholder-gray-400 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Tin Number */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm font-medium text-gray-700">Tin Number</label>
        <div className="flex w-full">
          <select
            value={tinCode}
            onChange={(e) => setTinCode(e.target.value)}
            className="border border-gray-300 rounded-l-md px-3 text-gray-900 h-[44px] w-[35%] sm:w-[30%] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {countryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={tinNumber}
            onChange={(e) => setTinNumber(e.target.value)}
            placeholder="Tin Number"
            className="border border-gray-300 h-[44px] rounded-r-md px-3 text-gray-900 placeholder-gray-400 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Email */}
      <div className="w-full">
        <InputFields
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
      </div>
    </div>
  );
}
