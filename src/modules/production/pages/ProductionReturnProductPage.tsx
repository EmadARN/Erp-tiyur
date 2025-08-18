import { useState } from "react";
import { DataTable } from "@/modules/shared/components/table/DataTable";
import { CreateDialog } from "@/modules/shared/components/dialogs/CreateDialog";
import { useGetProductionReturnProductDetailsQuery } from "../api/productionReturnProductApi";
import PageHeader from "@/modules/shared/components/header/PageHeader";
import { SearchInput } from "@/modules/shared/components/ui/SearchInput";
import {
    getCreateDialogConfigs,
    getUpdateDialogConfigs,
    tableFilter,
    tableHead,
} from "../model/productionReturnProductIndex";
import Loading from "@/modules/shared/components/ui/Loading";
import NoData from "@/modules/shared/components/ui/NoData";
import { FiBox, FiFilter } from "react-icons/fi";
import { Button } from "@/modules/shared/components/ui/Button";

// Custom Hooks
import { useKernelData } from "@/modules/shared/hooks/useKernelData";
import { useProductionReturnProductData } from "../hooks/useProductionReturnProductData";
import { useProductionReturnProductActions } from "../hooks/useProductionReturnProductActions";

const ProductionReturnProductPage = () => {
    const [createIndex, setCreateIndex] = useState<number | null>(null);
    const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);

    const {
        kernelData,
        isLoading: isLoadingKernel,
        isError: isErrorKernel,
    } = useKernelData();
    const {
        productionReturnProducts,
        isLoading: isLoadingProductionReturnProducts,
        filterData,
        setFilterData,
        handleFilterOnChange,
        handleSearch,
    } = useProductionReturnProductData();
    const {
        deleteHandler,
        bulkDeleteHandler,
        handleCreateConfirm,
        handleUpdateConfirm,
    } = useProductionReturnProductActions();

    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Production", href: "/dashboard/production" },
        { label: "Product Returns" },
    ];

    const OnCreate = (index: number | null) => {
        setCreateIndex(index);
    };

    const isLoading = isLoadingProductionReturnProducts || isLoadingKernel;

    if (isLoading) {
        return <Loading />;
    }

    if (isErrorKernel) {
        return (
            <NoData
                title="Error Loading Essential Data"
                description="Required data such as products or users could not be loaded. Please try again later."
                icon={<FiBox className="w-12 h-12 text-red-500" />}
            />
        );
    }

    if (!productionReturnProducts?.data || productionReturnProducts.data.length === 0) {
        return (
            <div className="p-6 bg-white rounded-xl shadow-sm min-h-screen">
                <PageHeader
                    title="Product Returns"
                    breadcrumbItems={breadcrumbItems}
                    onCreate={() => OnCreate(1)}
                    createLabel="Add Product Return"
                />
                <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
                    <div className="w-full md:w-1/3">
                        <SearchInput
                            value={typeof filterData.search === "string" ? filterData.search : ""}
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
                    title="No Product Returns Found"
                    description="Adjust your filters or create a new product return."
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

    const isKernelDataEmpty = !kernelData.products.length || !kernelData.owners.length;

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm min-h-screen">
            <PageHeader
                title="Product Returns"
                breadcrumbItems={breadcrumbItems}
                onCreate={() => OnCreate(1)}
                createLabel="Add Product Return"
                isCreatingDisabled={isKernelDataEmpty || isLoadingKernel}
            />

            <div className="flex flex-col md:flex-row items-center justify-between mb-2 mt-12 gap-4">
                <div className="w-full md:w-1/3">
                    <SearchInput
                        value={typeof filterData.search === "string" ? filterData.search : ""}
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
                data={productionReturnProducts.data ?? []}
                deleteHandler={deleteHandler}
                bulkDeleteHandler={bulkDeleteHandler}
                useGetBuyProductDetailsQuery={useGetProductionReturnProductDetailsQuery}
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

export default ProductionReturnProductPage;
