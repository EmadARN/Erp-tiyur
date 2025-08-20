import { useMemo } from "react";
import {
  useGetProductQuery,
  useGetProductOwnerQuery,
  useGetCarQuery,
  useGetDriverQuery,
  useGetAgricultureQuery,
  useGetUnitsQuery,
  useGetRolesQuery, useGetCityQuery, useGetContactQuery,useGetCategoriesQuery
} from "@/modules/shared/api/shareApi";
import type {
  ProductType,
  OwnerType,
  CarType,
  DriverType,
  AgricultureType,
  KernelData,
} from "@/modules/buys/model/buysProduct";

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
    data: unitsData,
    isLoading: isLoadingUnit,
    isError: isErrorUnit,
  } = useGetUnitsQuery({});

  const {
    data: agricultureData,
    isLoading: isLoadingAgriculture,
    isError: isErrorAgriculture,
  } = useGetAgricultureQuery({});

  const {
    data: rolesData,
    isLoading: isLoadingRoles,
    isError: isErrorRoles,
  } = useGetRolesQuery({});

  const {
    data: citiesData,
    isLoading: isLoadingCities,
    isError: isErrorCities,
  } = useGetCityQuery({});
  const {
    data: contactsData,
    isLoading: isLoadingContacts,
    isError: isErrorContacts,
  } = useGetContactQuery({});
  const {
    data: categoriesData,
    isLoading: isLoadingCategoriesData,
    isError: isErrorCategories,
  } = useGetCategoriesQuery({});

  const isLoading =
    isLoadingProducts ||
    isLoadingOwners ||
    isLoadingCars ||
    isLoadingDrivers ||
    isLoadingUnit ||
      isLoadingRoles ||
      isLoadingCities ||
      isLoadingContacts ||
      isLoadingCategoriesData ||
    isLoadingAgriculture;

  const isError =
    isErrorProducts ||
    isErrorOwners ||
    isErrorCars ||
    isErrorDrivers ||
    isErrorUnit ||
      isErrorRoles||
      isErrorCities||
      isErrorContacts||
      isErrorCategories ||
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
        units:
        unitsData?.map((item:any) => ({
          value: String(item.id),
          label: item.name,
        })) || [],

      roles:
        rolesData?.map((item:any) => ({
          value: String(item.id),
          label: item.role_name,
        })) || [],

      contacts:
          contactsData?.map((item:any) => ({
            value: String(item.id),
            label: item.name,
          })) || [],

      cities:
          citiesData?.map((item:any) => ({
            value: String(item.id),
            label: item.name,
          })) || [],

      categories:
          categoriesData?.map((item:any) => ({
            value: String(item.id),
            label: item.name,
          })) || [],
    };
  }, [productsData, ownersData, carsData, driversData, agricultureData, unitsData,rolesData, citiesData, contactsData, categoriesData]);

  return { kernelData, isLoading, isError };
};
