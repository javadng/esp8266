import AddNewCard from "@/components/addNewCard";
import verifyToken from "@/utils/verify-token";

const CardPage = async () => {
  const tokenVerify = await verifyToken();
  const errorMessage = tokenVerify?.error;

  if (errorMessage)
    return (
      <div className="text-center mx-auto mt-24 text-2xl text-red-500 font-bold">
        <h2>{errorMessage}</h2>
      </div>
    );

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
