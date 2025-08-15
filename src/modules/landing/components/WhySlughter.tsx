import React from 'react';

const WhySlaughterERP = () => {
  return (
    <section id='why' className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Why Choose Slaughter ERP?</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-teal-400 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Automated Truck Loading</h3>
                  <p className="text-teal-400">Save time with seamless tracking of truck entry, exit, and weight measurements, reducing manual errors.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-teal-400 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-Time Order Management</h3>
                  <p className="text-teal-400">Easily create, verify, and track customer orders with real-time updates for maximum efficiency.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-teal-400 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Precise Product Tracking</h3>
                  <p className="text-teal-400">Monitor loaded products with weight-based pricing and buyer details for accurate operations.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-teal-400 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Scalable for Any Slaughterhouse</h3>
                  <p className="text-teal-400">Whether you're a small facility or a large operation, our ERP scales to meet your needs.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-purple-600 to-teal-400 rounded-2xl p-8 text-white shadow-2xl max-w-md">
              <h3 className="text-2xl font-bold mb-6">Transform Your Operations Today</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <span className="text-lg mr-3">🚚</span>
                  <span>Real-time truck tracking</span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg mr-3">📋</span>
                  <span>Automated order processing</span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg mr-3">⚖️</span>
                  <span>Accurate weight calculations</span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg mr-3">📊</span>
                  <span>Actionable insights</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Get Started Now</div>
                <div className="text-sm opacity-90">Free demo available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySlaughterERP;