import React, { useState, useEffect } from "react";
import Image from "./Image";
import axios from "axios";
import { PRODUCT_URL, USER_URL } from "../constants";
import ImageModel from "./ImageModel";

const Images = () => {
  const [images, setImages] = useState([]);

  // async function getImages() {
  //   const resp = await axios.get('https://api.unsplash.com/photos?page=1', {
  //     headers: {
  //       Authorization: "Client-ID vSVoYbP4Ftv0Y61XT7-79utUOFnAmHD_v7oBm6kzWtU",
  //     }
  //   })
  //   const imageUrl = [];
  //   for (let i = 0; i < resp.data.length; i++) {
  //     imageUrl.push(resp.data[i].urls.raw);
  //   }
  //   setImages(imageUrl);
  // };

  // useEffect(() => {
  (async function () {
    const response = await axios.get(PRODUCT_URL.getallimages);
    if (response.status === 200) {
      const imgUrl = [];
      for (let i = 0; i < response.data.data.length; i++) {
        imgUrl.push(response.data.data[i].url);
      }
      setImages(imgUrl);
    } else {

    }
  })();
  // })


  return (
    <React.Fragment>
      <section className="overflow-hidden text-neutral-700">
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
          <div className="-m-1 flex flex-wrap md:-m-2">
            {
              images.map((el) => {
                return (
                  <Image
                    key={el}
                    url={el}
                  />)
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
