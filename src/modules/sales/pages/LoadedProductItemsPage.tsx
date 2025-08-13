import { useState } from "react";
import { DataTable } from "@/modules/shared/components/table/DataTable";
import { CreateDialog } from "@/modules/shared/components/dialogs/CreateDialog";
import { useGetLoadedProductItemDetailsQuery } from "../api/loadedProductItemsApi";
import PageHeader from "@/modules/shared/components/header/PageHeader";
import { SearchInput } from "@/modules/shared/components/ui/SearchInput";
import { getCreateDialogConfigs, getUpdateDialogConfigs, tableFilter, tableHead } from "../model/loadedProductItemsIndex";
import Loading from "@/modules/shared/components/ui/Loading";
import NoData from "@/modules/shared/components/ui/NoData";
import { FiBox, FiFilter } from "react-icons/fi";
import { Button } from "@/modules/shared/components/ui/Button";
import { useLoadedProductItemsData } from "../hooks/useLoadedProductItemsData";
import { useLoadedProductItemsActions } from "../hooks/useLoadedProductItemsActions";

const LoadedProductItemsPage = () => {
  const [createIndex, setCreateIndex] = useState<number | null>(null);
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const { loadedProductItems, isLoading, filterData, setFilterData, handleFilterOnChange, handleSearch } =
    useLoadedProductItemsData();
  const { deleteHandler, bulkDeleteHandler, handleCreateConfirm, handleUpdateConfirm } = useLoadedProductItemsActions();

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Products", href: "/dashboard/products" },
    { label: "Loaded Product Items" },
  ];

  if (isLoading) return <Loading />;

  if (!loadedProductItems?.data || loadedProductItems.data.length === 0) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm min-h-screen">
        <PageHeader title="Loaded Product Items" breadcrumbItems={breadcrumbItems} onCreate={() => setCreateIndex(1)} createLabel="Add Item" />
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
          <div className="w-full md:w-1/3">
            <SearchInput value={typeof filterData.search === "string" ? filterData.search : ""} onSearch={handleSearch} />
          </div>
          <Button variant="outline" size="sm" onClick={() => setFilterDrawerOpen(true)} className="w-full md:w-auto">
            <FiFilter className="mr-2" /> Filters
          </Button>
        </div>
        <NoData title="No items found" description="Try adjusting your filters or creating a new item." icon={<FiBox className="w-12 h-12 text-blue-500" />} />
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
      <PageHeader title="Loaded Product Items" breadcrumbItems={breadcrumbItems} onCreate={() => setCreateIndex(1)} createLabel="Add Item" />
      <div className="flex flex-col md:flex-row items-center justify-between mb-2 mt-12 gap-4">
        <div className="w-full md:w-1/3">
          <SearchInput value={typeof filterData.search === "string" ? filterData.search : ""} onSearch={handleSearch} />
        </div>
        <Button variant="outline" size="sm" onClick={() => setFilterDrawerOpen(true)} className="w-full md:w-auto">
          <FiFilter className="mr-2" /> Filters
        </Button>
      </div>

      <DataTable
        tableHead={tableHead}
        data={loadedProductItems.data ?? []}
        deleteHandler={deleteHandler}
        bulkDeleteHandler={bulkDeleteHandler}
        useGetBuyProductDetailsQuery={useGetLoadedProductItemDetailsQuery}
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

export default LoadedProductItemsPage;
