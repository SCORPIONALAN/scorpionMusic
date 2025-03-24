import {Button} from '@/components/ui/button';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
const App = () => {
  return (
    <>
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
    
    <h1 className='mt-10 bg-zinc-400/100 h-[30px] w-[60px] mx-auto text-center'>Hello</h1>
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button>Click me</Button>
    </div>
    
    </>
  )
}

export default App
