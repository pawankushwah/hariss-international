"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ContainerCard from "@/app/components/containerCard";
import InputFields from "@/app/components/inputFields";
import Table, { TableDataType } from "@/app/components/customTable";
import SidebarBtn from "@/app/components/dashboardSidebarBtn";
import { Icon } from "@iconify-icon/react";

/* ---------------- MOCK DATA ---------------- */

const warehouseOptions = [
    { value: "1", label: "Warehouse A" },
    { value: "2", label: "Warehouse B" },
];

const salesmanOptions = [
    { value: "1", label: "Salesman John" },
    { value: "2", label: "Salesman Alex" },
];

const initialItems: TableDataType[] = [
    {
        id: 1,
        item_code: "ITEM-001",
        name: "Product One",
        cse_qty: "",
        pcs_qty: "",
        warehouse_stocks: [{ warehouse_id: "1", qty: 120 }],
    },
    {
        id: 2,
        item_code: "ITEM-002",
        name: "Product Two",
        cse_qty: "",
        pcs_qty: "",
        warehouse_stocks: [{ warehouse_id: "1", qty: 80 }],
    },
];

/* ---------------- COMPONENT ---------------- */

export default function AddSalesmanLoadUI() {
    const router = useRouter();

    /* -------- FORM STATE -------- */
    const [form, setForm] = useState({
        warehouse: "",
        salesman: "",
    });

    /* -------- ITEM TABLE STATE -------- */
    const [itemData, setItemData] = useState<TableDataType[]>(initialItems);

    /* -------- PAYMENT STATE -------- */
    const [payment, setPayment] = useState({
        total: "",
        cash: "",
        credit: "",
    });

    /* -------- MODAL STATE -------- */
    const [showMismatchModal, setShowMismatchModal] = useState(false);

    /* -------- MEMOIZED TABLE DATA -------- */
    const tableData = useMemo(() => {
        return itemData.map((row, idx) => ({
            ...row,
            idx,
        }));
    }, [itemData]);

    /* -------- HANDLERS -------- */

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const updateQty = (index: number, field: string, value: string) => {
        setItemData((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    };

    const handlePaymentChange = (field: string, value: string) => {
        setPayment((prev) => {
            const updated = { ...prev, [field]: value };

            const cash = Number(updated.cash || 0);
            const credit = Number(updated.credit || 0);

            return {
                ...updated,
                total: String(cash + credit),
            };
        });
    };

    /* -------- SUBMIT LOGIC -------- */

    const handleSubmit = () => {
        const cash = Number(payment.cash || 0);
        const credit = Number(payment.credit || 0);
        const total = Number(payment.total || 0);

        if (cash + credit !== total) {
            setShowMismatchModal(true);
            return;
        }

        // ✅ No mismatch → submit directly
        submitData();
    };

    const submitData = () => {
        console.log("Submitted Data:", {
            form,
            itemData,
            payment,
        });

        // API call or navigation here
    };

    /* ---------------- UI ---------------- */

    return (
        <div className="flex flex-col">
            {/* -------- HEADER -------- */}
            <div className="flex items-center gap-4 mb-5">
                <Icon
                    icon="lucide:arrow-left"
                    width={24}
                    className="cursor-pointer"
                    onClick={() => router.back()}
                />
                <h1 className="text-[20px] font-semibold text-[#181D27]">
                    Add Sales Team Load
                </h1>
            </div>

            <ContainerCard className="rounded-[10px]">
                {/* -------- FORM -------- */}
                <div className="flex flex-col w-full sm:w-[30%] gap-4 mb-6">
                    <InputFields
                        label="Distributor"
                        value={form.warehouse}
                        options={warehouseOptions}
                        onChange={(e) =>
                            handleChange("warehouse", e.target.value)
                        }
                    />

                    <InputFields
                        label="Sales Team"
                        value={form.salesman}
                        options={salesmanOptions}
                        onChange={(e) =>
                            handleChange("salesman", e.target.value)
                        }
                    />
                </div>

                {/* -------- TABLE -------- */}
                <Table
                    data={tableData}
                    config={{
                        table: { height: 400 },
                        columns: [
                            {
                                key: "item",
                                label: "Item",
                                render: (row: any) =>
                                    `${row.item_code} - ${row.name}`,
                            },
                            {
                                key: "stock",
                                label: "Available Stock",
                                render: (row: any) =>
                                    row.warehouse_stocks?.[0]?.qty ?? 0,
                            },
                            {
                                key: "cse_qty",
                                label: "CSE",
                                render: (row: any) => (
                                    <InputFields
                                        type="number"
                                        value={row.cse_qty}
                                        onChange={(e) =>
                                            updateQty(
                                                row.idx,
                                                "cse_qty",
                                                e.target.value
                                            )
                                        }
                                    />
                                ),
                            },
                            {
                                key: "pcs_qty",
                                label: "PCS",
                                render: (row: any) => (
                                    <InputFields
                                        type="number"
                                        value={row.pcs_qty}
                                        onChange={(e) =>
                                            updateQty(
                                                row.idx,
                                                "pcs_qty",
                                                e.target.value
                                            )
                                        }
                                    />
                                ),
                            },
                        ],
                        pageSize: 100,
                    }}
                />

                {/* -------- PAYMENT -------- */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                    <InputFields
                        label="Total Amount"
                        type="number"
                        value={payment.total}
                        // disabled
                        onChange={(e) =>
                            handlePaymentChange("total", e.target.value)
                        }
                    />

                    <InputFields
                        label="Cash"
                        value={payment.cash}
                        onChange={(e) =>
                            handlePaymentChange("cash", e.target.value)
                        }
                    />

                    <InputFields
                        label="Credit"
                        value={payment.credit}
                        onChange={(e) =>
                            handlePaymentChange("credit", e.target.value)
                        }
                    />
                </div>

                {/* -------- ACTIONS -------- */}
                <hr className="my-6" />

                <div className="flex justify-end gap-4">
                    <button
                        className="px-6 py-2 rounded-lg border border-gray-300"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </button>

                    <SidebarBtn
                        isActive
                        label="Create Order"
                        onClick={handleSubmit}
                    />
                </div>
            </ContainerCard>

            {/* -------- CONFIRM MODAL -------- */}
            {showMismatchModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-lg w-[400px] p-6">
                        <h2 className="text-lg font-semibold mb-3">
                            Amount Mismatch
                        </h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Cash + Credit does not match the total amount.
                            Do you want to proceed anyway?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 border rounded-md"
                                onClick={() => setShowMismatchModal(false)}
                            >
                                No
                            </button>

                            <button
                                className="px-4 py-2 bg-[#181D27] text-white rounded-md"
                                onClick={() => {
                                    setShowMismatchModal(false);
                                    submitData();
                                }}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
