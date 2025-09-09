"use client";

export default function TransactionPromotion() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
      {/* Barcode */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Barcode
        </label>
        <input
          type="text"
          placeholder="Enter Barcode"
          className="w-full rounded-md border border-gray-300 px-3 text-sm h-11 shadow-sm focus:outline-none"
        />
      </div>

      {/* Enable Promo Txn */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Enable Promo Txn
        </label>
        <div className="flex items-center gap-6 mt-2">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="radio" name="promoTxn" value="yes" className="h-4 w-4" defaultChecked />
            Yes
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="radio" name="promoTxn" value="no" className="h-4 w-4" />
            No
          </label>
        </div>
      </div>

      {/* Assign QR Value */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Assign QR Value
        </label>
        <input
          type="text"
          placeholder="Assign QR Value"
          className="w-full rounded-md border border-gray-300 px-3 text-sm h-11 shadow-sm focus:outline-none"
        />
      </div>
    </div>
  );
}
