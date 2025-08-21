import { useThemeSettings } from "@/modules/shared/hooks/useThemeSettings";

const products = [
  { name: "Prime Beef", quantity: 150, revenue: 45000 },
  { name: "Chicken Breast", quantity: 320, revenue: 29000 },
  { name: "Pork Loin", quantity: 210, revenue: 35000 },
  { name: "Lamb Chops", quantity: 90, revenue: 18000 },
];

const TopProducts = () => {
  const { mode, rtl } = useThemeSettings();

  return (
    <div
      className={`shadow-sm border rounded-xl p-6 mb-8 transition-colors duration-300
        ${
          mode === "dark"
            ? "bg-gray-800 border-gray-700 text-gray-100"
            : "bg-white border-gray-200 text-gray-900"
        }
      `}
      dir={rtl ? "rtl" : "ltr"}
    >
      <h3
        className={`text-lg font-semibold mb-4 ${
          mode === "dark" ? "text-gray-100" : "text-gray-900"
        }`}
      >
        Top Selling Products
      </h3>
      <table className="w-full text-sm">
        <thead
          className={`border-b ${
            mode === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <tr className={rtl ? "text-right" : "text-left"}>
            <th className="py-2">Product</th>
            <th className="py-2">Quantity Sold</th>
            <th className="py-2">Revenue</th>
          </tr>
        </thead>
        <tbody
          className={`divide-y ${
            mode === "dark" ? "divide-gray-700" : "divide-gray-200"
          }`}
        >
          {products.map((prod, idx) => (
            <tr key={idx} className={rtl ? "text-right" : "text-left"}>
              <td className="py-2">{prod.name}</td>
              <td className="py-2">{prod.quantity}</td>
              <td className="py-2">${prod.revenue.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopProducts;
