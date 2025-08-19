const products = [
  { name: "Prime Beef", quantity: 150, revenue: 45000 },
  { name: "Chicken Breast", quantity: 320, revenue: 29000 },
  { name: "Pork Loin", quantity: 210, revenue: 35000 },
  { name: "Lamb Chops", quantity: 90, revenue: 18000 },
];

const TopProducts = () => {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Top Selling Products
      </h3>
      <table className="w-full text-left text-sm text-gray-700">
        <thead className="border-b border-gray-200">
          <tr>
            <th className="py-2">Product</th>
            <th className="py-2">Quantity Sold</th>
            <th className="py-2">Revenue</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((prod, idx) => (
            <tr key={idx}>
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
