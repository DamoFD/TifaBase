import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Button from "@/components/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LuFolderClosed, LuTableProperties, LuUsersRound } from "react-icons/lu";

const CollectionForm: React.FC = () => {

    /**
     * The schema for form validation using `zod`.
     *
     * @constant
     *
     * @since 0.0.1
    */
    const formSchema = z.object({
        name: z.string().min(1, "Name is required").max(32, "Name must be less than 32 characters"),
        type: z.enum(["base", "view", "auth"]),
    });

    /**
     * `react-hook-form` instance for managing form state.
     *
     * @constant
     *
     * @since 0.0.1
    */
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: "base",
        },
    });

    /**
     * Function called on form submission.
     *
     * @param values - The form values.
     *
     * @since 0.0.1
    */
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form className="space-y-4 mt-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="name">Name<span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Input id="name" placeholder='eg. "posts"' {...field} autoComplete="name" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="type">Type<span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="base">
                                            <div className="flex items-center space-x-1 text-gray-800">
                                                <LuFolderClosed />
                                                <p>Base Collection</p>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="view">
                                            <div className="flex items-center space-x-1 text-gray-800">
                                                <LuTableProperties />
                                                <p>View Collection</p>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="auth">
                                            <div className="flex items-center space-x-1 text-gray-800">
                                                <LuUsersRound />
                                                <p>Auth Collection</p>
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}

export default CollectionForm;
