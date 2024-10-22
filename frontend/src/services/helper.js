import { BaseURL } from "../BaseUrl";

// const ImageHelper = ({ image, size = 60 }) => {
//   return (
      // <img
      //   src={`${BaseURL}/${image}`}
      //   width={size}

      //   className="border border-primary p-[2px] object-cover rounded-lg"
      //   style={{ height: size }}
      // />

    // <img
    //   src={`${BaseURL}/${image
    //     .replaceAll("\\", "/")
    //     .replaceAll("public/", "")}`}
    //   className="object-cover rounded-lg"
    // />
//   );
// };

// export default ImageHelper;



const ImageHelper = ({ image, size = 60, width }) => {
  // Check if the image exists, otherwise provide a default or fallback image
  const processedImage = image
    ? `${BaseURL}/${image.replaceAll("\\", "/").replaceAll("public/", "")}`
    : "default_image.png"; // Provide a default image or a placeholder

  return (
    <img
      src={processedImage}
      className="object-cover rounded-lg"
      style={{ width: width ?? size, height: size }} // You can adjust the size here if needed
      alt="Image"
    />
  );
};

export default ImageHelper;
