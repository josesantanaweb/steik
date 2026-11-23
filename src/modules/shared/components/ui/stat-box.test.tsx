import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatBox } from "./stat-box";

describe("StatBox", () => {
  it("renders the label and the value", () => {
    render(<StatBox label="Total ganadas" value="10" />);

    expect(screen.getByText("Total ganadas")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("renders the label in uppercase", () => {
    render(<StatBox label="Total ganadas" value="10" />);

    expect(screen.getByText("Total ganadas")).toHaveClass("uppercase");
  });

  it("highlights the value when highlight is true", () => {
    render(<StatBox label="Ganancias" value="+1,240.00" highlight />);

    expect(screen.getByText("+1,240.00")).toHaveClass("text-primary");
  });

  it("renders the value in white by default", () => {
    render(<StatBox label="Total perdidas" value="8" />);

    expect(screen.getByText("8")).toHaveClass("text-white");
  });

  it("merges a custom className into the box", () => {
    render(<StatBox label="Total ganadas" value="10" className="col-span-2" />);

    expect(screen.getByText("Total ganadas").parentElement).toHaveClass(
      "col-span-2",
    );
  });
});
