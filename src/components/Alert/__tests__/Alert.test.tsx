import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Alert } from "../index";

describe("Alert", () => {
  const defaultProps = {
    title: "Test Title",
    children: <button>Trigger Alert</button>,
  };

  it("should render the trigger element", () => {
    render(<Alert {...defaultProps} />);

    const triggerButton = screen.getByRole("button", { name: "Trigger Alert" });
    expect(triggerButton).toBeInTheDocument();
  });

  it("should show alert dialog when trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<Alert {...defaultProps} />);

    const triggerButton = screen.getByRole("button", { name: "Trigger Alert" });
    await user.click(triggerButton);

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("should display custom description when provided", async () => {
    const user = userEvent.setup();
    const props = {
      ...defaultProps,
      description: "This is a test description",
    };

    render(<Alert {...props} />);

    const triggerButton = screen.getByRole("button", { name: "Trigger Alert" });
    await user.click(triggerButton);

    expect(screen.getByText("This is a test description")).toBeInTheDocument();
  });

  it("should not display description when not provided", async () => {
    const user = userEvent.setup();
    render(<Alert {...defaultProps} />);

    const triggerButton = screen.getByRole("button", { name: "Trigger Alert" });
    await user.click(triggerButton);

    // Should not have any description element
    const description = screen.queryByText(/description/i);
    expect(description).not.toBeInTheDocument();
  });

  it("should show default button labels", async () => {
    const user = userEvent.setup();
    render(<Alert {...defaultProps} />);

    const triggerButton = screen.getByRole("button", { name: "Trigger Alert" });
    await user.click(triggerButton);

    expect(
      screen.getByRole("button", { name: "Cancelar" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Confirmar" })
    ).toBeInTheDocument();
  });

  it("should show custom button labels", async () => {
    const user = userEvent.setup();
    const props = {
      ...defaultProps,
      cancelLabel: "Custom Cancel",
      confirmLabel: "Custom Confirm",
    };

    render(<Alert {...props} />);

    const triggerButton = screen.getByRole("button", { name: "Trigger Alert" });
    await user.click(triggerButton);

    expect(
      screen.getByRole("button", { name: "Custom Cancel" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Custom Confirm" })
    ).toBeInTheDocument();
  });

  it("should call onConfirm when confirm button is clicked", async () => {
    const user = userEvent.setup();
    const onConfirm = jest.fn();
    const props = {
      ...defaultProps,
      onConfirm,
    };

    render(<Alert {...props} />);

    const triggerButton = screen.getByRole("button", { name: "Trigger Alert" });
    await user.click(triggerButton);

    const confirmButton = screen.getByRole("button", { name: "Confirmar" });
    await user.click(confirmButton);

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("should call onCancel when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const onCancel = jest.fn();
    const props = {
      ...defaultProps,
      onCancel,
    };

    render(<Alert {...props} />);

    const triggerButton = screen.getByRole("button", { name: "Trigger Alert" });
    await user.click(triggerButton);

    const cancelButton = screen.getByRole("button", { name: "Cancelar" });
    await user.click(cancelButton);

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("should handle keyboard navigation", async () => {
    const user = userEvent.setup();
    render(<Alert {...defaultProps} />);

    const triggerButton = screen.getByRole("button", { name: "Trigger Alert" });
    await user.click(triggerButton);

    // Check initial focus is on cancel button (Radix UI default)
    expect(screen.getByRole("button", { name: "Cancelar" })).toHaveFocus();

    // Should be able to tab to confirm button
    await user.tab();
    expect(screen.getByRole("button", { name: "Confirmar" })).toHaveFocus();
  });

  it("should close dialog when escape key is pressed", async () => {
    const user = userEvent.setup();
    render(<Alert {...defaultProps} />);

    const triggerButton = screen.getByRole("button", { name: "Trigger Alert" });
    await user.click(triggerButton);

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");

    // Dialog should be closed (not in DOM anymore)
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });
});
