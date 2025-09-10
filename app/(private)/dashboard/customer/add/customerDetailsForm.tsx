"use client"

import { useState } from "react";
import InputFields from "@/app/components/inputFields";

export default function CustomerDetailsForm() {
  const [customerType, setCustomerType] = useState("");
  const [customerCode, setCustomerCode] = useState("");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <InputFields
        label="Customer Type"
        value={customerType}
        onChange={(e) => setCustomerType(e.target.value)}
        options={[
          { value: "retail", label: "Retail" },
          { value: "wholesale", label: "Wholesale" },
          { value: "distributor", label: "Distributor" },
        ]}
      />

     
      <InputFields
        label="Customer Code"
        value={customerCode}
        onChange={(e) => setCustomerCode(e.target.value)}
      />

      <InputFields
        label="SAP ID"
        value={customerCode}
        onChange={(e) => setCustomerCode(e.target.value)}
      />

      <InputFields
        label="Category"
        value={customerType}
        onChange={(e) => setCustomerType(e.target.value)}
        options={[
          { value: "retail", label: "Retail" },
          { value: "wholesale", label: "Wholesale" },
          { value: "distributor", label: "Distributor" },
        ]}
      />

      <InputFields
        label="Sub Category"
        value={customerType}
        onChange={(e) => setCustomerType(e.target.value)}
        options={[
          { value: "retail", label: "Retail" },
          { value: "wholesale", label: "Wholesale" },
          { value: "distributor", label: "Distributor" },
        ]}
      />

      <InputFields
        label="Outlet Channel"
        value={customerType}
        onChange={(e) => setCustomerType(e.target.value)}
        options={[
          { value: "retail", label: "Retail" },
          { value: "wholesale", label: "Wholesale" },
          { value: "distributor", label: "Distributor" },
        ]}
      />
    </div>
  );
}
