import { SignedIn, SignedOut, SignIn, SignUp, RedirectToSignIn } from '@clerk/clerk-react';

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut><RedirectToSignIn /></SignedOut>
    </>
  );
};

export const SignInPage = () => <div className="flex justify-center p-6"><SignIn routing="hash" /></div>;
export const SignUpPage = () => <div className="flex justify-center p-6"><SignUp routing="hash" /></div>;
