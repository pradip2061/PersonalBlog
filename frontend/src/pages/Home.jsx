import React, { useEffect, useState } from "react";
import nprogress from "nprogress";
import {
  addOverlay,
  removeOverlay,
} from "../components/context/SuspenseWithNProgress";
import Card from "../components/common/Card";
import Section from "../components/common/Section";
import { useDispatch, useSelector } from "react-redux";
import { FetchBlogThunk } from "../store/getblog/getblogThunk";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.getblog.projects);
  const status= useSelector((state) => state.getblog.status);
  const codingfactsandjokes = useSelector(
    (state) => state.getblog.codingandjokes
  );
  const tutorials = useSelector((state) => state.getblog.tutorials);

  useEffect(() => {
    if(status === 'success'){
      nprogress.done();
      removeOverlay();
    }
  },[status]);


  if(status === "pending"){
 nprogress.start();
    addOverlay();
  }
  useEffect(()=>{
    dispatch(FetchBlogThunk())
  },[dispatch])

  return (
    <>
        <div className="flex items-center space-x-4  ml-8 lg:ml-40 pt-5">
          <div className="w-1 h-8 bg-red-500"></div>
          <h2 className=" text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            Latest Posts
          </h2>
        </div>
      <div className="flex flex-col md:flex-row gap-6 py-14 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 justify-center px-4 lg:px-24">
        {/* Left - Large Card */}
        <div className="w-full md:w-[60%]">
          <Card isLarge={true} data={tutorials?.[0]} />
        </div>
        {/* Right - Two stacked small cards */}
        <div className="w-full md:w-[30%] flex flex-col gap-6">
          <Card isLarge={false} data={projects?.[0]} />
          <Card isLarge={false} data={codingfactsandjokes?.[0]} />
        </div>
      </div>
      <div className="flex flex-col gap-28 lg:gap-16">
        {
          projects.length >0  && <Section topic="Latest Projects" data={projects}/>
        }
        {
          tutorials.length >0 && <Section topic="Tutorials" data={tutorials} />
        }
        {
          codingfactsandjokes.length >0 && <Section topic="Coding jokes and Facts" data={codingfactsandjokes} />
        }
        
      </div>
    </>
  );
};

export default Home;
