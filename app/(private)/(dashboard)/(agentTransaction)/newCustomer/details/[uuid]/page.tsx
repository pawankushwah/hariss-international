"use client";

import ContainerCard from "@/app/components/containerCard";
import StatusBtn from "@/app/components/statusBtn2";
import { Icon } from "@iconify-icon/react";
import { useParams, useRouter } from "next/navigation";
import Overview from "./overview";
import Additional from "./additional";
import Location from "./location";
import TabBtn from "@/app/components/tabBtn";
import { useEffect, useState } from "react";
import { useSnackbar } from "@/app/services/snackbarContext";
import { useLoading } from "@/app/services/loadingContext";
import { newCustomerById, newCustomerStatusUpdate } from "@/app/services/agentTransaction";
import Financial from "./financial";

export interface NewCustomerDetails {
  id: string;
  uuid: string;
  osa_code: string;
  name: string;
  contact_no: string;
  contact_no2: string;
  whatsapp_no: string;
  is_whatsapp: string;
  vat_no: string;
  get_warehouse: { warehouse_code: string; warehouse_name: string };
  district: string;
  street: string;
  landmark: string;
  town: string;
  owner_name: string;
  latitude: string;
  longitude: string;
  creditday: string;
  payment_type: string;
  buyertype: string;
  credit_limit: string;
  outlet_channel: { outlet_channel: string; outlet_channel_code: string };
  region: { region_code: string; region_name: string };
  customertype: { name: string; code: string };
  route: { route_name: string; route_code: string };
  category: { customer_category_name: string; customer_category_code: string };
  subcategory: { customer_sub_category_name: string; customer_sub_category_code: string };
  approval_status?: number;
  reject_reason?: string;
  status: number | string;
}

const tabs = ["Overview"];

export default function CustomerDetails() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const { showSnackbar } = useSnackbar();
  const { setLoading } = useLoading();

  const params = useParams();
  let uuid: string = "";
  if (params.uuid) {
    uuid = Array.isArray(params.uuid) ? params.uuid[0] : (params.uuid as string);
  }

  const [item, setItem] = useState<NewCustomerDetails | null>(null);

  useEffect(() => {
    if (!uuid) return;
    let mounted = true;
    const fetchCustomerDetails = async () => {
      setLoading(true);
      try {
        const res = await newCustomerById(uuid);
        if (!mounted) return;
        if (res?.error) {
          showSnackbar(res?.data?.message || "Unable to fetch New Customer Details", "error");
          return;
        }
        setItem(res.data);
      } catch (err) {
        if (mounted) {
          showSnackbar("Unable to fetch New Customer Details", "error");
          console.error(err);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchCustomerDetails();
    return () => {
      mounted = false;
    };
  }, [uuid]);

  const handleApproval = async (status: number, reason?: string) => {
    if (!item?.uuid) return;
    try {
      setLoading(true);
      const payload: any = {
        ids: [item.uuid],
        approval_status: status, // 1 = Approve, 2 = Reject
      };
      if (reason) payload.reject_reason = reason;

      const res = await newCustomerStatusUpdate(payload);
      if (res.error) {
        showSnackbar(res.data.message || "Failed to update status", "error");
        return;
      }

      showSnackbar(
        status === 1 ? "Customer approved successfully" : "Customer rejected successfully",
        "success"
      );

      // Refresh
      const updated = await newCustomerById(item.uuid);
      setItem(updated.data);
    } catch (error) {
      console.error(error);
      showSnackbar("Something went wrong", "error");
    } finally {
      setLoading(false);
      setShowRejectPopup(false);
      setRejectReason("");
      setShowMenu(false);
    }
  };

  return (
    <>
      {/* header */}
      <div className="flex justify-between items-center mb-[20px]">
        <div className="flex items-center gap-[16px]">
          <Icon icon="lucide:arrow-left" width={24} onClick={() => router.back()} />
          <h1 className="text-[20px] font-semibold text-[#181D27]">New Customer Details</h1>
        </div>
         <div className="flex items-center gap-[10px] border border-[#D5D7DA]   relative  rounded-lg  px-1 bg-[#FFFFFF]  opacity-100">
          {/* <StatusBtn isActive={item?.status ? true : false} /> */}

          {/* 3-dot menu button */}
          <button
            onClick={() => setShowMenu((prev) => !prev)}    
            className="p-2 rounded-full"
          >
            <Icon icon="lucide:more-vertical" width={22} />
          </button>

          {/* dropdown menu */}
          {showMenu && (
            <div className="absolute right-0 top-12 bg-[#FFFFFF] shadow-lg rounded-lg border border-gray-200 w-[226px] z-10">
              <button
                onClick={() => handleApproval(1)}
                className="w-full text-left px-4 py-3 hover:bg-green-50 text-green-700"
              >
                ✅ Approve
              </button>
              <button
                onClick={() => {
                  setShowRejectPopup(true);
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-700"
              >
                ❌ Reject
              </button>
            </div>
          )}
        </div>
      </div>

      <ContainerCard className="w-full flex flex-col sm:flex-row items-center justify-between gap-[10px] md:gap-0 relative">
        {/* profile details */}
        <div className="flex flex-col sm:flex-row items-center gap-[20px]">
          <div className="w-[80px] h-[80px] flex justify-center items-center rounded-full bg-[#E9EAEB]">
            <Icon icon="gridicons:user" width={40} className="text-[#535862] scale-[1.5]" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-[20px] font-semibold text-[#181D27] mb-[10px]">
              {item?.osa_code || ""} - {item?.name || "Customer Name"}
            </h2>
            <span className="flex items-center text-[#414651] text-[16px]">
              <Icon icon="mdi:location" width={16} className="text-[#EA0A2A] mr-[5px]" />
              <span>{item?.district}</span>
            </span>
          </div>
        </div>

        {/* right side buttons */}
       <div className="flex items-center gap-[10px] relative">
        <StatusBtn isActive={item?.status ? true : false} />
  </div>
      </ContainerCard>
  
      {/* Tabs */}
      <ContainerCard className="w-full flex gap-[4px] overflow-x-auto" padding="5px">
        {tabs.map((tab, index) => (
          <div key={index}>
            <TabBtn label={tab} isActive={activeTab === tab} onClick={() => setActiveTab(tab)} />
          </div>
        ))}
      </ContainerCard>

      {activeTab === "Overview" && (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[10px]">
          <Overview data={item} />
          <Financial data={item} />
          <Additional data={item} />
          <Location data={item} />
        </div>
      )}

      {/* Reject Reason Popup */}
      {showRejectPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px]">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Enter Reject Reason</h2>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter reason..."
              className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
              rows={3}
            ></textarea>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowRejectPopup(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleApproval(2, rejectReason)}
                disabled={!rejectReason.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
