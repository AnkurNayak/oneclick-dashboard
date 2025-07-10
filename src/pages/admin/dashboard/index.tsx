import { getUser } from "@/lib/api.service";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const res = await getUser();
    console.log("response isFinite", res);
    return {
      props: {
        user: res,
      },
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      props: {
        projects: [],
      },
    };
  }
};

interface AdminHomePageProps {
  user: any;
}

const AdminHomePage = ({ user }: AdminHomePageProps) => {
  console.log("user is", user);
  return <div>Admin Home </div>;
};

export default AdminHomePage;
