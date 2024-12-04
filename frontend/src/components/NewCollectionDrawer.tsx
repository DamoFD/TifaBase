import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { FaPlus } from "react-icons/fa6";
import CollectionForm from "./CollectionForm";

const NewCollectionDrawer = () => {

    return (
        <div className="w-full">
            <Sheet>
                <SheetTrigger asChild>
                    <button className="bg-white hover:bg-gray-200 p-2 w-full flex items-center justify-center space-x-2 rounded-lg border-2 border-gray-800 text-gray-800 mt-4">
                        <FaPlus className="text-gray-800" />
                        <p className="text-sm font-bold">New collection</p>
                    </button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>New Collection</SheetTitle>
                    </SheetHeader>
                    <CollectionForm />
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default NewCollectionDrawer;
