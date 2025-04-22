import { render, screen } from "@testing-library/react";
import { UserForm } from "../components/UserForm";
import userEvent from "@testing-library/user-event";



test("Text should be visible after input and pressing on submit button", async () => {
    render(<UserForm />);
    const input = screen.getByPlaceholderText("Input your name");
    const button = screen.getByText("Submit");

    await userEvent.type(input, "John");
    await userEvent.click(button)
    const text = screen.getByText("John");
    expect(text).toBeInTheDocument();
});