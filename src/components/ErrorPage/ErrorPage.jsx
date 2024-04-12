import React from "react";

import shit from "../../assets/shit-sheet.gif";

const ErrorPage = () => {
  return (
    <>
    <div className="flex flex-col justify-center items-center h-screen">
      <div></div>
      <div className="flex justify-center items-center">
        <img className="border shadow-purpleshade" src={shit} />
      </div>
      <div className="flex justify-center items-center">
        <h1 className=" mt-3 text-red-500 text-4xl font-kodemono">404 NOT FOUND !!!</h1>
        <br/>
       
       
      </div>
      
    </div>
  </>
  
  );
};

export default ErrorPage;
