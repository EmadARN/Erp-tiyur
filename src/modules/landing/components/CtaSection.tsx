import React from "react";
import { useNavigate } from "react-router-dom";

const CtaSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 hero-bg">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of slaughterhouses already using Slaughter ERP to
            streamline their operations and increase efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/auth/login")}
              className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all btn-hover"
            >
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all btn-hover">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
