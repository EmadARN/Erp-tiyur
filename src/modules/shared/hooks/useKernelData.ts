import { useMemo } from "react";
import {
  useGetProductQuery,
  useGetProductOwnerQuery,
  useGetCarQuery,
  useGetDriverQuery,
  useGetAgricultureQuery,
} from "@/modules/shared/api/shareApi";
import type {
  ProductType,
  OwnerType,
  CarType,
  DriverType,
  AgricultureType,
  KernelData,
} from "@/modules/buys/model/buysTypes";

export const useKernelData = () => {
  const {
    data: productsData,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useGetProductQuery({});
  const {
    data: ownersData,
    isLoading: isLoadingOwners,
    isError: isErrorOwners,
  } = useGetProductOwnerQuery({});
  const {
    data: carsData,
    isLoading: isLoadingCars,
    isError: isErrorCars,
  } = useGetCarQuery({});
  const {
    data: driversData,
    isLoading: isLoadingDrivers,
    isError: isErrorDrivers,
  } = useGetDriverQuery({});
  const {
    data: agricultureData,
    isLoading: isLoadingAgriculture,
    isError: isErrorAgriculture,
  } = useGetAgricultureQuery({});

  const isLoading =
    isLoadingProducts ||
    isLoadingOwners ||
    isLoadingCars ||
    isLoadingDrivers ||
    isLoadingAgriculture;

  const isError =
    isErrorProducts ||
    isErrorOwners ||
    isErrorCars ||
    isErrorDrivers ||
    isErrorAgriculture;

  const kernelData: KernelData = useMemo(() => {
    return {
      products:
        productsData?.map((item: ProductType) => ({
          value: String(item.id),
          label: item.name,
        })) || [],
      owners:
        ownersData?.map((item: OwnerType) => ({
          value: String(item.id),
          label: item.contact.name,
        })) || [],
      cars:
        carsData?.map((item: CarType) => ({
          value: String(item.id),
          label: item.car_number,
        })) || [],
      drivers:
        driversData?.map((item: DriverType) => ({
          value: String(item.id),
          label: item.contact.name,
        })) || [],
      agriculture:
        agricultureData?.map((item: AgricultureType) => ({
          value: String(item.id),
          label: item.name,
        })) || [],
    };
  }, [
    productsData,
    ownersData,
    carsData,
    driversData,
    agricultureData,
  ]);

  return { kernelData, isLoading, isError };
};
