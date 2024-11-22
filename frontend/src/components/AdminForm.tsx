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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoEyeSharp } from "react-icons/io5";
import { useState } from "react";

const AdminForm: React.FC = () => {
    /**
     * State to toggle visibility of the password field.
     *
     * @since 0.0.1
    */
    const [showPassword, setShowPassword] = useState(false);

    /**
     * State to toggle visibility of the confirm password field.
     *
     * @since 0.0.1
    */
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        confirmPassword: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters").max(32, "Password must be less than 32 characters"),
    }).superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match",
                path: ["confirmPassword"],
            });
        }
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
            confirmPassword: "",
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
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email*</FormLabel>
                            <FormControl>
                                <Input placeholder="example@gmail.com" {...field} autoComplete="email" />
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
                            <FormLabel>Password*</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
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
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password*</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        {...field}
                                    />
                                    <IoEyeSharp
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="text-gray-900 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                                    />
                                </div>
                            </FormControl>
                            <FormDescription>
                                Confirm your administrator password.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

export default AdminForm;
