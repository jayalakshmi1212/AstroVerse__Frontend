import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function CallToAction() {
  return (
    <section className="py-20 bg-indigo-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Cosmic Journey?</h2>
        <p className="text-xl mb-8">Join thousands of students exploring the wonders of the universe.</p>
        <Link to="/signup" className="bg-white text-indigo-700 py-3 px-8 rounded-full text-lg font-semibold hover:bg-indigo-100 transition duration-300 inline-flex items-center">
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}

export default CallToAction;