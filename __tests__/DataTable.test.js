import { render, screen } from "@testing-library/react";
import DataTable from "../components/DataTable";

test("renders DataTable component", () => {
  render(<DataTable data={[{ createdAt: new Date(), data: "Sample Data" }]} />);
  expect(screen.getByText(/Sample Data/i)).toBeInTheDocument();
});
