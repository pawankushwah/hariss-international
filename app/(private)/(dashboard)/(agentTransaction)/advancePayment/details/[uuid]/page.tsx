"use client";

import { getPaymentById } from "@/app/services/allApi";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/app/components/Loading";
import ContainerCard from "@/app/components/containerCard";
import Link from "next/link";
import { Icon } from "@iconify-icon/react";

interface PaymentData {
  osa_code: string;
  payment_type: string;
  companybank_id: string;
  cheque_no: string;
  cheque_date: string;
  agent_id: string;
  amount: string;
  recipt_no: string;
  recipt_date: string;
  recipt_image: string | null;
  status: string;
}

const PaymentDetails = () => {
  const params = useParams();
  const id = params.uuid; // Changed from params.id to params.uuid since your folder is [uuid]
  const [data, setData] = useState<PaymentData | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id && id !== "add") {
      setIsEditMode(true);
      setLoading(true);
      (async () => {
        try {
          const res = await getPaymentById(String(id));
          if (res?.data) {
            const responseData = res.data;

            console.log("Edit mode data:", responseData);

            // Map numeric payment type back to string
            const paymentTypeMap: { [key: number]: string } = {
              1: "cash",
              2: "cheque",
              3: "transfer",
            };

            // Convert agent_id to string for Formik
            const agentIdValue = responseData.agent_id?.toString() || "";

            const paymentData: PaymentData = {
              osa_code: responseData.osa_code || "",
              payment_type: paymentTypeMap[responseData.payment_type] || "",
              companybank_id: responseData.companybank_id?.toString() || "",
              cheque_no: responseData.cheque_no || "",
              cheque_date: responseData.cheque_date || "",
              agent_id: agentIdValue,
              amount: responseData.amount?.toString() || "",
              recipt_no: responseData.recipt_no || "",
              recipt_date: responseData.recipt_date || "",
              recipt_image: responseData.recipt_image || null,
              status: responseData.status === 1 ? "active" : "inactive",
            };

            setData(paymentData);

            console.log("Form values set:", paymentData);
          } else {
            console.error("Failed to load payment data");
          }
        } catch (error) {
          console.error("Failed to fetch Payment details", error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id]);

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  // Format currency
  const formatCurrency = (amount: string) => {
    if (!amount) return "N/A";
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  if (loading) {
    return <Loading />;
  }

  if (!data && !loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg text-red-500">Payment data not found</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/advancePayment">
          <Icon icon="lucide:arrow-left" width={24} />
        </Link>
        <h1 className="text-xl font-semibold mb-1">Payment Details</h1>
      </div>
      <ContainerCard>
        <div className="bg-white rounded-lg">
          {/* Basic Information */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  OSA Code
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {data?.osa_code || "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <p className="mt-1 text-sm">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      data?.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {data?.status || "N/A"}
                  </span>
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <p className="mt-1 text-sm text-gray-900 font-semibold">
                  {data?.amount ? formatCurrency(data.amount) : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
              Payment Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Payment Type
                </label>
                <p className="mt-1 text-sm text-gray-900 capitalize">
                  {data?.payment_type || "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bank ID
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {data?.companybank_id || "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Agent ID
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {data?.agent_id || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Cheque Information (Conditional) */}
          {(data?.payment_type === "cheque" || data?.cheque_no) && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
                Cheque Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cheque Number
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {data?.cheque_no || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cheque Date
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {data?.cheque_date ? formatDate(data.cheque_date) : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Receipt Information */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
              Receipt Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Receipt Number
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {data?.recipt_no || "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Receipt Date
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {data?.recipt_date ? formatDate(data.recipt_date) : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Receipt Image */}
          {data?.recipt_image && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
                Receipt Image
              </h2>
              <div className="flex justify-center">
                <img
                  src={data.recipt_image}
                  alt="Receipt"
                  className="max-w-full h-auto max-h-64 rounded-lg"
                  onError={(e) => {
                    // Handle broken images
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </ContainerCard>
    </>
  );
};

export default PaymentDetails;
