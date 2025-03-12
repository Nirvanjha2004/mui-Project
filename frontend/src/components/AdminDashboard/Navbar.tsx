import { Button } from "../ui/button";

function Navbar() {
  return (
    <nav>
      <div className="flex justify-between items-center bg-black p-2">
        {/* yaha se shuru krenge elements */}
        <h3 className="scroll-m-20 text-white text-2xl font-semibold tracking-tight">
          Admin Dashboard
        </h3>
        <div className="flex gap-4 justify-center items-center">
            <Button className="bg-green-400 hover:bg-green-600">Create Test</Button>
            <div className="text-white">Profile</div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
