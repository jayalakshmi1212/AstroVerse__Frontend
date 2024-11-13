import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';

function Hero() {
  return (
    <section className="bg-indigo-700 text-white py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore the Universe with AstroVerse</h1>
          <p className="text-xl mb-6">Embark on a cosmic journey of discovery through our interactive astronomy courses.</p>
          <Link to="/courses" className="bg-white text-indigo-700 py-2 px-6 rounded-full text-lg font-semibold hover:bg-indigo-100 transition duration-300">
            Start Learning
          </Link>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <Rocket className="h-64 w-64 text-indigo-300" />
        </div>
      </div>
    </section>
  );
}

export default Hero;