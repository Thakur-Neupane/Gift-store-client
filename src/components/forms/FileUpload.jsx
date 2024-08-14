import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { Spinner } from "react-bootstrap";

const MAX_IMAGES = 6;
const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024; // 10 MB in bytes

const FileUpload = ({ setImages, images, setThumbnail }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // To store error messages

  const token = useSelector((state) => state.userInfo.token);

  const fileUploadAndResize = async (e) => {
    const files = e.target.files;
    if (!files) return;

    let allUploadFiles = [...images];
    let totalSize = allUploadFiles.reduce((acc, file) => acc + file.size, 0);

    if (allUploadFiles.length + files.length > MAX_IMAGES) {
      setError(`You can only upload up to ${MAX_IMAGES} images.`);
      return;
    }

    for (const file of files) {
      if (file.size > MAX_SIZE_BYTES) {
        setError(`File size should not exceed ${MAX_SIZE_MB} MB.`);
        return;
      }
      totalSize += file.size;
      if (totalSize > MAX_SIZE_BYTES) {
        setError(`Total file size should not exceed ${MAX_SIZE_MB} MB.`);
        return;
      }

      try {
        setLoading(true);
        // Resize the image
        await new Promise((resolve, reject) => {
          Resizer.imageFileResizer(
            file,
            720, // width
            720, // height
            "JPEG",
            80, // quality
            0,
            (uri) => resolve(uri),
            "base64"
          );
        })
          .then(async (uri) => {
            try {
              // Upload the resized image
              const { data } = await axios.post(
                `${
                  import.meta.env.VITE_APP_SERVR_ROOT
                }/api/v1/cloudinary/uploadimages`,
                { images: [uri] },
                {
                  headers: { authtoken: token },
                }
              );
              const newImages = data.map((img) => ({
                ...img,
                size: file.size,
              }));
              allUploadFiles = [...allUploadFiles, ...newImages];
              setImages(allUploadFiles);

              // Set the first image as the thumbnail if it's the first upload
              if (allUploadFiles.length === 1) {
                setThumbnail(newImages[0].url);
              }
              setError(""); // Clear any previous errors
            } catch (uploadError) {
              console.error(
                "Image upload error:",
                uploadError.response
                  ? uploadError.response.data
                  : uploadError.message
              );
              setError("Error uploading image. Please try again.");
            } finally {
              setLoading(false);
            }
          })
          .catch((resizeError) => {
            console.error("Image resizing error:", resizeError);
            setError("Error resizing image. Please try again.");
            setLoading(false);
          });
      } catch (err) {
        console.error("General error:", err);
        setError("Unexpected error occurred. Please try again.");
        setLoading(false);
      }
    }
  };

  const handleImageRemove = async (public_id) => {
    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_APP_SERVR_ROOT}/api/v1/cloudinary/removeimages`,
        { public_id },
        {
          headers: { authtoken: token },
        }
      );
      const updatedImages = images.filter(
        (item) => item.public_id !== public_id
      );
      setImages(updatedImages);

      // Update the thumbnail if the removed image was the thumbnail
      if (
        images.find((img) => img.public_id === public_id)?.url === thumbnail
      ) {
        if (updatedImages.length > 0) {
          setThumbnail(updatedImages[0].url); // Set the first remaining image as thumbnail
        } else {
          setThumbnail(""); // Clear thumbnail if no images left
        }
      }
    } catch (err) {
      console.error(
        "Image remove error:",
        err.response ? err.response.data : err.message
      );
      setError("Error removing image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row">
      {error && (
        <div className="col-12 mb-3">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      )}
      {/* Display the first image as a thumbnail */}
      {images.length > 0 && (
        <div className="col-md-3 mb-3 position-relative">
          <img
            src={images[0].url}
            alt="Thumbnail"
            style={{
              width: "100%",
              height: "150px", // Fixed size for the thumbnail
              objectFit: "cover",
              borderRadius: "8px",
              border: "2px solid #ccc",
            }}
          />
          <p style={{ textAlign: "center", marginTop: "5px" }}>Thumbnail</p>
        </div>
      )}
      {/* Display remaining images with fixed size */}
      {images.slice(1).map((image) => (
        <div key={image.public_id} className="col-md-3 mb-3 position-relative">
          <img
            src={image.url}
            alt="Uploaded"
            style={{
              width: "100%",
              height: "150px", // Fixed size for the image
              objectFit: "cover",
              borderRadius: "8px",
              border: "2px solid #ccc",
            }}
          />
          <button
            className="btn btn-danger position-absolute top-0 end-0 m-2 rounded-circle p-2 d-flex align-items-center justify-content-center"
            onClick={() => handleImageRemove(image.public_id)}
            style={{
              zIndex: 1,
              border: "none",
              backgroundColor: "#dc3545",
              color: "white",
              fontSize: "16px",
            }}
          >
            <FaTrashAlt />
          </button>
        </div>
      ))}
      {/* File input */}
      <label className="btn btn-primary btn-raised">
        {loading ? (
          <Spinner
            animation="border"
            role="status"
            style={{ width: "24px", height: "24px" }}
          >
            <span className="visually-hidden">Uploading...</span>
          </Spinner>
        ) : (
          "Choose Files"
        )}
        <input
          type="file"
          multiple
          hidden
          accept="image/*"
          onChange={fileUploadAndResize}
        />
      </label>
    </div>
  );
};

export default FileUpload;
