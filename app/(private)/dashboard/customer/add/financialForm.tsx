"use client";

export default function FinancialInformation() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Credit */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Credit
        </label>
        <div className="flex rounded-md border border-gray-300 overflow-hidden">
          <input
            type="number"
            placeholder="0.00"
            className="flex-1 px-3 text-sm h-11 focus:outline-none"
          />
          <select className="px-3 text-sm text-gray-700 border-l border-gray-300 h-11 focus:outline-none">
            <option>AED</option>
            <option>USD</option>
            <option>INR</option>
          </select>
        </div>
      </div>

      {/* Credit Limit */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Credit Limit
        </label>
        <div className="flex rounded-md border border-gray-300 overflow-hidden">
          <input
            type="number"
            placeholder="0.00"
            className="flex-1 px-3 text-sm h-11 focus:outline-none"
          />
          <select className="px-3 text-sm text-gray-700 border-l border-gray-300 h-11 focus:outline-none">
            <option>AED</option>
            <option>USD</option>
            <option>INR</option>
          </select>
        </div>
      </div>

      {/* Payment Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Payment Type
        </label>
        <select className="w-full rounded-md border border-gray-300 px-3 text-sm h-11 focus:outline-none">
          <option>Select Payment Type</option>
          <option>Cash</option>
          <option>Credit</option>
          <option>Online Transfer</option>
        </select>
      </div>

      {/* Credit Days */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Credit Days
        </label>
        <input
          type="text"
          placeholder="Enter Credit Limit Days"
          className="w-full rounded-md border border-gray-300 px-3 text-sm h-11 focus:outline-none"
        />
      </div>

      {/* Fees Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fees Type
        </label>
        <select className="w-full rounded-md border border-gray-300 px-3 text-sm h-11 focus:outline-none">
          <option>Select Fees Type</option>
          <option>Fixed</option>
          <option>Percentage</option>
        </select>
      </div>

      {/* VAT No */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          VAT No
        </label>
        <input
          type="text"
          placeholder="Enter VAT No"
          className="w-full rounded-md border border-gray-300 px-3 text-sm h-11 focus:outline-none"
        />
      </div>
    </div>
  );
}
