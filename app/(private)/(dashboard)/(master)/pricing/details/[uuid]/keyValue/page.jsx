import React, { useState } from "react";

// Static mapping as given
const initialKeys = [
  {
    type: "Location",
    options: [
      { id: "1", label: "Company", isSelected: false },
      { id: "2", label: "Region", isSelected: false },
      { id: "3", label: "Warehouse", isSelected: false },
      { id: "4", label: "Area", isSelected: false },
      { id: "5", label: "Route", isSelected: false },
    ],
  },
  {
    type: "Customer",
    options: [
      { id: "6", label: "Customer Type", isSelected: false },
      { id: "7", label: "Channel", isSelected: false },
      { id: "8", label: "Customer Category", isSelected: false },
      { id: "9", label: "Customer", isSelected: false },
    ],
  },
  {
    type: "Item",
    options: [
      { id: "10", label: "Item Category", isSelected: false },
      { id: "11", label: "Item", isSelected: false },
    ],
  },
];

// Helper to find id by label and type
function getKeyIdByLabel(type, targetLabel) {
  const group = initialKeys.find(g => g.type === type);
  if (!group) return null;
  const found = group.options.find(opt => opt.label === targetLabel);
  return found ? found.id : null;
}

// Helper to guess type for mapping (customize as needed)
function guessTypeByKey(key) {
  if (["Sub Channel", "Customer Category", "Customer Type", "Channel", "Customer"].includes(key)) return "Customer";
  if (["Company", "Region", "Warehouse", "Area", "Route"].includes(key)) return "Location";
  if (key === "Item" || key === "Item Category") return "Item";
  return ""; // fallback
}

// Collapsible field component as required
function CollapsibleField({ label, values }) {
  const [expanded, setExpanded] = useState(false);

  if (!values || values.length === 0) return null;

  // If only one value, display it inline
  if (values.length === 1) {
    return (
      <div style={{ display: "flex", borderBottom: "1px solid #eee", alignItems: "center", minHeight: 50 }}>
        <div style={{ flex: 1, padding: "12px 16px" }}>{label}</div>
        <div style={{ flex: 3, textAlign: "right", padding: "12px 16px" }}>{values[0]}</div>
      </div>
    );
  }

  // Otherwise show with expandable control
  return (
    <div style={{ borderBottom: "1px solid #eee", minHeight: 50 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1, padding: "12px 16px" }}>{label}</div>
        <div style={{ flex: 3, textAlign: "right", padding: "12px 16px" }}>
          {values[0]} & {values.length - 1} more...
          <span
            style={{ marginLeft: 12, cursor: "pointer", color: "#37a08e", fontWeight: "bold" }}
            onClick={() => setExpanded(e => !e)}
          >
            {expanded ? "▲" : "▼"}
          </span>
        </div>
      </div>
      {expanded && (
        <table style={{ width: "100%", background: "#fafafa", marginBottom: 6 }}>
          <tbody>
            {values.map((v, i) => (
              <tr key={i}>
                <td style={{ padding: "8px 16px" }}>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Id-extraction utility—returns all mapped ids for summary/debug/audit
function getAllSelectedIds(data, initialKeys) {
  const ids = [];
  Object.entries(data).forEach(([key, vals]) => {
    const type = guessTypeByKey(key);
    vals.forEach(v => {
      const id = getKeyIdByLabel(type, v);
      if (id) ids.push(Number(id));
    });
  });
  return ids;
}

// Example "list response" like in your system
const selected = {
  "Sub Channel": ["CARD HOLDERS"],           // Single value
  "Customer": ["villa Iantana Villa 386 Al Barsha 2 - 173758"],
  "Item": [
    "Tissue White 100 x 2PLY 1x36",
    "Tissue Blue 2PLY 1x24",
    "Hand Towel 1x12",
    "Facial Tissue 1x48",
    "Roll 1x9",
    "Napkin 1x24",
    "Folded Towel 1x10",
    "Box 1x18",
    "Paper Towel 1x6",
    "Kitchen Roll 1x4"
  ]
};

// Main display component
export default function KeyValue() {
  // IDs selected—can be POSTed, displayed, etc.
  const selectedIds = getAllSelectedIds(selected, initialKeys);

  return (
    <div style={{ maxWidth: 900, margin: "30px auto", border: "1px solid #eee", borderRadius: 6 }}>
      {/* Display each field using CollapsibleField for your layout */}
      {Object.entries(selected).map(([key, vals]) =>
        <CollapsibleField key={key} label={key} values={vals} />
      )}
      {/* Show the selected IDs */}
      <div style={{ margin: 20, fontSize: 14, color: "#888" }}>
        Selected static ids: {JSON.stringify(selectedIds)}
      </div>
    </div>
  );
}
