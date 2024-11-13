import React from 'react';
import { User } from 'lucide-react';

const testimonials = [
  { id: 1, name: 'Alex Johnson', text: 'AstroLearn opened up a whole new universe for me. The courses are engaging and easy to follow.' },
  { id: 2, name: 'Samantha Lee', text: 'I\'ve always been fascinated by space, and these courses have deepened my understanding immensely.' },
  { id: 3, name: 'Michael Chen', text: 'The instructors are knowledgeable and passionate. I look forward to every lesson!' },
];

function Testimonials() {
  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">What Our Students Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <User className="h-12 w-12 text-indigo-600 dark:text-indigo-400 mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{testimonial.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">Student</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">&quot;{testimonial.text}&quot;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;