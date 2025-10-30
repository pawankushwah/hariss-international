"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import StatusBtn from "@/app/components/statusBtn2";
import Table, {
    configType,
    listReturnType,
    TableDataType,
} from "@/app/components/customTable";
import SidebarBtn from "@/app/components/dashboardSidebarBtn";
import { authUserList} from "@/app/services/allApi";
import { useSnackbar } from "@/app/services/snackbarContext";
import { useLoading } from "@/app/services/loadingContext";

export default function User() {
    const [selectedUser, setSelectedUser] = useState<string>("");
    const columns: configType["columns"] = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "username", label: "Username" },
    { key: "contact_number", label: "Contact Number" },
    // helper that narrows many possible shapes (array/object/string) and extracts a human-friendly name
    {
        key: "companies",
        label: "Company",
        render: (row: TableDataType) => {
            const renderEntityNames = (val: unknown, nameKeys: string[]) => {
                if (Array.isArray(val)) {
                    const names = val
                        .map((item) => {
                            if (item == null) return null;
                            if (typeof item === "string" || typeof item === "number") return String(item);
                            if (typeof item === "object") {
                                for (const k of nameKeys) {
                                    if (k in (item as any) && (item as any)[k]) return String((item as any)[k]);
                                }
                            }
                            return null;
                        })
                        .filter(Boolean) as string[];
                    return names.length ? names.join(", ") : "-";
                }
                if (val && typeof val === "object") {
                    for (const k of nameKeys) {
                        if (k in (val as any) && (val as any)[k]) return String((val as any)[k]);
                    }
                    return "-";
                }
                if (typeof val === "string" || typeof val === "number") return String(val);
                return "-";
            };

            // the API sometimes returns companies as `companies` array, sometimes `company` object, or just ids
            return renderEntityNames((row as any).companies ?? (row as any).company ?? (row as any).company_ids, [
                "company_name",
                "company_code",
                "company",
            ]);
        },
    },
    {
        key: "warehouse",
        label: "Warehouse",
        render: (row: TableDataType) =>
            // warehouses can be an array or single object or id list
            ((() => {
                const renderEntityNames = (val: unknown, nameKeys: string[]) => {
                    if (Array.isArray(val)) {
                        const names = val
                            .map((item) => {
                                if (item == null) return null;
                                if (typeof item === "string" || typeof item === "number") return String(item);
                                if (typeof item === "object") {
                                    for (const k of nameKeys) {
                                        if (k in (item as any) && (item as any)[k]) return String((item as any)[k]);
                                    }
                                }
                                return null;
                            })
                            .filter(Boolean) as string[];
                        return names.length ? names.join(", ") : "-";
                    }
                    if (val && typeof val === "object") {
                        for (const k of nameKeys) {
                            if (k in (val as any) && (val as any)[k]) return String((val as any)[k]);
                        }
                        return "-";
                    }
                    if (typeof val === "string" || typeof val === "number") return String(val);
                    return "-";
                };

                return renderEntityNames((row as any).warehouses ?? (row as any).warehouse ?? (row as any).warehouse_ids, [
                    "warehouse_name",
                    "warehouse_code",
                    "name",
                ]);
            })()),
    },
    {
        key: "route",
        label: "Route",
        render: (row: TableDataType) => {
            const renderEntityNames = (val: unknown, nameKeys: string[]) => {
                if (Array.isArray(val)) {
                    const names = val
                        .map((item) => {
                            if (item == null) return null;
                            if (typeof item === "string" || typeof item === "number") return String(item);
                            if (typeof item === "object") {
                                for (const k of nameKeys) {
                                    if (k in (item as any) && (item as any)[k]) return String((item as any)[k]);
                                }
                            }
                            return null;
                        })
                        .filter(Boolean) as string[];
                    return names.length ? names.join(", ") : "-";
                }
                if (val && typeof val === "object") {
                    for (const k of nameKeys) {
                        if (k in (val as any) && (val as any)[k]) return String((val as any)[k]);
                    }
                    return "-";
                }
                if (typeof val === "string" || typeof val === "number") return String(val);
                return "-";
            };
            return renderEntityNames((row as any).routes ?? (row as any).route ?? (row as any).route_ids, [
                "route_name",
                "route_code",
                "route_name",
            ]);
        },
    },
    {
        key: "salesman",
        label: "Salesman",
        render: (row: TableDataType) =>
            ((() => {
                const renderEntityNames = (val: unknown, nameKeys: string[]) => {
                    if (Array.isArray(val)) {
                        const names = val
                            .map((item) => {
                                if (item == null) return null;
                                if (typeof item === "string" || typeof item === "number") return String(item);
                                if (typeof item === "object") {
                                    for (const k of nameKeys) {
                                        if (k in (item as any) && (item as any)[k]) return String((item as any)[k]);
                                    }
                                }
                                return null;
                            })
                            .filter(Boolean) as string[];
                        return names.length ? names.join(", ") : "-";
                    }
                    if (val && typeof val === "object") {
                        for (const k of nameKeys) {
                            if (k in (val as any) && (val as any)[k]) return String((val as any)[k]);
                        }
                        return "-";
                    }
                    if (typeof val === "string" || typeof val === "number") return String(val);
                    return "-";
                };

                return renderEntityNames((row as any).salesmen ?? (row as any).salesman ?? (row as any).salesman_ids, [
                    "name",
                    "osa_code",
                ]);
            })()),
    },
    {
        key: "region",
        label: "Region",
        render: (row: TableDataType) =>
            ((() => {
                const renderEntityNames = (val: unknown, nameKeys: string[]) => {
                    if (Array.isArray(val)) {
                        const names = val
                            .map((item) => {
                                if (item == null) return null;
                                if (typeof item === "string" || typeof item === "number") return String(item);
                                if (typeof item === "object") {
                                    for (const k of nameKeys) {
                                        if (k in (item as any) && (item as any)[k]) return String((item as any)[k]);
                                    }
                                }
                                return null;
                            })
                            .filter(Boolean) as string[];
                        return names.length ? names.join(", ") : "-";
                    }
                    if (val && typeof val === "object") {
                        for (const k of nameKeys) {
                            if (k in (val as any) && (val as any)[k]) return String((val as any)[k]);
                        }
                        return "-";
                    }
                    if (typeof val === "string" || typeof val === "number") return String(val);
                    return "-";
                };

                return renderEntityNames((row as any).regions ?? (row as any).region ?? (row as any).region_ids, [
                    "region_name",
                    "region_code",
                ]);
            })()),
    },
    {
        key: "area",
        label: "Area",
        render: (row: TableDataType) =>
            ((() => {
                const renderEntityNames = (val: unknown, nameKeys: string[]) => {
                    if (Array.isArray(val)) {
                        const names = val
                            .map((item) => {
                                if (item == null) return null;
                                if (typeof item === "string" || typeof item === "number") return String(item);
                                if (typeof item === "object") {
                                    for (const k of nameKeys) {
                                        if (k in (item as any) && (item as any)[k]) return String((item as any)[k]);
                                    }
                                }
                                return null;
                            })
                            .filter(Boolean) as string[];
                        return names.length ? names.join(", ") : "-";
                    }
                    if (val && typeof val === "object") {
                        for (const k of nameKeys) {
                            if (k in (val as any) && (val as any)[k]) return String((val as any)[k]);
                        }
                        return "-";
                    }
                    if (typeof val === "string" || typeof val === "number") return String(val);
                    return "-";
                };

                return renderEntityNames((row as any).areas ?? (row as any).area ?? (row as any).area_ids, [
                    "area_name",
                    "area_code",
                ]);
            })()),
    },
    {
        key: "outlet_channel",
        label: "Outlet Channel",
        render: (row: TableDataType) =>
            ((() => {
                const renderEntityNames = (val: unknown, nameKeys: string[]) => {
                    if (Array.isArray(val)) {
                        const names = val
                            .map((item) => {
                                if (item == null) return null;
                                if (typeof item === "string" || typeof item === "number") return String(item);
                                if (typeof item === "object") {
                                    for (const k of nameKeys) {
                                        if (k in (item as any) && (item as any)[k]) return String((item as any)[k]);
                                    }
                                }
                                return null;
                            })
                            .filter(Boolean) as string[];
                        return names.length ? names.join(", ") : "-";
                    }
                    if (val && typeof val === "object") {
                        for (const k of nameKeys) {
                            if (k in (val as any) && (val as any)[k]) return String((val as any)[k]);
                        }
                        return "-";
                    }
                    if (typeof val === "string" || typeof val === "number") return String(val);
                    return "-";
                };

                return renderEntityNames((row as any).outlet_channels ?? (row as any).outlet_channel ?? (row as any).outlet_channel_ids, [
                    "outlet_channel",
                    "outlet_channel_code",
                    "outlet_channel_name",
                ]);
            })()),
    },
    // {
    //     key: "status",
    //     label: "Status",
    //     render: (row: TableDataType) => {
    //         // Treat status 1 or 'active' (case-insensitive) as active
    //         const isActive =
    //             String(row.status) === "1" ||
    //             (typeof row.status === "string" &&
    //                 row.status.toLowerCase() === "active");
    //         return <StatusBtn isActive={isActive} />;
    //     },
    //     showByDefault: true,
    // },
    ];

    const { setLoading } = useLoading();
    const [refreshKey, setRefreshKey] = useState(0);
    const router = useRouter();
    const { showSnackbar } = useSnackbar();
    type TableRow = TableDataType & { id?: string };

    const fetchUser = useCallback(
        async (
            page: number = 1,
            pageSize: number = 50
        ): Promise<listReturnType> => {
            try {
                setLoading(true);
                // const params: any = {
                //     page: page.toString(),
                // };
                const listRes = await authUserList({});
                setLoading(false);
                return {
                    data: Array.isArray(listRes.data) ? listRes.data : [],
                    total: listRes?.pagination?.totalPages || 1,
                    currentPage: listRes?.pagination?.page || 1,
                    pageSize: listRes?.pagination?.limit || pageSize,
                };
            } catch (error: unknown) {
                setLoading(false);
                showSnackbar("Error fetching user data", "error");
                return {
                    data: [],
                    total: 1,
                    currentPage: 1,
                    pageSize: 50,
                };
            }
        },
        [selectedUser, setLoading]
    );

    useEffect(() => {
        setLoading(true);
    }, []);

    return (
        <>
            <div className="flex flex-col h-full">
                <Table
                    refreshKey={refreshKey}
                    config={{
                        api: { list: fetchUser },
                        header: {
                            title: "Users",
                            searchBar: false,
                            columnFilter: true,
                            actions: [
                                <SidebarBtn
                                    key={0}
                                    href="/settings/user/add"
                                    isActive
                                    leadingIcon="lucide:plus"
                                    label="Add"
                                    labelTw="hidden sm:block"
                                />,
                            ],
                        },
                        localStorageKey: "user-table",
                        footer: { nextPrevBtn: true, pagination: true },
                        columns,
                        rowSelection: true,
                        rowActions: [
                            // {
                            //     icon: "lucide:eye",
                            //     onClick: (data: object) => {
                            //         const row = data as TableRow;
                            //         router.push(`/agentCustomer/details/${row.uuid}`);
                            //     },
                            // },
                            // {
                            //     icon: "lucide:edit-2",
                            //     onClick: (data: object) => {
                            //         const row = data as TableRow;
                            //         router.push(
                            //             `/settings/user/${row.id}`
                            //         );
                            //     },
                            // },
                        ],
                        pageSize: 50,
                    }}
                />
            </div>
        </>
    );
}
