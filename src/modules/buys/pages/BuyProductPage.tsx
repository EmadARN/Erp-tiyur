
import { useState } from "react";
import { DataTable } from "@/modules/shared/components/table/DataTable";
import { CreateDialog } from "@/modules/shared/components/dialogs/CreateDialog";
import { useGetBuyProductDetailsQuery } from "../api/buyProductApi";
import PageHeader from "@/modules/shared/components/header/PageHeader";
import { SearchInput } from "@/modules/shared/components/ui/SearchInput";
import {
  getCreateDialogConfigs,
  getUpdateDialogConfigs,
  tableFilter,
  tableHead,
} from "../model";
import Loading from "@/modules/shared/components/ui/Loading";
import NoData from "@/modules/shared/components/ui/NoData";
import { FiBox, FiFilter } from "react-icons/fi";
import { Button } from "@/modules/shared/components/ui/Button";

// Custom Hooks
import { useKernelData } from "@/modules/shared/hooks/useKernelData";
import { useBuyProductData } from "../hooks/useBuyProductData";
import { useBuyProductActions } from "../hooks/useBuyProductActions";

const BuyProductPage = () => {
  const [createIndex, setCreateIndex] = useState<number | null>(null);
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const {
    kernelData,
    isLoading: isLoadingKernel,
    isError: isErrorKernel,
  } = useKernelData();
  const {
    buyProducts,
    isLoading: isLoadingBuyProducts,
    filterData,
    setFilterData,
    handleFilterOnChange,
    handleSearch,
  } = useBuyProductData();
  const {
    deleteHandler,
    bulkDeleteHandler,
    handleCreateConfirm,
    handleUpdateConfirm,
  } = useBuyProductActions();

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Buy", href: "/dashboard/buy" },
    { label: "Buy Product" },
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

  if (!buyProducts?.data || buyProducts.data.length === 0) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm min-h-screen">
        <PageHeader
          title="Buy Product"
          breadcrumbItems={breadcrumbItems}
          onCreate={() => OnCreate(1)}
          createLabel="Add Buy Product"
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
      </div>
    );
  }

  const isKernelDataEmpty =
    !kernelData.cars.length ||
    !kernelData.drivers.length ||
    !kernelData.products.length;

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm min-h-screen">
      <PageHeader
        title="Buy Product"
        breadcrumbItems={breadcrumbItems}
        onCreate={() => OnCreate(1)}
        createLabel="Add Buy Product"
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
        data={buyProducts.data ?? []}
        deleteHandler={deleteHandler}
        bulkDeleteHandler={bulkDeleteHandler}
        useGetBuyProductDetailsQuery={useGetBuyProductDetailsQuery}
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
        customMessage={
          isKernelDataEmpty
            ? "Cannot create a new entry because essential data (like cars or drivers) is missing."
            : undefined
        }
        isConfirmDisabled={isKernelDataEmpty}
      />
    </div>
  );
};

export default BuyProductPage;
