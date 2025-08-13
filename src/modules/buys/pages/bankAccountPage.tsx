import { useState } from "react";
import { DataTable } from "@/modules/shared/components/table/DataTable";
import { CreateDialog } from "@/modules/shared/components/dialogs/CreateDialog";
import { useGetBankAccountDetailsQuery } from "../api/bankAccountApi";
import PageHeader from "@/modules/shared/components/header/PageHeader";
import { SearchInput } from "@/modules/shared/components/ui/SearchInput";
import {
  getCreateDialogConfigs,
  getUpdateDialogConfigs,
  tableFilter,
  tableHead,
} from "../model/bankAccountIndex.ts";
import Loading from "@/modules/shared/components/ui/Loading";
import NoData from "@/modules/shared/components/ui/NoData";
import { FiFilter, FiCreditCard } from "react-icons/fi";
import { Button } from "@/modules/shared/components/ui/Button";
import { useBankAccountData } from "../hooks/useBankAccountData";
import { useBankAccountActions } from "../hooks/useBankAccountActions";

const BankAccountPage = () => {
  const [createIndex, setCreateIndex] = useState<number | null>(null);
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const {
    accounts,
    isLoading,
    filterData,
    setFilterData,
    handleFilterOnChange,
    handleSearch,
  } = useBankAccountData();
  const {
    deleteHandler,
    bulkDeleteHandler,
    handleCreateConfirm,
    handleUpdateConfirm,
  } = useBankAccountActions();

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Buy", href: "/dashboard/buy" },
    { label: "Bank Accounts" },
  ];

  if (isLoading) return <Loading />;

  if (!accounts?.data || accounts.data.length === 0) {
    return (
      <div className="p-2 sm:p-4 md:p-6 bg-white rounded-xl shadow-sm min-h-screen">
        <PageHeader
          title="Bank Accounts"
          breadcrumbItems={breadcrumbItems}
          onCreate={() => setCreateIndex(1)}
          createLabel="Add Bank Account"
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
          title="No bank accounts found"
          description="Try adjusting filters or create a new bank account."
          icon={<FiCreditCard className="w-12 h-12 text-blue-500" />}
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
        title="Bank Accounts"
        breadcrumbItems={breadcrumbItems}
        onCreate={() => setCreateIndex(1)}
        createLabel="Add Bank Account"
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
        data={accounts.data ?? []}
        deleteHandler={deleteHandler}
        bulkDeleteHandler={bulkDeleteHandler}
        useGetBuyProductDetailsQuery={useGetBankAccountDetailsQuery}
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

export default BankAccountPage;
