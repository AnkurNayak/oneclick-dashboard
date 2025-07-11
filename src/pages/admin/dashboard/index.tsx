"use server";
import { verifyJWT } from "@/lib/auth";
import { GetServerSideProps } from "next";
import { Fragment } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const token = req.cookies.session;
  try {
    const verifiedUserData = await verifyJWT(token);
    return {
      props: {
        user: verifiedUserData,
        token: token,
      },
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      props: {
        user: null,
        token: null,
      },
    };
  }
};

interface AdminHomePageProps {
  user: {
    id: string;
    email: string;
    password: string;
    role: string;
    name: string;
    expiresAt: string;
  };
  token: string;
}

const AdminHomePage = ({ user, token }: AdminHomePageProps) => {
  console.log("user is", user);
  return (
    <Fragment>
      <div className="bg-card">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col px-6 sm:px-8">
          <div className="my-8 flex min-w-0 flex-auto flex-col sm:my-12 sm:flex-row sm:items-center">
            <span className="truncate text-2xl font-semibold leading-7 tracking-tight md:text-5xl md:leading-snug">{`Welcome back, ${user.name}`}</span>
          </div>
        </div>
      </div>
      <div className="-mt-px flex-auto border-t border-gray-400 dark:border-gray-600 pt-4 sm:pt-6">
        <div className="p-6">
          <div className="rounded-md bg-accent min-h-80 overflow-hidden">
            <div className="bg-primary text-2xl font-semibold p-4">
              Admin Info
            </div>
            <div className="flex flex-col space-y-4 p-4">
              <div className="break-all">
                <span className="font-bold">Token :</span> {token}
              </div>
              <div>
                <span className="font-bold">Name :</span> {user.name}
              </div>
              <div>
                <span className="font-bold">Email :</span> {user.email}
              </div>
              <div>
                <span className="font-bold">Role :</span> {user.role}
              </div>
              <div>
                <span className="font-bold">Expires At :</span> {user.expiresAt}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminHomePage;
