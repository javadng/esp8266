"use client";

import AddNewCard from "@/components/addNewCard";

const CardPage = () => {
  
  return (
    <div className="text-center mx-auto">
      <AddNewCard />
      <ul className="bg-blue-100 py-6">
        <h2>Active cards : </h2>
        {}
      </ul>
    </div>
  );
};

export default CardPage;
