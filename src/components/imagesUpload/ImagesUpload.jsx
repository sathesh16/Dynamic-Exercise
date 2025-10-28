import React, { useState, useEffect } from "react";

export default function ImagesUpload() {
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");
    const [isDragging, setIsDragging] = useState(false);

    const maxSize = 2 * 1024 * 1024; // 2 MB

    // Handle both file input and drag-drop
    const handleFiles = (files) => {
        const fileArray = Array.from(files);

        const validFiles = fileArray.filter((file) => {
            if (file.size > maxSize) {
                setError(`${file.name} is larger than 2 MB`);
                return false;
            }
            if (!file.type.startsWith("image/")) {
                setError(`${file.name} is not an image`);
                return false;
            }
            return true;
        });

        const newImages = validFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setImages((prev) => [...prev, ...newImages]);
    };

    const handleImageChange = (e) => {
        handleFiles(e.target.files);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    useEffect(() => {
        return () => images.forEach((img) => URL.revokeObjectURL(img.preview));
    }, [images]);

    return (
        <div className="p-4">
            {/* 🔹 Drop Zone */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}

                style={
                    { padding: "40px", display: "flex", flexDirection: "column", gap: "20px", border: isDragging ? "2px dashed red" : "1px solid #000", margin: "10px auto", maxWidth: "500px" }
                }
            >
                <p className="text-gray-600">
                    Drag & Drop your images here or{" "}
                    <label className="text-blue-600 cursor-pointer underline">
                        click to browse
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                </p>
            </div>

            {/* 🔹 Error Message */}
            {error && <p className="text-red-500 mt-2">{error}</p>}

            {/* 🔹 Image Previews */}
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {images.map((img, index) => (
                    <div key={index} className="relative" style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
                        <img
                            src={img.preview}
                            alt={`preview ${index}`}
                            style={{ width: "200px", height: "200px", objectFit: "cover" }}

                        />
                        <button
                            onClick={() => setImages(images.filter((_, i) => i !== index))}

                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div >
    );
}
