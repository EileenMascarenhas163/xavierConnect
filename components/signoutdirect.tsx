// Import necessary dependencies
"use client";
import { useRouter } from "next/navigation";
import { SignOutButton, SignedIn } from "@clerk/nextjs";

// Define a functional component
const SignOutRedirect = () => {
    const router = useRouter();
 
  // JSX structure
  return (
    <div className=" items-center justify-center min-h-screen bg-indigo-500 bg-fixed bg-cover bg-bottom error-bg">

        <div className="p-5">
      <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-red-700 bg-red-100 border border-red-300">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-alert-octagon w-5 h-5 mx-2">
            <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <div className="text-xl font-normal max-w-full flex-initial">
          Please login with your College Email id
        </div>
        <div className="flex flex-auto flex-row-reverse">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x cursor-pointer hover:text-red-400 rounded-full w-5 h-5 ml-2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-center min-h-screen bg-indigo-500 bg-fixed bg-cover bg-bottom error-bg">
    
    <div className="container">
      <div className="row">
        <div className="col-sm-8 offset-sm-2 text-gray-50 text-center -mt-52">
          <div >
            <h1 className="font-sans font-bold">
              Error 404
            </h1>
          </div>
          <p className="text-gray-100 mt-2 mb-6">We are sorry, There was Some Error signing you in</p>
          <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div >
            <p className="bg-green-400 px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg">
              Go Back
            </p>
            </div>
          </SignOutButton>
        </SignedIn> 
          
        </div>
      </div>
    </div>
  </div>
       
        

</div>
      
  );
};

// Export the component
export default SignOutRedirect;
