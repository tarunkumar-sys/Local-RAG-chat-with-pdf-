import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export const Auth = ({ isHero = false }: { isHero?: boolean }) => {
  return (
    <div>
      <SignedOut>
        <SignInButton mode="modal">
          <button className={`
            rounded-full font-bold transition-all active:scale-95 shadow-lg
            bg-foreground text-background hover:opacity-90
            ${isHero ? "px-10 py-4 text-lg w-full sm:w-auto active:scale-95" : "px-6 py-2.5 text-sm"}
          `}>
            Get Started
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "h-10 w-10 border border-border shadow-sm"
            }
          }}
        />
      </SignedIn>
    </div>
  );
};