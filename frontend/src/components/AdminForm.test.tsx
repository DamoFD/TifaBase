import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminForm from "@/components/AdminForm";

describe("AdminForm", () => {
    const setup = () => {
        render(<AdminForm />);
        return {
            emailInput: screen.getByPlaceholderText(/example@gmail.com/i),
            passwordInput: screen.getByLabelText("Password*"),
            confirmPasswordInput: screen.getByLabelText(/Confirm Password*/i),
            submitButton: screen.getByRole("button", { name: /submit/i }),
        };
    };

    const submitForm = async (fields: Partial<{ email: string; password: string; confirmPassword: string }>) => {
        const { emailInput, passwordInput, confirmPasswordInput, submitButton } = setup();

        if (fields.email !== undefined) await userEvent.type(emailInput, fields.email);
        if (fields.password !== undefined) await userEvent.type(passwordInput, fields.password);
        if (fields.confirmPassword !== undefined) await userEvent.type(confirmPasswordInput, fields.confirmPassword);

        await userEvent.click(submitButton);
    };

    it("throws error if email is not valid", async () => {
        await submitForm({ email: "test", password: "password", confirmPassword: "password" });

        const error = await screen.findByText(/Invalid email/i);
        expect(error).toBeInTheDocument();
    });

    it("throws error if email is empty", async () => {
        await submitForm({ password: "password", confirmPassword: "password" });

        const error = await screen.findByText(/Invalid email/i);
        expect(error).toBeInTheDocument();
    });

    it("throws error if password is empty", async () => {
        await submitForm({ email: "test@example.com", confirmPassword: "password" });

        const error = await screen.findByText(/Password is required/i);
        expect(error).toBeInTheDocument();
    });

    it("throws error if password is too short", async () => {
        await submitForm({ email: "test@example.com", password: "pass", confirmPassword: "password" });

        const error = await screen.findByText(/Password must be at least 8 characters/i);
        expect(error).toBeInTheDocument();
    });

    it("throws error if passwords do not match", async () => {
        await submitForm({ email: "test@example.com", password: "password", confirmPassword: "passwrod" });

        const error = await screen.findByText(/Passwords do not match/i);
        expect(error).toBeInTheDocument();
    });
});

