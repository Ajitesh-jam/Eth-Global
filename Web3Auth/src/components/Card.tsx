import React from 'react';

type TitleImageProps = {
  title: string;
  imageUrl: string;
  altText: string;
};

const TitleImage: React.FC<TitleImageProps> = ({ title, imageUrl, altText }) => {
    return (
      <div className="title-image-container">
        <h1>{title}</h1>
        <img src={imageUrl} alt={altText} className="title-image" />
      </div>
    );
  };

export default TitleImage;
