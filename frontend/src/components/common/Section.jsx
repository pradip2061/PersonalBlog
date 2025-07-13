import React from "react";
import Card from "./Card";
import { ChevronRight } from "lucide-react";

const Section = ({ topic, data }) => {
  return (
    <section className=" px-6 lg:px-36">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-1 h-8 bg-red-500"></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {topic}
          </h2>
        </div>
        <button className="flex items-center space-x-2 text-red-500 hover:text-red-600 font-semibold transition-colors">
          <span>View All</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-4">
        {data.length > 0 &&
          data.map((item) => <Card key={item._id} data={item} />)}
      </div>
    </section>
  );
};

export default Section;
