import React from 'react';
import Hero from '../../../Components/User/Home/Hero';
import FeaturedCourses from '../../../Components/User/Home/FeaturedCourses';
import Testimonials from '../../../Components/User/Home/Testimonials';
import CallToAction from '../../../Components/User/Home/CallToAction';

function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedCourses />
      <Testimonials />
      <CallToAction />
    </main>
  );
}

export default HomePage;