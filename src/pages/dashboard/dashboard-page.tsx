import { Button } from "@/components/ui/button";
import { FilePlus2, Layers } from "lucide-react";

const DashboardPage = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center space-y-3">
      <Layers className="h-36 w-36" />
      <p className="text-2xl font-semibold">You haven't created a page yet.</p>
      <p>Create a new page and start adding your links</p>
      <Button type="button" onClick={() => console.log(true)}>
        <FilePlus2 className="h-4 w-4" />
        Create Page
      </Button>
    </div>
  );
};

export default DashboardPage;
