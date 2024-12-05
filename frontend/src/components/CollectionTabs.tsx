import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import {
    MdOutlineTextFields,
    MdEdit,
    MdNumbers,
    MdToggleOn,
    MdEmail,
    MdInsertLink,
    MdCalendarMonth,
    MdFormatListBulleted,
    MdImage,
    MdShare
} from "react-icons/md";
import { VscJson } from "react-icons/vsc";

const CollectionTabs: React.FC = () => {
    const fieldList = [
        {
            name: "Plain text",
            icon: MdOutlineTextFields
        },
        {
            name: "Rich editor",
            icon: MdEdit
        },
        {
            name: "Number",
            icon: MdNumbers
        },
        {
            name: "Bool",
            icon: MdToggleOn
        },
        {
            name: "Email",
            icon: MdEmail
        },
        {
            name: "Url",
            icon: MdInsertLink
        },
        {
            name: "DateTime",
            icon: MdCalendarMonth
        },
        {
            name: "Select",
            icon: MdFormatListBulleted
        },
        {
            name: "File",
            icon: MdImage
        },
        {
            name: "Relation",
            icon: MdShare
        },
        {
            name: "JSON",
            icon: VscJson
        },
    ];

    const [newFieldOpen, setNewFieldOpen] = useState(false);
    return (
        <Tabs defaultValue="fields" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="fields">Fields</TabsTrigger>
                <TabsTrigger value="rules">API Rules</TabsTrigger>
            </TabsList>
            <TabsContent value="fields">
                <p className="text-sm mt-4">System fields: <span className="bg-gray-200 px-1 rounded">id</span>, <span className="bg-gray-200 px-1 rounded">created</span>, <span className="bg-gray-200 px-1 rounded">updated</span>.</p>
                <Popover open={newFieldOpen} onOpenChange={setNewFieldOpen}>
                    <PopoverTrigger asChild>
                        <div className="bg-white border-2 border-gray-800 rounded w-full py-1 flex space-x-2 items-center justify-center hover:bg-gray-200 cursor-pointer my-4">
                            <FaPlus className="text-gray-800 text-sm" />
                            <p className="font-semibold">New field</p>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-full">
                        <div className="grid grid-cols-4 gap-4">
                            {fieldList.map((field, index) => (
                                <div onClick={() => setNewFieldOpen(false)} key={index} className="flex items-center justify-center space-x-1 cursor-pointer px-2 py-1 hover:bg-gray-200 rounded">
                                    <field.icon />
                                    <p className="text-sm">{field.name}</p>
                                </div>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
                <hr className="w-full" />
                <p className="text-sm mt-4 text-gray-600">Unique constraints and indexes (0)</p>
                <div className="border-2 border-gray-800 rounded-full px-2 py-1 inline-flex space-x-2 items-center justify-center hover:bg-gray-200 cursor-pointer mt-4">
                    <FaPlus className="text-gray-800 size-3" />
                    <p className="text-sm">New index</p>
                </div>
            </TabsContent>
            <TabsContent value="rules">
            </TabsContent>
        </Tabs>
    );
}

export default CollectionTabs;
