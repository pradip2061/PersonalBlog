import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ isLarge, data }) => {
  console.log(data);
  if (!data) return null;
  const { _id, title, category, createdAt, image } = data;

  const date = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Link to={`/content/${_id}`} className="group cursor-pointer block">
      {/* Image container */}
      <div className={`relative overflow-hidden rounded-lg ${isLarge ? 'h-96' : 'h-48'}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-content group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Text over image for large cards */}
        {isLarge && (
          <div className="absolute bottom-4 left-4 right-4 text-white z-10">
            <span className="inline-block px-3 py-1 bg-red-500 text-xs font-semibold rounded mb-2 uppercase tracking-wide">
              {category}
            </span>
            <h2 className="text-2xl font-bold mb-1 leading-snug">{title}</h2>
            <p className="text-sm text-gray-300">{date}</p>
          </div>
        )}
      </div>

      {/* Text below image for small cards */}
      {!isLarge && (
        <div className="mt-4">
          <span className="inline-block px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded mb-2 uppercase tracking-wide">
            {category}
          </span>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{date}</p>
        </div>
      )}
    </Link>
  );
};

export default React.memo(Card);
