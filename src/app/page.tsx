import { checkAuthToken } from "@/utils/check-auth";

export default function Home() {
  checkAuthToken();

  return <div>Home page</div>;
}
