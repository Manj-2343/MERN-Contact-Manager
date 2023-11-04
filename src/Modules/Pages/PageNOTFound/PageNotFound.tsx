import React from 'react';
import NotFoundImage from "../../../assets/img/1a.gif"

const NotFoundPage:React.FC = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">404 - Page Not Found</h1>
      <img src={NotFoundImage} alt="Page Not Found" />
    </div>
  );
};

export default NotFoundPage;
