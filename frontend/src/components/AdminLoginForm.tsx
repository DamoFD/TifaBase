/**
 * This is the Admin creation form.
 *
 * The form includes fields for email, password, and confirm password. It uses `zod` for schema validation
 * and `react-hook-form` for form handling. Password visibility toggling is supported using React's state.
 *
 * @component
 * @example
 * // To use the AdminForm component in your app:
 * import AdminForm from "@/components/AdminForm";
 *
 * function App() {
 *   return <AdminForm />;
 * }
 *
 * @requires react
 * @requires zod
 * @requires @hookform/resolvers/zod
 * @requires react-hook-form
 * @requires @components/ui/form
 * @requires @components/ui/button
 * @requires @components/ui/input
 * @requires react-icons/io5
 * @requires useState
 *
 * @since 0.0.1
*/

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Button from "@/components/Button";
import { Input } from "@/components/ui/input";
import { IoEyeSharp } from "react-icons/io5";
import { useState } from "react";
import { useLogin } from "@/hooks/useUser";
import { useAuth } from "@/contexts/UserContext";

const AdminForm: React.FC = () => {
    /**
     * State to toggle visibility of the password field.
     *
     * @since 0.0.1
    */
    const [showPassword, setShowPassword] = useState(false);

    const mutation = useLogin();

    const { getUser } = useAuth();

    /**
     * The schema for form validation using `zod`.
     *
     * @constant
     *
     * @since 0.0.1
    */
    const formSchema = z.object({
        email: z.string().email("Invalid email"),
        password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters").max(32, "Password must be less than 32 characters"),
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
            email: "",
            password: "",
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
        mutation.mutate(values, {
            onSuccess: () => {
                getUser();
            },
            onError: (error) => {
                console.error('Loginfailed:', error);
            }
        });
    }

    return (
        <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                {mutation.error && (
                    <p className="text-red-500">{mutation.error.response?.data?.message || "An error occurred, please try again later."}</p>
                )}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="email">Email*</FormLabel>
                            <FormControl>
                                <Input id="email" placeholder="example@gmail.com" {...field} autoComplete="email" />
                            </FormControl>
                            <FormDescription>
                                This will be your administrator email.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="password">Password*</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        {...field}
                                    />
                                    <IoEyeSharp
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-900 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                                    />
                                </div>
                            </FormControl>
                            <FormDescription>
                                This will be your administrator password.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" text="Submit" isLoading={mutation.isLoading}>Submit</Button>
            </form>
        </Form>
    );
}

export default AdminForm;
