import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./Context";

const url = `https://api.unsplash.com/search/photos?client_id=dTLafwi9WE6QweQ-o36_xAilehaPhJE8MywkQVqfzmo&`;

const Gallery = () => {
  const { searchTerm } = useGlobalContext();

  //   console.log(searchTerm);
  const { isLoading, isError, data } = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: async () => {
      const data = axios.get(`${url}query=${searchTerm}`);
      return data;
    },
  });

  if (isLoading) {
    return <section className="image-container">Loading...</section>;
  }
  if (isError) {
    return (
      <section className="image-container">There was an Error...!</section>
    );
  }

  const results = data.data.results;
  if (results.length < 1) {
    <section className="image-container">
      <h4>No Results Found</h4>
    </section>;
  }

  return (
    <section className="image-container">
      {results.map((item) => {
        const url = item?.urls?.regular;
        return (
          <section key={item.id}>
            <img className="img" src={url} alt={item.alt_description} />
          </section>
        );
        // console.log(item.urls.small);
      })}
    </section>
  );
};

export default Gallery;
