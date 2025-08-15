import { useState } from "react";
import { DataTable } from "@/modules/shared/components/table/DataTable";
import { CreateDialog } from "@/modules/shared/components/dialogs/CreateDialog";
import { useGetProductionImportByCarDetailsQuery } from "../api/productionImportByCarApi";
import PageHeader from "@/modules/shared/components/header/PageHeader";
import { SearchInput } from "@/modules/shared/components/ui/SearchInput";
import {
  getCreateDialogConfigs,
  getUpdateDialogConfigs,
  tableFilter,
  tableHead,
} from "../model/productionImportByCarIndex";
import Loading from "@/modules/shared/components/ui/Loading";
import NoData from "@/modules/shared/components/ui/NoData";
import { FiBox, FiFilter } from "react-icons/fi";
import { Button } from "@/modules/shared/components/ui/Button";

// Custom Hooks
import { useKernelData } from "@/modules/shared/hooks/useKernelData";
import { useProductionImportByCarData } from "../hooks/useProductionImportByCarData";
import { useProductionImportByCarActions } from "../hooks/useProductionImportByCarActions";

const ProductionImportByCarPage = () => {
  const [createIndex, setCreateIndex] = useState<number | null>(null);
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const {
    kernelData,
    isLoading: isLoadingKernel,
    isError: isErrorKernel,
  } = useKernelData();
  const {
    productionImportsByCar,
    isLoading: isLoadingProductionImportsByCar,
    filterData,
    setFilterData,
    handleFilterOnChange,
    handleSearch,
  } = useProductionImportByCarData();
  const {
    deleteHandler,
    bulkDeleteHandler,
    handleCreateConfirm,
    handleUpdateConfirm,
  } = useProductionImportByCarActions();

  const breadcrumbItems = [
    { label: "داشبورد", href: "/dashboard" },
    { label: "تولید", href: "/dashboard/production" },
    { label: "واردات محصولات با خودرو" },
  ];

  const OnCreate = (index: number | null) => {
    setCreateIndex(index);
  };

  const isLoading = isLoadingProductionImportsByCar || isLoadingKernel;

  if (isLoading) {
    return <Loading />;
  }

  if (isErrorKernel) {
    return (
      <NoData
        title="خطا در بارگذاری داده‌های ضروری"
        description="نمی‌توان داده‌های مورد نیاز مانند محصولات، رانندگان یا کاربران را بارگذاری کرد. لطفاً بعداً دوباره امتحان کنید."
        icon={<FiBox className="w-12 h-12 text-red-500" />}
      />
    );
  }

  if (
    !productionImportsByCar?.data ||
    productionImportsByCar.data.length === 0
  ) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm min-h-screen">
        <PageHeader
          title="واردات محصولات با خودرو"
          breadcrumbItems={breadcrumbItems}
          onCreate={() => OnCreate(1)}
          createLabel="افزودن واردات محصول با خودرو"
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
          title="هیچ واردات محصولی با خودرو یافت نشد"
          description="فیلترهای خود را تنظیم کنید یا واردات محصول جدیدی با خودرو ایجاد کنید."
          icon={<FiBox className="w-12 h-12 text-blue-500" />}
        />
        <CreateDialog
          open={createIndex !== null}
          onClose={() => setCreateIndex(null)}
          onConfirm={handleCreateConfirm}
          configs={getCreateDialogConfigs(kernelData)}
          customMessage={
            isKernelDataEmpty
              ? "نمی‌توان سری برنامه‌ریزی جدیدی ایجاد کرد زیرا داده‌های ضروری (مانند کاربران) وجود ندارد."
              : undefined
          }
          isConfirmDisabled={isKernelDataEmpty}
        />
      </div>
    );
  }

  const isKernelDataEmpty =
    !kernelData.cities.length ||
    !kernelData.agricultures.length ||
    !kernelData.drivers.length ||
    !kernelData.cars.length ||
    !kernelData.products.length ||
    !kernelData.product_owners.length ||
    !kernelData.slaughter_types.length ||
    !kernelData.order_types.length ||
    !kernelData.users.length ||
    !kernelData.statuses.length;

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm min-h-screen">
      <PageHeader
        title="واردات محصولات با خودرو"
        breadcrumbItems={breadcrumbItems}
        onCreate={() => OnCreate(1)}
        createLabel="افزودن واردات محصول با خودرو"
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
        data={productionImportsByCar.data ?? []}
        deleteHandler={deleteHandler}
        bulkDeleteHandler={bulkDeleteHandler}
        useGetProductionImportByCarDetailsQuery={
          useGetProductionImportByCarDetailsQuery
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
            ? "نمی‌توان واردات محصول جدیدی با خودرو ایجاد کرد زیرا داده‌های ضروری (مانند شهرها، رانندگان، یا کاربران) وجود ندارد."
            : undefined
        }
        isConfirmDisabled={isKernelDataEmpty}
      />
    </div>
  );
};

export default ProductionImportByCarPage;
