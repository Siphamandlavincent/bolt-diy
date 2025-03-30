// ... existing code ...

// Add image upload handler
const handleImageUpload = (files: FileList) => {
  const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
  // Store these URLs to include with the prompt
  setAttachedImages(imageUrls);
};

// Modify your submit handler
const handleSubmit = async () => {
  const response = await openRouterProvider.call(
    inputText,
    selectedModel,
    attachedImages
  );
  // ... rest of your submit logic
};

// ... existing code ...