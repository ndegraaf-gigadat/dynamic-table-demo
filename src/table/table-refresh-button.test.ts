import { render, fireEvent } from "@testing-library/svelte";

import TableRefreshButton from "./table-refresh-button.svelte";

describe("TableRefreshButton", () => {
  test('renders a button with "Refresh" text', () => {
    const mockRefreshHandler = vi.fn();

    const { getByText } = render(TableRefreshButton, {
      props: { refreshHandler: mockRefreshHandler },
    });

    expect(getByText("Refresh")).toBeTruthy();
  });

  test("calls refreshHandler when clicked", async () => {
    const mockRefreshHandler = vi.fn();

    const { getByText } = render(TableRefreshButton, {
      props: { refreshHandler: mockRefreshHandler },
    });

    const button = getByText("Refresh");
    await fireEvent.click(button);

    expect(mockRefreshHandler).toHaveBeenCalled();
  });

  test("applies correct CSS classes", () => {
    const mockRefreshHandler = vi.fn();

    const { getByText } = render(TableRefreshButton, {
      props: { refreshHandler: mockRefreshHandler },
    });

    const button = getByText("Refresh");
    expect(button.classList.contains("p-1")).toBe(true);
    expect(button.classList.contains("border")).toBe(true);
    expect(button.classList.contains("rounded")).toBe(true);
  });
});
