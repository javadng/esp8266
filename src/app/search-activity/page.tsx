import SearchUserForm from "@/components/searchUserForm";
import { checkAuthToken } from "@/utils/check-auth";

const SearchActivityPage = async () => {
  checkAuthToken();

  return (
    <div className="container mx-auto">
      <SearchUserForm />
    </div>
  );
};

export default SearchActivityPage;
