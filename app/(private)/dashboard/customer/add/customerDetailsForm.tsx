"use client";

export default function CustomerDetailsForm() {
  const inputStyle = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0',
    height: '44px',
    padding: '0 12px',
    border: '1px solid #d1d5db', // Tailwind gray-300
    borderRadius: '4px',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Customer Type */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Customer Type</label>
        <select style={inputStyle}>
          <option value="">Select Customer Type</option>
          <option value="retail">Retail</option>
          <option value="wholesale">Wholesale</option>
          <option value="distributor">Distributor</option>
        </select>
      </div>

      {/* Customer Code */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Customer Code</label>
        <input type="text" placeholder="Enter Code" style={inputStyle} />
      </div>

      {/* SAP ID */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">SAP Id</label>
        <input type="text" placeholder="Enter SAP ID" style={inputStyle} />
      </div>

      {/* Category */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Category</label>
        <select style={inputStyle}>
          <option value="">Select Category</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
        </select>
      </div>

      {/* Sub Category */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Sub Category</label>
        <select style={inputStyle}>
          <option value="">Select Sub Category</option>
          <option value="soft-drinks">Soft Drinks</option>
          <option value="juices">Juices</option>
        </select>
      </div>

      {/* Outlet Channel */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Outlet Channel</label>
        <select style={inputStyle}>
          <option value="">Select Outlet Channel</option>
          <option value="modern-trade">Modern Trade</option>
          <option value="general-trade">General Trade</option>
        </select>
      </div>
    </div>
  );
}
