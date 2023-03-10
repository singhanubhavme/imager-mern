import React, { useState, useEffect } from "react";
import Image from "./Image";
import axios from "axios";
import { PRODUCT_URL } from "../constants";

const Images = () => {
  const [images, setImages] = useState([]);
  const [commentAdded, setCommentAdded] = useState(false);

  useEffect(() => {
    (async function () {
      const response = await axios.get(PRODUCT_URL.getallimages);
      console.log(response);
      if (response.status === 200) {
        const img = [];
        for (let i = 0; i < response.data.data.length; i++) {
          const data = response.data.data[i];
          img.push({
            url: data.url,
            title: data.title,
            likes: data.likes,
            imgId: data._id,
            comments: data.comment
          });
        }
        setImages(img);
      } else {

      }
      console.log("here");
    })();
  }, [commentAdded]);

  return (
    <React.Fragment>
      <section className="overflow-hidden text-neutral-700">
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
          <div className="-m-1 flex flex-wrap md:-m-2">
            {
              images.map((img) => {
                return (
                  <Image
                    key={img.url}
                    img={img}
                    setCommentAdded={setCommentAdded}
                  />
                );
              }
              )
            }
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Images;
