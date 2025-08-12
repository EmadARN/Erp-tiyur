import React, { useEffect, useState } from "react";
import { DataTable } from "@/modules/shared/components/table/DataTable";
import { CreateDialog } from "@/modules/shared/components/dialogs/CreateDialog";
import {
  useGetBuyProductQuery,
  usePostBuyProductMutation,
  usePatchBuyProductMutation,
  useDeleteBuyProductMutation,
  useDeleteBulkBuyProductMutation,
  useGetBuyProductDetailsQuery,
} from "../api/buyProductApi";
import PageHeader from "@/modules/shared/components/header/PageHeader";
import toast from "react-hot-toast";
import {
  getCreateDialogConfigs,
  getUpdateDialogConfigs,
  tableFilter,
  tableHead,
  updateDialogDocs,
} from "../model";
import {
  useGetAgricultureQuery,
  useGetCarQuery,
  useGetCityQuery,
  useGetDriverQuery,
  useGetProductOwnerQuery,
  useGetProductQuery,
} from "@/modules/shared/api/shareApi";
import type {
  AgricultureType,
  CarType,
  DriverType,
  OwnerType,
  ProductType,
} from "../model/buysTypes";
import { useNavigate } from "react-router-dom";

const BuyProductPage = () => {
  const [filterData, setFilterData] = useState<any[]>([]);
  const [filterData2, setFilterData2] = useState<any[]>([]);
  const [tableData, setTableData] = useState([]);
  const [kernelData, setKernelData] = useState<KernelData>({
    cars: [],
    agriculture: [],
    drivers: [],
    owners: [],
    products: [],
  });
  const [createIndex, setCreateIndex] = useState<number | null>(null);

  const navigate = useNavigate()

  const { data: tableDatas, isLoading } = useGetBuyProductQuery(filterData, {
    refetchOnMountOrArgChange: true,
  });

  // تابع کمکی برای گرفتن مقدار بر اساس مسیر "car.driver.contact.name"
  function getValueByPath(obj: any, path: string) {
    if (!obj || !path) return "";
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  }

  // تابع جستجو
  function handleSearch(
    rows: any[],
    tableHead: { row_id: string }[],
    searchTerm: string
  ) {
    if (searchTerm === "") return setTableData(tableDatas); // اگه سرچ خالی بود، کل دیتا برگرده
    const lowerSearch = searchTerm.toString().toLowerCase();

    const result = rows.filter((row) =>
      tableHead.some(({ row_id }) => {
        const value = getValueByPath(row, row_id);
        return String(value ?? "")
          .toLowerCase()
          .includes(lowerSearch);
      })
    );


    setTableData({ data: result });
  }

  const { data: Product } = useGetProductQuery(filterData || {});
  const { data: owners } = useGetProductOwnerQuery(filterData || {});
  const { data: cars } = useGetCarQuery(filterData || {});
  const { data: drivers } = useGetDriverQuery(filterData || {});
  const { data: agriculture } = useGetAgricultureQuery(filterData || {});
  const { data: cities } = useGetCityQuery(filterData || {});

  // هوک‌های mutation برای POST, PATCH, DELETE
  const [postBuyProduct] = usePostBuyProductMutation();
  const [patchBuyProduct] = usePatchBuyProductMutation();
  const [deleteBuyProduct] = useDeleteBuyProductMutation();
  const [deleteBulkBuyProduct] = useDeleteBulkBuyProductMutation();

  // هر بار که داده‌ها تغییر کرد، kernelData را آپدیت کن
  const memoedKernelData = React.useMemo(
    () => ({
      products:
        Product?.map((item: ProductType) => ({
          value: JSON.stringify(item.id),
          label: item.name,
        })) || [],
      owners:
        owners?.map((item: OwnerType) => ({
          value: JSON.stringify(item.id),
          label: item.contact.name,
        })) || [],
      cars:
        cars?.map((item: CarType) => ({
          value: JSON.stringify(item.id),
          label: item.car_number,
        })) || [],
      drivers:
        drivers?.map((item: DriverType) => ({
          value: JSON.stringify(item.id),
          label: item.contact.name,
        })) || [],
      agriculture:
        agriculture?.map((item: AgricultureType) => ({
          value: JSON.stringify(item.id),
          label: item.name,
        })) || [],
    }),
    [Product, owners, cars, drivers, agriculture]
  );

  useEffect(() => {
    setKernelData(memoedKernelData);
  }, [memoedKernelData]);

  useEffect(() => {
    setTableData(tableDatas);
  }, [tableDatas]);

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Buy", href: "/dashboard/buy" },
    { label: "Buy Product" },
  ];

  function handleFilterOnChange() {
    const processFilterData = (x) => {
      return Object.entries(x).reduce((acc, [key, data]) => {
        if (data.type === "range-box" || data.type === "range") {
          return {
            ...acc,
            [`${data.name}__gte`]: data.value[0],
            [`${data.name}__lte`]: data.value[1],
          };
        } else if (
          ["switch", "select-box", "autocomplete"].includes(data.type)
        ) {
          return {
            ...acc,
            [data.name]: data.value,
          };
        } else if (data.type === "multi-select") {
          return {
            ...acc,
            [`${data.name}__in`]: data.value,
          };
        }
        return acc; // در صورت عدم تطابق، آبجکت تجمیع‌شده بدون تغییر برمی‌گردد
      }, {});
    };

    const x = processFilterData(filterData2);
    setFilterData(x);
  }

  const OnCreate = (index: number | null) => {
    setCreateIndex(index);
  };

  const deleteHandler = async (index) => {
    try {
      await deleteBuyProduct({ id: index }).unwrap();
      toast.success("Data delete successfully!");
    } catch (err) {
      if(err.response?.status === 500) {
        navigate("/500")
      }
      toast.error("Failed to delete data.");
    }
  };
  const bulkDeleteHandler = async (arrayIndex) => {
    try {
      await deleteBulkBuyProduct({
        data: { data: arrayIndex },
      }).unwrap();
      toast.success("Data delete successfully!");
    } catch (err) {
      if(err.response?.status === 500) {
        navigate("/500")
      }
      toast.error("Failed to delete data.");
    }
  };
  bulkDeleteHandler;

  async function handCreateleConfirm(data: Record<string, any>) {
    const formattedData = {
      car: {
        car: data["car.car"],
        driver: data["car.driver"],
      },
      order_information: {
        agriculture: data["order_information.agriculture"],
        product_owner: data["order_information.product_owner"],
        slaughter_type: data["order_information.slaughter_type"],
        order_type: data["order_information.order_type"],
        product: data["order_information.product"],
      },
      required_weight: data.required_weight,
      required_number: data.required_number,
    };

    try {
      await postBuyProduct(formattedData).unwrap();
      toast.success("Data sent successfully!");
    } catch (err) {
      if(err.response?.status === 500) {
        navigate("/500")
      }
      toast.error("Failed to send data.");
    }
  }

  function formatData(data: Record<string, any>) {
    const result: Record<string, any> = {};

    Object.entries(data).forEach(([key, value]) => {
      if (value === null) {
        // اگر مقدار null بود، این فیلد رو وارد نکن
        return;
      }

      if (key.includes(".")) {
        const parts = key.split(".");
        let current = result;

        // حلقه روی بخش‌های کلید به جز آخرین
        for (let i = 0; i < parts.length - 1; i++) {
          const part = parts[i];
          if (!current[part]) current[part] = {};
          current = current[part];
        }

        // آخرین بخش کلید
        current[parts[parts.length - 1]] = value;
      } else {
        result[key] = value;
      }
    });

    return result;
  }
  const mergeDataWithDefault = (data, defaultData) => {
    const result = { ...defaultData };

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key) && key in result) {
        if (
          typeof data[key] === "object" &&
          data[key] !== null &&
          !Array.isArray(data[key])
        ) {
          result[key] = mergeDataWithDefault(data[key], result[key]);
        } else {
          result[key] = data[key];
        }
      }
    }

    return result;
  };
  async function handleUpdateConfirm(data: Record<string, any>) {
    let formattedData = formatData(data);
    formattedData = mergeDataWithDefault(formattedData, updateDialogDocs);

    try {
      await patchBuyProduct({
        id: formattedData.id,
        data: formattedData,
      }).unwrap();
      toast.success("Data update successfully!");
    } catch (err) {
      if(err.response?.status === 500) {
        navigate("/500")
      }
      toast.error("Failed to update data.");

    }
  }
  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (!tableData || tableData.length === 0) {
    return <div className="p-4 text-center">No data found</div>;
  }
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm min-h-screen">
      <PageHeader
        title="Buy Product"
        breadcrumbItems={breadcrumbItems}
        onCreate={() => OnCreate(1)}
        createLabel="Add Buy Product"
      />

      <DataTable
        tableHead={tableHead}
        data={Array.isArray(tableData?.data) ? tableData.data : []}
        handleSearch={(term) =>
          handleSearch(tableData.data ?? [], tableHead, term)
        }
        deleteHandler={deleteHandler}
        bulkDeleteHandler={bulkDeleteHandler}
        useGetBuyProductDetailsQuery={useGetBuyProductDetailsQuery}
        tableFilters={tableFilter}
        filterData={filterData2}
        setFilterData={setFilterData2}
        applyFilter={handleFilterOnChange}
        updateDialogConfigs={getUpdateDialogConfigs({
          cars: kernelData.cars,
          agriculture: kernelData.agriculture,
          drivers: kernelData.drivers,
          owners: kernelData.owners,
          products: kernelData.products,
        })}
        onUpdateConfirm={handleUpdateConfirm}
      />

      <CreateDialog
        open={createIndex !== null}
        onClose={() => setCreateIndex(null)}
        onConfirm={handCreateleConfirm}
        configs={getCreateDialogConfigs({
          cars: kernelData.cars,
          agriculture: kernelData.agriculture,
          drivers: kernelData.drivers,
          owners: kernelData.owners,
          products: kernelData.products,
        })}
      />
    </div>
  );
};

export default BuyProductPage;
