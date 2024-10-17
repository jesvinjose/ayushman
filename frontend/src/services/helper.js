// const ImageHelper = ({ image, size = 60 }) => {
//   return (
//     //   <img
//     //     src={`http://localhost:4000/${image}`}
//     //     width={size}

//     //     className="border border-primary p-[2px] rounded-full"
//     //     style={{ height: size }}
//     //   />

//     <img
//       src={`http://localhost:4000/${image
//         .replaceAll("\\", "/")
//         .replaceAll("public/", "")}`}
//       className="object-cover rounded-lg"
//     />
//   );
// };

// export default ImageHelper;

const ImageHelper = ({ image, size = 60, width }) => {
  // Check if the image exists, otherwise provide a default or fallback image
  const processedImage = image
    ? `http://localhost:4000/${image.replaceAll("\\", "/").replaceAll("public/", "")}`
    : "default_image.webp"; // Provide a default image or a placeholder

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

