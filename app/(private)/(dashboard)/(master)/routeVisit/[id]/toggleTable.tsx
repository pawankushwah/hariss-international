"use client";
import { Icon } from "@iconify-icon/react";
import { useState, useEffect } from "react";
import Toggle from "@/app/components/toggle";

const transformCustomerList = (apiResponse: any[]) => {
  return apiResponse.map((item) => ({
    id: item.id,
    name: `${item.owner_name} - ${item.osa_code}`,
  }));
};

// Types for customer schedule
type CustomerSchedule = {
  customer_id: number;
  days: string[];
};

type TableProps = {
  customers: any[];
  onScheduleUpdate: (schedules: CustomerSchedule[]) => void;
  initialSchedules?: CustomerSchedule[];
};

export default function Table({
  customers,
  onScheduleUpdate,
  initialSchedules = [],
}: TableProps) {
  const data = transformCustomerList(customers);

  const [rowStates, setRowStates] = useState<
    Record<
      number,
      {
        Monday: boolean;
        Tuesday: boolean;
        Wednesday: boolean;
        Thursday: boolean;
        Friday: boolean;
        Saturday: boolean;
        Sunday: boolean;
      }
    >
  >({});

  const [columnSelection, setColumnSelection] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  // Initialize row states from initialSchedules
  useEffect(() => {
    if (initialSchedules.length > 0) {
      const initialRowStates: typeof rowStates = {};

      initialSchedules.forEach((schedule) => {
        const daysMap = {
          Monday: schedule.days.includes("Monday"),
          Tuesday: schedule.days.includes("Tuesday"),
          Wednesday: schedule.days.includes("Wednesday"),
          Thursday: schedule.days.includes("Thursday"),
          Friday: schedule.days.includes("Friday"),
          Saturday: schedule.days.includes("Saturday"),
          Sunday: schedule.days.includes("Sunday"),
        };

        initialRowStates[schedule.customer_id] = daysMap;
      });

      setRowStates(initialRowStates);
    }
  }, [initialSchedules]);

  // Handle individual toggle
  const handleToggle = (
    rowId: number,
    field: keyof (typeof rowStates)[number]
  ) => {
    setRowStates((prev) => {
      const current = prev[rowId] || {
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
      };

      const updatedRow = {
        ...current,
        [field]: !current[field],
      };

      const newState = {
        ...prev,
        [rowId]: updatedRow,
      };

      // Notify parent component of schedule changes
      notifyScheduleUpdate(newState);

      return newState;
    });
  };

  // Handle column selection
  const handleColumnSelect = (day: keyof typeof columnSelection) => {
    const newColumnState = !columnSelection[day];

    // Update column selection state
    setColumnSelection((prev) => ({
      ...prev,
      [day]: newColumnState,
    }));

    // Update all rows for this column
    setRowStates((prev) => {
      const updatedStates = { ...prev };

      data.forEach((customer) => {
        const currentState = updatedStates[customer.id] || {
          Monday: false,
          Tuesday: false,
          Wednesday: false,
          Thursday: false,
          Friday: false,
          Saturday: false,
          Sunday: false,
        };

        updatedStates[customer.id] = {
          ...currentState,
          [day]: newColumnState,
        };
      });

      // Notify parent component of schedule changes
      notifyScheduleUpdate(updatedStates);

      return updatedStates;
    });
  };

  // Handle row selection
  const handleRowSelect = (rowId: number) => {
    setRowStates((prev) => {
      const current = prev[rowId] || {
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
      };

      // Check if all days in this row are currently selected
      const allSelected = Object.values(current).every(Boolean);

      // Toggle all days in the row
      const updatedRow = {
        Monday: !allSelected,
        Tuesday: !allSelected,
        Wednesday: !allSelected,
        Thursday: !allSelected,
        Friday: !allSelected,
        Saturday: !allSelected,
        Sunday: !allSelected,
      };

      const newState = {
        ...prev,
        [rowId]: updatedRow,
      };

      // Notify parent component of schedule changes
      notifyScheduleUpdate(newState);

      return newState;
    });
  };

  // Notify parent component about schedule changes
  const notifyScheduleUpdate = (currentRowStates: typeof rowStates) => {
    const schedules: CustomerSchedule[] = [];

    Object.entries(currentRowStates).forEach(([customerId, daysState]) => {
      const selectedDays = Object.entries(daysState)
        .filter(([_, isSelected]) => isSelected)
        .map(([day]) => day);

      if (selectedDays.length > 0) {
        schedules.push({
          customer_id: Number(customerId),
          days: selectedDays,
        });
      }
    });

    onScheduleUpdate(schedules);
  };

  // Check if all toggles in a column are selected
  const isColumnFullySelected = (day: keyof typeof columnSelection) => {
    if (data.length === 0) return false;

    return data.every((customer) => {
      const customerState = rowStates[customer.id];
      return customerState?.[day] === true;
    });
  };

  // Check if some toggles in a column are selected (for indeterminate state)
  const isColumnPartiallySelected = (day: keyof typeof columnSelection) => {
    if (data.length === 0) return false;

    const hasTrue = data.some((customer) => {
      const customerState = rowStates[customer.id];
      return customerState?.[day] === true;
    });

    const hasFalse = data.some((customer) => {
      const customerState = rowStates[customer.id];
      return customerState?.[day] === false;
    });

    return hasTrue && hasFalse;
  };

  // Check if all toggles in a row are selected
  const isRowFullySelected = (rowId: number) => {
    const customerState = rowStates[rowId];
    if (!customerState) return false;

    return Object.values(customerState).every(Boolean);
  };

  // Check if some toggles in a row are selected (for indeterminate state)
  const isRowPartiallySelected = (rowId: number) => {
    const customerState = rowStates[rowId];
    if (!customerState) return false;

    const hasTrue = Object.values(customerState).some(Boolean);
    const hasFalse = Object.values(customerState).some((value) => !value);

    return hasTrue && hasFalse;
  };

  return (
    <div className="w-full flex flex-col overflow-hidden">
      <div className="rounded-lg border border-[#E9EAEB] overflow-hidden">
        {/* Responsive container with horizontal scroll */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="text-[12px] bg-[#FAFAFA] text-[#535862] sticky top-0 z-20">
              <tr className="border-b-[1px] border-[#E9EAEB]">
                {/* Customer List column with select all checkbox */}
                <th className="px-4 py-3 font-[500] text-left min-w-[220px] sticky left-0 bg-[#FAFAFA] z-10 border-r border-[#E9EAEB]">
                  <div className="flex items-center gap-2">
                    <span>Customer List</span>
                  </div>
                </th>

                {/* Days columns with checkboxes */}
                {Object.keys(columnSelection).map((day) => {
                  const dayKey = day as keyof typeof columnSelection;
                  const isFullySelected = isColumnFullySelected(dayKey);
                  const isPartiallySelected = isColumnPartiallySelected(dayKey);

                  return (
                    <th
                      key={day}
                      className="px-4 py-3 font-[500] text-center min-w-[120px] border-l border-[#E9EAEB]"
                    >
                      <div className="flex flex-col items-center gap-1">
                        {/* Checkbox for column selection */}
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={isFullySelected}
                            ref={(input) => {
                              if (input) {
                                input.indeterminate = isPartiallySelected;
                              }
                            }}
                            onChange={() => handleColumnSelect(dayKey)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                        </div>
                        {/* Day name */}
                        <span className="text-xs">{day}</span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className="text-[14px] bg-white text-[#535862]">
              {data.map((row) => {
                const state = rowStates[row.id] || {
                  Monday: false,
                  Tuesday: false,
                  Wednesday: false,
                  Thursday: false,
                  Friday: false,
                  Saturday: false,
                  Sunday: false,
                };

                const isRowSelected = isRowFullySelected(row.id);
                const isRowPartial = isRowPartiallySelected(row.id);

                return (
                  <tr
                    className="border-b-[1px] border-[#E9EAEB] hover:bg-gray-50"
                    key={row.id}
                  >
                    {/* Customer name with row selection checkbox */}
                    <td className="px-4 py-3 text-left font-[500] sticky left-0 bg-white z-10 border-r border-[#E9EAEB] min-w-[220px]">
                      <div className="flex items-center gap-3">
                        {/* Row selection checkbox */}
                        <input
                          type="checkbox"
                          checked={isRowSelected}
                          ref={(input) => {
                            if (input) {
                              input.indeterminate = isRowPartial;
                            }
                          }}
                          onChange={() => handleRowSelect(row.id)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <span
                          className="truncate max-w-[160px]"
                          title={row.name}
                        >
                          {row.name}
                        </span>
                      </div>
                    </td>

                    {/* Days columns */}
                    {Object.entries(state).map(([day, isChecked]) => (
                      <td
                        key={day}
                        className="px-4 py-3 text-center border-l border-[#E9EAEB] min-w-[120px]"
                      >
                        <div className="flex justify-center">
                          <Toggle
                            isChecked={isChecked}
                            onChange={() =>
                              handleToggle(
                                row.id,
                                day as keyof (typeof rowStates)[number]
                              )
                            }
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {data.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No customers found
          </div>
        )}
      </div>

      {/* Mobile responsive view */}
      <div className="block md:hidden mt-4">
        <div className="bg-white rounded-lg border border-[#E9EAEB] p-4">
          <h3 className="font-medium text-gray-900 mb-3">Customer Schedule</h3>

          {/* Column selection for mobile */}
          <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
            {Object.keys(columnSelection).map((day) => {
              const dayKey = day as keyof typeof columnSelection;
              const isFullySelected = isColumnFullySelected(dayKey);
              const isPartiallySelected = isColumnPartiallySelected(dayKey);

              return (
                <div key={day} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={isFullySelected}
                    ref={(input) => {
                      if (input) {
                        input.indeterminate = isPartiallySelected;
                      }
                    }}
                    onChange={() => handleColumnSelect(dayKey)}
                    className="h-3 w-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-xs text-gray-600">
                    {day.slice(0, 3)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="space-y-4">
            {data.map((row) => {
              const state = rowStates[row.id] || {
                Monday: false,
                Tuesday: false,
                Wednesday: false,
                Thursday: false,
                Friday: false,
                Saturday: false,
                Sunday: false,
              };

              const isRowSelected = isRowFullySelected(row.id);
              const isRowPartial = isRowPartiallySelected(row.id);

              return (
                <div
                  key={row.id}
                  className="border-b border-gray-200 pb-4 last:border-b-0"
                >
                  {/* Customer name with row selection checkbox */}
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="checkbox"
                      checked={isRowSelected}
                      ref={(input) => {
                        if (input) {
                          input.indeterminate = isRowPartial;
                        }
                      }}
                      onChange={() => handleRowSelect(row.id)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <div className="font-medium text-gray-900">{row.name}</div>
                  </div>

                  {/* Days grid for mobile */}
                  <div className="grid grid-cols-4 gap-2">
                    {Object.entries(state).map(([day, isChecked]) => (
                      <div key={day} className="flex flex-col items-center">
                        <span className="text-xs text-gray-600 mb-1">
                          {day.slice(0, 3)}
                        </span>
                        <Toggle
                          isChecked={isChecked}
                          onChange={() =>
                            handleToggle(
                              row.id,
                              day as keyof (typeof rowStates)[number]
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
