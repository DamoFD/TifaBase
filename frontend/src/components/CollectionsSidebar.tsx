import { Input } from "@/components/ui/input";
import { LuUsersRound, LuFolderClosed } from "react-icons/lu";
import NewCollectionDrawer from "./NewCollectionDrawer";

const CollectionsSidebar: React.FC = () => {

    return (
        <div className="p-4 border-r border-gray-200 flex flex-col items-center">

            {/* Search bar */}
            <div>
                <Input placeholder="Search collections..." />
                <hr className="border-gray-200 mt-4" />
            </div>
            {/* /Search bar */}

            {/* Collections */}
            <div className="flex flex-col items-start space-y-4 mt-4 w-full">
                <div className="flex items-center justify-start space-x-2 w-full p-2 bg-gray-200 rounded-lg cursor-pointer">
                    <LuUsersRound className="text-gray-800" />
                    <p>users</p>
                </div>
                <div className="flex items-center justify-start space-x-2 w-full p-2 bg-white rounded-lg cursor-pointer hover:bg-gray-200">
                    <LuFolderClosed className="text-gray-800" />
                    <p>posts</p>
                </div>
            </div>
            {/* /Collections */}

            {/* New Collection */}
                <NewCollectionDrawer />
            {/* /New Collection */}

        </div>
    );
}

export default CollectionsSidebar;
