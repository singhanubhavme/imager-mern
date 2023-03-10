import React, { useState, useEffect } from "react";

const Image = ({ url }) => {
  return (
    <React.Fragment>
      <div class="flex w-1/3 flex-wrap">
        <div class="w-full p-1 md:p-2">
          <img
            alt="gallery"
            class="block h-full w-full rounded-lg object-cover object-center"
            src={url} />
        </div>
      </div>
    </React.Fragment>
  )
};

export default Image;
