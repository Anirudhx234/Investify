/* tests for the CreateAccount scene */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CreateAccount from "../../src/scenes/CreateAccount";

describe("CreateAccount scene", () => {
  const renderComponent = () => render(<CreateAccount />);

  it("renders the form with all input fields and submit button", () => {
    renderComponent();

    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("allows users to input email, username, and password", async () => {
    renderComponent();

    const emailInput = screen.getByLabelText(/email/i);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(usernameInput, "testuser");
    await userEvent.type(passwordInput, "kfnewnfenfwi");

    expect(emailInput).toHaveValue("test@example.com");
    expect(usernameInput).toHaveValue("testuser");
    expect(passwordInput).toHaveValue("kfnewnfenfwi");
  });

  it("validates email input correctly", async () => {
    renderComponent();

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole("button", {
      name: /submit/i,
    });

    await userEvent.type(emailInput, "invalid-email");
    await userEvent.click(submitButton);

    expect(
      await screen.findByText(/invalid email address/i),
    ).toBeInTheDocument();
  });

  it("validates password strength", async () => {
    renderComponent();

    const emailInput = screen.getByLabelText(/email/i);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", {
      name: /submit/i,
    });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(usernameInput, "testuser");
    await userEvent.type(passwordInput, "abcd");
    await userEvent.click(submitButton);

    expect(
      await screen.findByText(/your password is weak/i),
    ).toBeInTheDocument();
  });
});
