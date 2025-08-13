import { useState } from "react";
import { DataTable } from "@/modules/shared/components/table/DataTable";
import { CreateDialog } from "@/modules/shared/components/dialogs/CreateDialog";
import { useGetOrderPaymentDetailsQuery } from "../api/orderPaymentApi";
import PageHeader from "@/modules/shared/components/header/PageHeader";
import { SearchInput } from "@/modules/shared/components/ui/SearchInput";
import {
  getCreateDialogConfigs,
  getUpdateDialogConfigs,
  tableFilter,
  tableHead,
} from "../model/paymentIndex";
import Loading from "@/modules/shared/components/ui/Loading";
import NoData from "@/modules/shared/components/ui/NoData";
import { FiFilter, FiCreditCard } from "react-icons/fi";
import { Button } from "@/modules/shared/components/ui/Button";
import { useOrderPaymentData } from "../hooks/useOrderPaymentData";
import { useOrderPaymentActions } from "../hooks/useOrderPaymentActions";
import { useGetOrderInvoicesQuery } from "@/modules/buys/api/orderInvoiceApi.ts";

const OrderPaymentPage = () => {
  const [createIndex, setCreateIndex] = useState<number | null>(null);
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [paramsFilterData, setParamsFilterData] = useState<Record<string, any>>(
    {}
  );

  const { data: invoices, isLoading: invoiceIsLoading } =
    useGetOrderInvoicesQuery(paramsFilterData, {
      refetchOnMountOrArgChange: true,
    });

  const {
    payments,
    isLoading,
    filterData,
    setFilterData,
    handleFilterOnChange,
    handleSearch,
  } = useOrderPaymentData();
  const {
    deleteHandler,
    bulkDeleteHandler,
    handleCreateConfirm,
    handleUpdateConfirm,
  } = useOrderPaymentActions();

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Orders", href: "/dashboard/orders" },
    { label: "Order Payments" },
  ];

  if (isLoading) return <Loading />;

  if (!payments?.data || payments.data.length === 0) {
    return (
      <div className="p-2 sm:p-4 md:p-6 bg-white rounded-xl shadow-sm min-h-screen">
        <PageHeader
          title="Order Payments"
          breadcrumbItems={breadcrumbItems}
          onCreate={() => setCreateIndex(1)}
          createLabel="Add Order Payment"
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
          title="No order payments found"
          description="Try adjusting filters or create a new order payment."
          icon={<FiCreditCard className="w-12 h-12 text-blue-500" />}
        />
        <CreateDialog
          open={createIndex !== null}
          onClose={() => setCreateIndex(null)}
          onConfirm={handleCreateConfirm}
          configs={getCreateDialogConfigs({
            invoice:
              invoices?.data?.map((item:{id:number,title:string}) => ({
                value: item.id,
                label: item.title,
              })) ?? [],
          })}
        />{" "}
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 md:p-6 bg-white rounded-xl shadow-sm min-h-screen">
      <PageHeader
        title="Order Payments"
        breadcrumbItems={breadcrumbItems}
        onCreate={() => setCreateIndex(1)}
        createLabel="Add Order Payment"
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
        data={payments.data ?? []}
        deleteHandler={deleteHandler}
        bulkDeleteHandler={bulkDeleteHandler}
        useGetBuyProductDetailsQuery={useGetOrderPaymentDetailsQuery}
        tableFilters={tableFilter}
        filterData={filterData}
        setFilterData={setFilterData}
        applyFilter={handleFilterOnChange}
        updateDialogConfigs={getUpdateDialogConfigs({
          invoice:
            invoices?.data?.map((item:{id:number,title:string}) => ({
              value: item.id,
              label: item.title,
            })) ?? [],
        })}
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
        configs={getCreateDialogConfigs({
          invoice:
            invoices?.data?.map((item:{id:number,title:string}) => ({
              value: item.id,
              label: item.title,
            })) ?? [],
        })}
      />
    </div>
  );
};

export default OrderPaymentPage;
