import { useState } from "react";
import { DataTable } from "@/modules/shared/components/ui/DataTable";
import { Button } from "@/modules/shared/components/ui/Button";

const SalePage = () => {
  const [page, setPage] = useState(1);

  const members = [
    {
      avatar:
        "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
      name: "John Michael",
      email: "john@creative-tim.com",
      position: "Manager",
      department: "Organization",
      status: "online",
      employedDate: "23/04/18",
    },
    {
      avatar:
        "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
      name: "Alexa Liras",
      email: "alexa@creative-tim.com",
      position: "Programator",
      department: "Developer",
      status: "offline",
      employedDate: "23/04/18",
    },
    // ...
  ];

  const handleSearch = (query: string) => {
    console.log("در حال جستجو برای:", query);
  };
  const onAdd = () => {
    console.log("Add clicked");
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm space-y-6 min-h-screen">
      <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
        <Button variant="default" size="sm" onClick={onAdd}>
          Add member
          <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
          </svg>
        </Button>
      </div>

      {/* 👇 فقط DataTable صدا زده میشه */}
      <DataTable data={members} showSearch={true} handleSearch={handleSearch} />
    </div>
  );
};

export default SalePage;
