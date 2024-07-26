// PageDisplay.js
import React, { useEffect, useState } from "react";
// import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";

const PageDisplay = () => {
    const permanentLink = useSelector((state) => state.pages.value);
  
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await fetch(`http://localhost:5000${permanentLink}`);
        if (!response.ok) {
          throw new Error("Page not found");
        }
        const data = await response.json();
        setPage(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [permanentLink]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="page-display">
      <h1>{page.slang}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.html }} />
    </div>
  );
};

export default PageDisplay;
