import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Eye } from 'lucide-react'; // for a small view icon

const Card = ({ isLarge, data }) => {
  const navigate = useNavigate();
  const toastId = useRef(null);

  if (!data) return null;
  const { _id, title, category, createdAt, image, views = [] } = data; // default empty array

  const date = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const handleClick = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.warning("Please Sign in first to see the posts");
      }
    } else {
      navigate(`/content/${_id}`);
    }
  };

  return (
    <div onClick={handleClick} className="group cursor-pointer block">
      {/* Image container */}
      <div className={`relative overflow-hidden rounded-lg ${isLarge ? 'h-96' : 'h-48'}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {isLarge && (
          <div className="absolute bottom-4 left-4 right-4 text-white z-10">
            <span className="inline-block px-3 py-1 bg-red-500 text-xs font-semibold rounded mb-2 uppercase tracking-wide">
              {category}
            </span>
            <h2 className="text-2xl font-bold mb-1 leading-snug">{title}</h2>
            <p className="text-sm text-gray-300 flex items-center gap-4">
              {date}
              <span className="flex items-center gap-1 text-gray-300">
                <Eye className="w-4 h-4" />
                {views.length}
              </span>
            </p>
          </div>
        )}
      </div>

      {!isLarge && (
        <div className="mt-4">
          <span className="inline-block px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded mb-2 uppercase tracking-wide">
            {category}
          </span>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors">
            {title}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-gray-500 dark:text-gray-400 text-sm">{date}</p>
            <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
              <Eye className="w-4 h-4" />
              {views.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Card);
