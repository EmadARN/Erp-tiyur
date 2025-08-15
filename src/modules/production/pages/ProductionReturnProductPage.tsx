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
    { label: "داشبورد", href: "/dashboard" },
    { label: "تولید", href: "/dashboard/production" },
    { label: "بازگشت محصولات" },
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
        title="خطا در بارگذاری داده‌های ضروری"
        description="نمی‌توان داده‌های مورد نیاز مانند محصولات یا کاربران را بارگذاری کرد. لطفاً بعداً دوباره امتحان کنید."
        icon={<FiBox className="w-12 h-12 text-red-500" />}
      />
    );
  }

  if (
    !productionReturnProducts?.data ||
    productionReturnProducts.data.length === 0
  ) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm min-h-screen">
        <PageHeader
          title="بازگشت محصولات"
          breadcrumbItems={breadcrumbItems}
          onCreate={() => OnCreate(1)}
          createLabel="افزودن بازگشت محصول"
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
            فیلترها
          </Button>
        </div>
        <NoData
          title="هیچ بازگشت محصولی یافت نشد"
          description="فیلترهای خود را تنظیم کنید یا بازگشت محصول جدیدی ایجاد کنید."
          icon={<FiBox className="w-12 h-12 text-blue-500" />}
        />
      </div>
    );
  }

  const isKernelDataEmpty =
    !kernelData.receiver_delivery_units.length ||
    !kernelData.products.length ||
    !kernelData.product_owners.length ||
    !kernelData.return_types.length;

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm min-h-screen">
      <PageHeader
        title="بازگشت محصولات"
        breadcrumbItems={breadcrumbItems}
        onCreate={() => OnCreate(1)}
        createLabel="افزودن بازگشت محصول"
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
          فیلترها
        </Button>
      </div>

      <DataTable
        tableHead={tableHead}
        data={productionReturnProducts.data ?? []}
        deleteHandler={deleteHandler}
        bulkDeleteHandler={bulkDeleteHandler}
        useGetProductionReturnProductDetailsQuery={
          useGetProductionReturnProductDetailsQuery
        }
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
            ? "نمی‌توان بازگشت محصول جدیدی ایجاد کرد زیرا داده‌های ضروری (مانند واحدها، محصولات، یا کاربران) وجود ندارد."
            : undefined
        }
        isConfirmDisabled={isKernelDataEmpty}
      />
    </div>
  );
};

export default ProductionReturnProductPage;
