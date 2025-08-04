import React from "react";
import { useGetSalesQuery } from "../api/salesApi";

const SalePage = () => {
  const { data, error, isLoading } = useGetSalesQuery();

  return <div>SalePage</div>;
};

export default SalePage;
