import { getToken } from "@/app/utils/cookie";
import SetClouserDate from "@/components/Admin/SetClouserDate";
import Link from "next/link";

async function getAcademicYearLists(userToken) {
  const res = await fetch(
    `${process.env.API_URL}/academicYear/getAllacademicYear`,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  return res.json();
}

const SetClosureDatePage = async () => {
  const token = await getToken();
  const academicYerLists = await getAcademicYearLists(token);

  if (!academicYerLists) {
    return <p>There is no information.</p>;
  }

  return (
    <>
      <div className="h-[60px] bg-white w-full px-5 py-5 p3">
        <Link
          href="/admin"
          className="hover:text-info hover:underline transition"
          passHref
        >
          Admin
        </Link>{" "}
        &gt;{" "}
        <Link
          href="/admin/closure-date"
          className="hover:text-info hover:underline transition"
          passHref
        >
          Academic Closure Dates
        </Link>{" "}
        &gt; <span className="font-bold"> Set Closure Date</span>{" "}
      </div>
      <div className="py-9 px-12">
        <SetClouserDate year={academicYerLists?.year} userToken={token} />
      </div>
    </>
  );
};

export default SetClosureDatePage;
