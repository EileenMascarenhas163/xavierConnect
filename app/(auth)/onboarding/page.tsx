

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";
import SignOutRedirect from "@/components/signoutdirect";


async function Page() {
  
  const user = await currentUser();
  
 
  if (!user) return null; // to avoid typescript warnings

  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };
  // Regular expression to match email addresses ending with @xaviers.edu.in
const emailRegex = /^[a-zA-Z0-9._%+-]+@xaviers\.edu\.in$/;

// Example email address
const emailAddress: string | undefined = user?.emailAddresses[0].emailAddress;

// Check if the email address matches the pattern
if (emailRegex.test(emailAddress)) {
  return (
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
      <h1 className='head-text'>Onboarding</h1>
      <p className='mt-3 text-base-regular text-light-2'>
        Complete your profile now, to use Threds.
      </p>

      <section className='mt-9 bg-dark-2 p-10'>
        <AccountProfile user={userData} btnTitle='Continue' />
      </section>
    </main>
  );
} else {
    return(
      <SignOutRedirect/>
    );
}


  
}

export default Page;
