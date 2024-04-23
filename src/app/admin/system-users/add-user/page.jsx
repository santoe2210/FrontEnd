import Link from "next/link";

import AddUserForm from "@/components/Admin/SystemUsers/AddUserForm";
import { getToken } from "@/app/utils/cookie";

const AddUser = async () => {
  const token = await getToken();

  return (
    <>
      <div className="h-[60px] bg-white w-full px-5 py-5 p3">
        <Link
          href="/admin/system-users"
          className="hover:text-info hover:underline transition"
          passHref
        >
          Admin
        </Link>{" "}
        &gt;
        <Link
          href="/admin/system-users"
          className="hover:text-info hover:underline transition"
          passHref
        >
          Users
        </Link>{" "}
        &gt; <span className="font-bold">Add User</span>{" "}
      </div>
      <div className="max-w-[600px] mx-auto smmx:mx-4 my-12">
        <AddUserForm />
      </div>
    </>
  );
};

export default AddUser;
