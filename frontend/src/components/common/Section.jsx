import React from "react";
import Card from "./Card";
import { ChevronRight } from "lucide-react";

const Section = ({ topic, data }) => {
  return (
    <section className="px-6 lg:px-36">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-1 h-8 bg-red-500"></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {topic}
          </h2>
        </div>

        {data.length > 4 && (
          <button className="flex items-center space-x-2 text-red-500 hover:text-red-600 font-semibold transition-colors">
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Card Grid */}
      <div
        className={`grid gap-6 pb-4 ${
          data.length === 1
            ? "justify-center" // Center single card
            : "grid-cols-[repeat(auto-fit,minmax(250px,1fr))]" // Responsive grid for multiple cards
        }`}
      >
        {data.length > 0 &&
          data.map((item) => <Card key={item._id} data={item} />)}
      </div>
    </section>
  );
};

export default Section;
