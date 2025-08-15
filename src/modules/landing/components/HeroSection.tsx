import React from 'react';

const HeroSection = () => {
  return (
    <section id='hero' className="bg-gradient-to-r from-purple-600 to-teal-400 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Optimize Your Slaughterhouse with 
              <span className="text-purple-600">Slaughter ERP</span>
            </h1>
            <p className="text-xl text-teal-400 mb-8 leading-relaxed">
              Streamline purchases, track orders, and manage truck loading with real-time precision and efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Get Started
              </button>
              <button className="bg-teal-400 hover:bg-teal-300 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Watch Demo
              </button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="animate-pulse">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Truck Loading Stats</h3>
                    <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-teal-400 text-sm">Total Weight Loaded</span>
                      <span className="text-gray-900 font-semibold">15,200 kg</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "80%" }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-teal-400 text-sm">Loading Status</span>
                      <span className="text-teal-400 font-semibold">On Track</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-teal-400 h-2 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-300 pt-4">
                  <div className="text-sm text-teal-400 mb-2">Recent Orders</div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-900">Beef Order #123</span>
                      <span className="text-xs text-amber-400">5,000 kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-900">Lamb Order #124</span>
                      <span className="text-xs text-amber-400">3,200 kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-900">Poultry Order #125</span>
                      <span className="text-xs text-amber-400">2,800 kg</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;