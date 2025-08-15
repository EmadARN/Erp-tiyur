import React from "react";

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-purple-600 mb-4">
            Key Features
          </h2>
          <p className="text-xl text-gray-900 max-w-2xl mx-auto">
            Streamline your slaughterhouse operations with our comprehensive ERP
            solution
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg border-2 border-purple-600 card-hover transition-all duration-300">
            <div className="text-4xl text-amber-400 mb-4">🚛</div>
            <h3 className="text-2xl font-semibold text-purple-600 mb-4">
              Truck Loading Management
            </h3>
            <p className="text-gray-900">
              Track truck entry/exit, weights, and cancellations with real-time
              monitoring and automated workflows.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border-2 border-purple-600 card-hover transition-all duration-300">
            <div className="text-4xl text-amber-400 mb-4">📋</div>
            <h3 className="text-2xl font-semibold text-purple-600 mb-4">
              Order Management
            </h3>
            <p className="text-gray-900">
              Create, verify, and manage customer orders with ease using our
              intuitive interface and automated processes.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border-2 border-purple-600 card-hover transition-all duration-300">
            <div className="text-4xl text-amber-400 mb-4">📦</div>
            <h3 className="text-2xl font-semibold text-purple-600 mb-4">
              Product Tracking
            </h3>
            <p className="text-gray-900">
              Monitor loaded products with weight-based pricing and
              comprehensive inventory management.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border-2 border-purple-600 card-hover transition-all duration-300">
            <div className="text-4xl text-amber-400 mb-4">📊</div>
            <h3 className="text-2xl font-semibold text-purple-600 mb-4">
              Real-Time Insights
            </h3>
            <p className="text-gray-900">
              Access data instantly for smarter decisions with comprehensive
              analytics and reporting tools.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
