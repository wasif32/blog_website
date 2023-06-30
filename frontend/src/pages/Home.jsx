import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([])
  const location = useLocation();


  async function getData() {
    const params = new URLSearchParams(location.search);
    const category = params.get("cat");

    let url = "http://localhost:5000";
    if (category && (category === "technology" || category === "health" || category === "education")) {
      url += `?category=${category}`;
    }

    const response = await fetch(url);
    const result = await response.json();
    setData(result);
  }

  useEffect(() => {
    getData();
  }, [location]);


  return (
    <div className="home">
      <div className="posts">
        {data.map((blogData) => {
          return (
            <div className="post" key={blogData._id}>
              <div className="img">
                <img src={blogData.image_url} alt="image" />
              </div>
              <div className="content">
                <h1>{blogData.title}</h1>
                <p>{blogData.description}</p>
                <Link className="link" to={`/read/${blogData._id}`}>
                  <button>Read More</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
