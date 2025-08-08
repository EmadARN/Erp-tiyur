import { useState } from "react";
import { DataTable } from "@/modules/shared/components/table/DataTable";
import { Button } from "@/modules/shared/components/ui/Button";

const SalePage = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const tableHead = [
    { columnName: "Member", row_id: "username", type: "string" },
    { columnName: "First Name", row_id: "first_name", type: "string" },
    {
      columnName: "Last Name",
      row_id: "last_name",
      type: "string",
      onClick: (row: any) => {
        setSelectedItem(row);
      },
    },
    {
      columnName: "Role",
      row_id: "role",
      type: "string",
      options: ["Admin", "User", "Guest"],
    },
  ];

  const data = [
    {
      username: "rezabh",
      first_name: "Reza",
      last_name: "Bhm",
      role: "User",
    },
    {
      username: "alij",
      first_name: "Ali",
      last_name: "JJJ",
      role: "Admin",
    },
  ];

  const handleSearch = (query: string) => {
    console.log("در حال جستجو برای:", query);
  };

  const onAdd = () => {
    console.log("Add clicked");
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm space-y-6 min-h-screen">
      {/* دکمه افزودن */}
      <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
        <Button variant="default" size="sm" onClick={onAdd}>
          Add member
          <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
          </svg>
        </Button>
      </div>

      {/* جدول داده‌ها */}
      <DataTable tableHead={tableHead} data={data} />
    </div>
  );
};

export default SalePage;
