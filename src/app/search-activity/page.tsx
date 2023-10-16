import SearchActivityItems from "@/components/searchActivity";
import SearchUserForm from "@/components/searchUserForm";
import verifyToken from "@/utils/verify-token";

const SearchActivityPage = async () => {
  // const errorMessage = await verifyToken();

  // if (errorMessage)
  //   return (
  //     <div className="text-center mx-auto mt-24 text-2xl text-red-500 font-bold">
  //       <h2>{errorMessage}</h2>
  //     </div>
  //   );

  return (
    <div className="container mx-auto">
      <SearchUserForm />
    </div>
  );
};

export default SearchActivityPage;
