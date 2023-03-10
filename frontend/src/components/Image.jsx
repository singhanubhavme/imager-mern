import React, { useState, useEffect } from "react";
import ImageModel from "./ImageModel";

const Image = ({ url }) => {
  const [model, setModel] = useState(false);
  const handleClick = () => {
    setModel(true);
  }
  return (
    <React.Fragment>
      {!model ?
        <div className="flex w-1/3 flex-wrap">
          <div className="w-full p-1 md:p-2">
            <img
              onClick={handleClick}
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={url}
            />
          </div>
        </div>
        :
        <ImageModel
          url={url}
        />
      }
    </React.Fragment >
  )
};

export default Image;
