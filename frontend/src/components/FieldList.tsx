import { FieldOption } from "@/components/CollectionTabs";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { Switch } from "@/components/ui/switch";

interface FieldListProps {
    fields: FieldOption[];
}

const FieldList: React.FC<FieldListProps> = ({ fields }) => {

    return (
        <div>
            {fields.map((field) =>
                field.id === 1 && <PlainText key={field.id} field={field} />
            )}
        </div>
    );
}

const PlainText = ({ field }: { field: FieldOption }) => {
    const [openSettings, setOpenSettings] = useState(false);

    return (
        <div>
            <div className="bg-gray-200 w-full rounded relative flex justify-between">
                <field.icon className="absolute text-gray-800 left-2 top-1/2 -translate-y-1/2" />
                <Input className="pl-8 mr-2" />
                <div className="border-l border-gray-300 flex items-center justify-center px-2">
                    <IoMdSettings onClick={() => setOpenSettings(!openSettings)} className="text-gray-500 hover:bg-gray-300 rounded-full p-1 size-6 cursor-pointer" />
                </div>
            </div>
            {openSettings && (
                <div className="w-full rounded border border-gray-200 bg-white p-2 flex flex-col space-y-2">
                    <div>
                        <label>Min length</label>
                        <Input />
                    </div>
                    <div>
                        <label>Max length</label>
                        <Input />
                    </div>
                    <div>
                        <label>Regex pattern</label>
                        <Input />
                    </div>
                    <div>
                        <div>
                            <Switch />
                            <label>Nonempty</label>
                        </div>
                        <div>
                            <Switch />
                            <label>Presentable</label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FieldList;
