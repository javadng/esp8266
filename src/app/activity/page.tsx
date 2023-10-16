import TodaysActivityItems from "@/components/todaysAcivityItems";
import { checkAuthToken } from "@/utils/check-auth";
import { UserLogItem } from "@/utils/globalInterfaces";

const ActivityPage = async () => {
  checkAuthToken();

  let allActivity: UserLogItem[] = [];
  let errorMessage = "";
  let elements;

  try {
    const res = await fetch(`http://localhost:3000/api/get-activity`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error(res.statusText + " ** " + res.status);

    const result = await res.json();

    allActivity = result?.data;
  } catch (error: any) {
    errorMessage = error.message;
  }

  if (allActivity && allActivity?.length > 0) {
    elements = <TodaysActivityItems items={allActivity} />;
  } else {
    elements = (
      <h2 className="text-center text-2xl my-5">There is no log for today</h2>
    );
  }

  return (
    <div>
      <div className="text-center my-3">{new Date().toLocaleString()}</div>
      {errorMessage === "" && elements}
      {errorMessage !== "" && errorMessage}
    </div>
  );
};

export default ActivityPage;
