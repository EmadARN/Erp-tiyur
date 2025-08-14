import { useState } from "react";
import { DataTable } from "@/modules/shared/components/table/DataTable";
import { CreateDialog } from "@/modules/shared/components/dialogs/CreateDialog";
import { useGetPurchaseOrderDetailsQuery } from "../api/orderPurchaseOrderApi";
import PageHeader from "@/modules/shared/components/header/PageHeader";
import { SearchInput } from "@/modules/shared/components/ui/SearchInput";
import {
  getCreateDialogConfigs,
  getUpdateDialogConfigs,
  tableFilter,
  tableHead,
} from "../model/purchaseOrderIndex";
import Loading from "@/modules/shared/components/ui/Loading";
import NoData from "@/modules/shared/components/ui/NoData";
import { FiBox, FiFilter } from "react-icons/fi";
import { Button } from "@/modules/shared/components/ui/Button";
import { usePurchaseOrderData } from "../hooks/usePurchaseOrderData";
import { usePurchaseOrderActions } from "../hooks/usePurchaseOrderActions";

const PurchaseOrderPage = () => {
  const [createIndex, setCreateIndex] = useState<number | null>(null);
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const {
    purchaseOrders,
    isLoading,
    filterData,
    setFilterData,
    handleFilterOnChange,
    handleSearch,
  } = usePurchaseOrderData();
  const {
    deleteHandler,
    bulkDeleteHandler,
    handleCreateConfirm,
    handleUpdateConfirm,
  } = usePurchaseOrderActions();

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Buy", href: "/dashboard/buy" },
    { label: "Purchase Orders" },
  ];

  if (isLoading) return <Loading />;

  if (!purchaseOrders?.data || purchaseOrders.data.length === 0) {
    return (
      <div className="p-2 sm:p-4 md:p-6 bg-white rounded-xl shadow-sm min-h-screen">
        <PageHeader
          title="Purchase Orders"
          breadcrumbItems={breadcrumbItems}
          onCreate={() => setCreateIndex(1)}
          createLabel="Add Purchase Order"
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
            <FiFilter className="mr-2" /> Filters
          </Button>
        </div>
        <NoData
          title="No purchase orders found"
          description="Try adjusting your filters or creating a new purchase order."
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
    <div className="p-2 sm:p-4 md:p-6 bg-white rounded-xl shadow-sm min-h-screen">
      <PageHeader
        title="Purchase Orders"
        breadcrumbItems={breadcrumbItems}
        onCreate={() => setCreateIndex(1)}
        createLabel="Add Purchase Order"
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
          <FiFilter className="mr-2" /> Filters
        </Button>
      </div>

      <DataTable
        tableHead={tableHead}
        data={purchaseOrders.data ?? []}
        deleteHandler={deleteHandler}
        bulkDeleteHandler={bulkDeleteHandler}
        useGetBuyProductDetailsQuery={useGetPurchaseOrderDetailsQuery}
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

export default PurchaseOrderPage;
