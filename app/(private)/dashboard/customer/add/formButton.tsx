"use client";

import { Check } from "lucide-react";

export default function FormButtons() {
  

  return (
    <div className="flex justify-end gap-3 mt-6">
      {/* Cancel Button */}
      <button
        type="button"
       
        className="px-5 py-2 rounded-md border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-100"
      >
        Cancel
      </button>

      {/* Submit Button */}
      <button
        type="submit"
      
        className="px-6 py-2 rounded-md bg-red-600 text-white font-medium flex items-center gap-2 hover:bg-red-700"
      >
        <Check className="w-4 h-4" />
        Submit
      </button>
    </div>
  );
}
