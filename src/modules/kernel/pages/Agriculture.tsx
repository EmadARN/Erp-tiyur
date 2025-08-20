import { useState } from "react";
import { DataTable } from "@/modules/shared/components/table/DataTable";
import { CreateDialog } from "@/modules/shared/components/dialogs/CreateDialog";
import { useGetagriculturesDetailsQuery } from "../api/agricultureApi.ts";
import PageHeader from "@/modules/shared/components/header/PageHeader";
import { SearchInput } from "@/modules/shared/components/ui/SearchInput";
import {
  getCreateDialogConfigs,
  getUpdateDialogConfigs,
  tableFilter,
  tableHead,
} from "../model/agricultureIndex.ts";
import Loading from "@/modules/shared/components/ui/Loading";
import NoData from "@/modules/shared/components/ui/NoData";
import { FiBox, FiFilter } from "react-icons/fi";
import { Button } from "@/modules/shared/components/ui/Button";
import { useKernelData } from "@/modules/shared/hooks/useKernelData";
import { useagricultureData } from "../hooks/useAgricultureData.ts";
import { useagricultureActions } from "../hooks/useAgricultureActions.ts";

const agriculture = () => {
  const [createIndex, setCreateIndex] = useState<number | null>(null);
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const {
    kernelData,
    isLoading: isLoadingKernel,
    isError: isErrorKernel,
  } = useKernelData();
  const {
    agricultures,
    isLoading: isLoadingBuyProducts,
    filterData,
    setFilterData,
    handleFilterOnChange,
    handleSearch,
  } = useagricultureData();
  const {
    deleteHandler,
    bulkDeleteHandler,
    handleCreateConfirm,
    handleUpdateConfirm,
  } = useagricultureActions();

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Kernel", href: "/dashboard/kernel" },
    { label: "agriculture" },
  ];

  const OnCreate = (index: number | null) => {
    setCreateIndex(index);
  };

  const isLoading = isLoadingBuyProducts || isLoadingKernel;

  if (isLoading) {
    return <Loading />;
  }

  if (isErrorKernel) {
    return (
      <NoData
        title="Error loading essential data"
        description="Could not load products, owners, or other required data. Please try again later."
        icon={<FiBox className="w-12 h-12 text-red-500" />}
      />
    );
  }
  const isKernelDataEmpty = !kernelData?.cities.length;



  if (!agricultures || agricultures.length === 0) {
    return (
      <div className="p-2 sm:p-4 md:p-6 bg-white rounded-xl shadow-sm min-h-screen">
        <PageHeader
          title="agricultures"
          breadcrumbItems={breadcrumbItems}
          onCreate={() => OnCreate(1)}
          createLabel="Add agriculture"
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
          title="No products found"
          description="Try adjusting your filters or creating a new product."
          icon={<FiBox className="w-12 h-12 text-blue-500" />}
        />

        <CreateDialog
          open={createIndex !== null}
          onClose={() => setCreateIndex(null)}
          onConfirm={handleCreateConfirm}
          configs={getCreateDialogConfigs(kernelData)}
        />
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 md:p-6 bg-white rounded-xl shadow-sm min-h-screen">
      <PageHeader
        title="agricultures"
        breadcrumbItems={breadcrumbItems}
        onCreate={() => OnCreate(1)}
        createLabel="Add agricultures"
        isCreatingDisabled={isKernelDataEmpty || isLoadingKernel}
      />

      <div className="flex flex-col md:flex-row items-center justify-between my-4 md:my-8 gap-4">
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
        data={agricultures ?? []}
        deleteHandler={deleteHandler}
        bulkDeleteHandler={bulkDeleteHandler}
        useGetBuyProductDetailsQuery={useGetagriculturesDetailsQuery}
        tableFilters={tableFilter}
        filterData={filterData}
        setFilterData={setFilterData}
        applyFilter={handleFilterOnChange}
        updateDialogConfigs={getUpdateDialogConfigs(kernelData)}
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
        configs={getCreateDialogConfigs(kernelData)}
      />
    </div>
  );
};

export default agriculture;
