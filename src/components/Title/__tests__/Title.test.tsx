import { render, screen } from "@testing-library/react";
import Title from "../index";

describe("Title", () => {
  it("should render the title correctly", () => {
    render(<Title />);

    const titleElement = screen.getByRole("heading", { level: 1 });
    expect(titleElement).toBeInTheDocument();
  });

  it("should display 'AgroData' text with correct styling", () => {
    render(<Title />);

    const titleElement = screen.getByRole("heading", { level: 1 });
    expect(titleElement).toHaveTextContent("AgroData");
  });

  it("should have the 'Agro' part with font-extrabold class", () => {
    render(<Title />);

    const agroSpan = screen.getByText("Agro");
    expect(agroSpan).toBeInTheDocument();
    expect(agroSpan).toHaveClass("font-extrabold");
  });

  it("should have proper gradient and animation classes", () => {
    render(<Title />);

    const titleElement = screen.getByRole("heading", { level: 1 });
    expect(titleElement).toHaveClass(
      "text-7xl",
      "text-center",
      "font-thin",
      "bg-gradient-to-r",
      "text-transparent",
      "bg-clip-text",
      "animate-fade-in"
    );
  });

  it("should have responsive gradient colors", () => {
    render(<Title />);

    const titleElement = screen.getByRole("heading", { level: 1 });
    expect(titleElement).toHaveClass(
      "from-primary-500",
      "to-green-600",
      "dark:from-primary-200",
      "dark:to-green-300"
    );
  });
});
