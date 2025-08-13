import { useState } from "react";
import { DataTable } from "@/modules/shared/components/table/DataTable";
import { CreateDialog } from "@/modules/shared/components/dialogs/CreateDialog";
import { useGetOrderInvoiceDetailsQuery } from "../api/orderInvoiceApi";
import PageHeader from "@/modules/shared/components/header/PageHeader";
import { SearchInput } from "@/modules/shared/components/ui/SearchInput";
import { getCreateDialogConfigs, getUpdateDialogConfigs, tableFilter, tableHead } from "../model/orderInvoiceIndex.ts";
import Loading from "@/modules/shared/components/ui/Loading";
import NoData from "@/modules/shared/components/ui/NoData";
import { FiFilter, FiFileText } from "react-icons/fi";
import { Button } from "@/modules/shared/components/ui/Button";
import { useOrderInvoiceData } from "../hooks/useOrderInvoiceData";
import { useOrderInvoiceActions } from "../hooks/useOrderInvoiceActions";

const OrderInvoicePage = () => {
    const [createIndex, setCreateIndex] = useState<number | null>(null);
    const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);

    const { invoices, isLoading, filterData, setFilterData, handleFilterOnChange, handleSearch } = useOrderInvoiceData();
    const { deleteHandler, bulkDeleteHandler, handleCreateConfirm, handleUpdateConfirm } = useOrderInvoiceActions();

    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Buy", href: "/dashboard/buy" },
        { label: "Invoices" },
    ];

    if (isLoading) return <Loading />;

    if (!invoices?.data || invoices.data.length === 0) {
        return (
            <div className="p-6 bg-white rounded-xl shadow-sm min-h-screen">
                <PageHeader title="Order Invoices" breadcrumbItems={breadcrumbItems} onCreate={() => setCreateIndex(1)} createLabel="Add Order Invoice" />
                <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
                    <div className="w-full md:w-1/3">
                        <SearchInput value={typeof filterData.search === "string" ? filterData.search : ""} onSearch={handleSearch} />
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setFilterDrawerOpen(true)} className="w-full md:w-auto">
                        <FiFilter className="mr-2" /> Filters
                    </Button>
                </div>
                <NoData title="No order invoices found" description="Try adjusting filters or create a new invoice." icon={<FiFileText className="w-12 h-12 text-blue-500" />} />
                <CreateDialog open={createIndex !== null} onClose={() => setCreateIndex(null)} onConfirm={handleCreateConfirm} configs={getCreateDialogConfigs()} />
            </div>
        );
    }

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm min-h-screen">
            <PageHeader title="Invoices" breadcrumbItems={breadcrumbItems} onCreate={() => setCreateIndex(1)} createLabel="Add Invoice" />

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
                data={invoices.data ?? []}
                deleteHandler={deleteHandler}
                bulkDeleteHandler={bulkDeleteHandler}
                useGetBuyProductDetailsQuery={useGetOrderInvoiceDetailsQuery}
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

            <CreateDialog open={createIndex !== null} onClose={() => setCreateIndex(null)} onConfirm={handleCreateConfirm} configs={getCreateDialogConfigs()} />
        </div>
    );
};

export default OrderInvoicePage;
