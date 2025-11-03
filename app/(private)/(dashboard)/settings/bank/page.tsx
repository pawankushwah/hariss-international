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
import { getbankList } from "@/app/services/allApi";
import { useSnackbar } from "@/app/services/snackbarContext";
import { useLoading } from "@/app/services/loadingContext";

export default function bank() {
  const [selectedbank, setSelectedbank] = useState<string>("");
  const { setLoading } = useLoading();
  const [refreshKey, setRefreshKey] = useState(0);
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  type TableRow = TableDataType & { uuid?: string };

  const columns: configType["columns"] = [
    { key: "osa_code", label: "OSA Code", showByDefault: true },
    { key: "bank_name", label: "Bank Name", showByDefault: true },
    { key: "branch", label: "Branch", showByDefault: true },
    { key: "city", label: "City", showByDefault: true },
    { key: "account_number", label: "Account Number", showByDefault: true },
    {
      key: "status",
      label: "Status",
      render: (row: TableDataType) => {
        const isActive =
          String(row.status) === "1" ||
          (typeof row.status === "string" &&
            row.status.toLowerCase() === "active");
        return <StatusBtn isActive={isActive} />;
      },
      showByDefault: true,
    },
  ];
  const fetchbank = useCallback(
    async (
      page: number = 1,
      pageSize: number = 50
    ): Promise<listReturnType> => {
      try {
        setLoading(true);

        // Correct parameter names according to Swagger
        const res = await getbankList({
          page, // optional if supported
          per_page: pageSize, // correct pagination param name
        });

        setLoading(false);

        if (res?.status === "success") {
          return {
            data: Array.isArray(res.data) ? res.data : [],
            total: res.pagination?.totalRecords || 0,
            currentPage: res.pagination?.page || 1,
            pageSize: res.pagination?.limit || pageSize,
          };
        } else {
          showSnackbar("Failed to fetch banks", "error");
          return {
            data: [],
            total: 0,
            currentPage: 1,
            pageSize,
          };
        }
      } catch (error) {
        console.error("Error fetching banks:", error);
        setLoading(false);
        showSnackbar("Error fetching bank data", "error");
        return {
          data: [],
          total: 0,
          currentPage: 1,
          pageSize,
        };
      }
    },
    [selectedbank, setLoading]
  );

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <Table
        refreshKey={refreshKey}
        config={{
          api: { list: fetchbank },
          header: {
            title: "Bank",
            searchBar: false,
            columnFilter: true,
            actions: [
              <SidebarBtn
                key={0}
                href="/settings/bank/add"
                isActive
                leadingIcon="lucide:plus"
                label="Add"
                labelTw="hidden sm:block"
              />,
            ],
          },
          localStorageKey: "bank-table",
          footer: { nextPrevBtn: true, pagination: true },
          columns,
          rowSelection: true,
          rowActions: [
            {
              icon: "lucide:edit-2",
              onClick: (data: object) => {
                const row = data as TableRow;
                router.push(`/settings/bank/${row.uuid}`);
              },
            },
          ],
          pageSize: 50,
        }}
      />
    </div>
  );
}
