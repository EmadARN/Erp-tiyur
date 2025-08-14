import { useState } from "react";
import { DataTable } from "@/modules/shared/components/table/DataTable";
import { CreateDialog } from "@/modules/shared/components/dialogs/CreateDialog";
import { useGetWarehouseDetailsQuery } from "../api/wareHouseApi";
import PageHeader from "@/modules/shared/components/header/PageHeader";
import { SearchInput } from "@/modules/shared/components/ui/SearchInput";
import {
  getCreateDialogConfigs,
  getUpdateDialogConfigs,
  tableFilter,
  tableHead,
} from "../model/wareHouseIndex";
import Loading from "@/modules/shared/components/ui/Loading";
import NoData from "@/modules/shared/components/ui/NoData";
import { FiBox, FiFilter } from "react-icons/fi";
import { Button } from "@/modules/shared/components/ui/Button";

// Custom Hooks
import { useKernelData } from "@/modules/shared/hooks/useKernelData";
import { useWarehouseData } from "../hooks/useWareHouseData";
import { useWarehouseActions } from "../hooks/useWareHouseActions";

const WarehousePage = () => {
  const [createIndex, setCreateIndex] = useState<number | null>(null);
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const {
  
    isLoading: isLoadingKernel,
    isError: isErrorKernel,
  } = useKernelData();
  const {
    warehouses,
    isLoading: isLoadingWarehouses,
    filterData,
    setFilterData,
    handleFilterOnChange,
    handleSearch,
  } = useWarehouseData();
  const {
    deleteHandler,
    bulkDeleteHandler,
    handleCreateConfirm,
    handleUpdateConfirm,
  } = useWarehouseActions();

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Warehouse", href: "/dashboard/warehouse" },
    { label: "Warehouse List" },
  ];

  const OnCreate = (index: number | null) => {
    setCreateIndex(index);
  };

  const isLoading = isLoadingWarehouses || isLoadingKernel;

  const isKernelDataEmpty = null;

  if (isLoading) {
    return <Loading />;
  }

  if (isErrorKernel) {
    return (
      <NoData
        title="Error loading essential data"
        description="Could not load users or other required data. Please try again later."
        icon={<FiBox className="w-12 h-12 text-red-500" />}
      />
    );
  }

  if (!warehouses?.data || warehouses.data.length === 0) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm min-h-screen">
        <PageHeader
          title="Warehouse"
          breadcrumbItems={breadcrumbItems}
          onCreate={() => OnCreate(1)}
          createLabel="Add Warehouse"
        />
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
          <div className="w-full md:w-1/3">
            <SearchInput
              value={
                typeof filterData.search === "string" ? filterData.search : ""
              }
              onSearch={handleSearch}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilterDrawerOpen(true)}
            className="w-full md:w-auto"
          >
            <FiFilter className="mr-2" />
            Filters
          </Button>
        </div>
        <NoData
          title="No warehouses found"
          description="Try adjusting your filters or creating a new warehouse."
          icon={<FiBox className="w-12 h-12 text-blue-500" />}
        />
        <CreateDialog
          open={createIndex !== null}
          onClose={() => setCreateIndex(null)}
          onConfirm={handleCreateConfirm}
          configs={getCreateDialogConfigs()}
          
        />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm min-h-screen">
      <PageHeader
        title="Warehouse"
        breadcrumbItems={breadcrumbItems}
        onCreate={() => OnCreate(1)}
        createLabel="Add Warehouse"
        isCreatingDisabled={isKernelDataEmpty || isLoadingKernel}
      />

      <div className="flex flex-col md:flex-row items-center justify-between mb-2 mt-12 gap-4">
        <div className="w-full md:w-1/3">
          <SearchInput
            value={
              typeof filterData.search === "string" ? filterData.search : ""
            }
            onSearch={handleSearch}
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setFilterDrawerOpen(true)}
          className="w-full md:w-auto"
        >
          <FiFilter className="mr-2" />
          Filters
        </Button>
      </div>

      <DataTable
        tableHead={tableHead}
        data={warehouses.data ?? []}
        deleteHandler={deleteHandler}
        bulkDeleteHandler={bulkDeleteHandler}
        useGetBuyProductDetailsQuery={useGetWarehouseDetailsQuery}
        tableFilters={tableFilter}
        filterData={filterData}
        setFilterData={setFilterData}
        applyFilter={handleFilterOnChange}
        updateDialogConfigs={getUpdateDialogConfigs()}
        onUpdateConfirm={handleUpdateConfirm}
        showFilterButton={false}
        isFilterDrawerOpen={isFilterDrawerOpen}
        onFilterDrawerClose={() => setFilterDrawerOpen(false)}
        onFilterIconClick={() => setFilterDrawerOpen(true)}
      />

      <CreateDialog
        open={createIndex !== null}
        onClose={() => setCreateIndex(null)}
        onConfirm={handleCreateConfirm}
        configs={getCreateDialogConfigs()}
       
      />
    </div>
  );
};

export default WarehousePage;
