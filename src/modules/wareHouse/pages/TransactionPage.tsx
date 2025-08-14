import { useState } from "react";
import { DataTable } from "@/modules/shared/components/table/DataTable";
import { CreateDialog } from "@/modules/shared/components/dialogs/CreateDialog";
import { useGetTransactionDetailsQuery } from "../api/transactionApi";
import PageHeader from "@/modules/shared/components/header/PageHeader";
import { SearchInput } from "@/modules/shared/components/ui/SearchInput";
import {
  getCreateDialogConfigs,
  getUpdateDialogConfigs,
  tableFilter,
  tableHead,
} from "../model/transactionIndex";
import Loading from "@/modules/shared/components/ui/Loading";
import NoData from "@/modules/shared/components/ui/NoData";
import { FiBox, FiFilter } from "react-icons/fi";
import { Button } from "@/modules/shared/components/ui/Button";

// Custom Hooks
import { useKernelData } from "@/modules/shared/hooks/useKernelData";
import { useTransactionData } from "../hooks/useTransactionData";
import { useTransactionActions } from "../hooks/useTransactionActions";

const TransactionPage = () => {
  const [createIndex, setCreateIndex] = useState<number | null>(null);
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const {
    kernelData,
    isLoading: isLoadingKernel,
    isError: isErrorKernel,
  } = useKernelData();
  const {
    transactions,
    isLoading: isLoadingTransactions,
    filterData,
    setFilterData,
    handleFilterOnChange,
    handleSearch,
  } = useTransactionData();
  const {
    deleteHandler,
    bulkDeleteHandler,
    handleCreateConfirm,
    handleUpdateConfirm,
  } = useTransactionActions();

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Transaction", href: "/dashboard/transaction" },
    { label: "Transaction List" },
  ];

  const OnCreate = (index: number | null) => {
    setCreateIndex(index);
  };

  const isLoading = isLoadingTransactions || isLoadingKernel;

  const isKernelDataEmpty =
    !kernelData.products.length ||
    !kernelData.owners.length 


  if (isLoading) {
    return <Loading />;
  }

  if (isErrorKernel) {
    return (
        <>
      <NoData
        title="Error loading essential data"
        description="Could not load products, owners, or other required data. Please try again later."
        icon={<FiBox className="w-12 h-12 text-red-500" />}
      />

     
      </>
    );
  }

  if (!transactions?.data || transactions.data.length === 0) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm min-h-screen">
        <PageHeader
          title="Transaction"
          breadcrumbItems={breadcrumbItems}
          onCreate={() => OnCreate(1)}
          createLabel="Add Transaction"
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
          title="No transactions found"
          description="Try adjusting your filters or creating a new transaction."
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
    <div className="p-6 bg-white rounded-xl shadow-sm min-h-screen">
      <PageHeader
        title="Transaction"
        breadcrumbItems={breadcrumbItems}
        onCreate={() => OnCreate(1)}
        createLabel="Add Transaction"
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
        data={transactions.data ?? []}
        deleteHandler={deleteHandler}
        bulkDeleteHandler={bulkDeleteHandler}
        useGetBuyProductDetailsQuery={useGetTransactionDetailsQuery}
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

export default TransactionPage;