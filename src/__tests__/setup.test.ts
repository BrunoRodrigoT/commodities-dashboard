/**
 * Basic test to verify Jest setup is working correctly
 */
describe("Jest Setup", () => {
  it("should be able to run basic tests", () => {
    expect(true).toBe(true);
  });

  it("should have access to jest-dom matchers", () => {
    const element = document.createElement("div");
    element.textContent = "Hello World";
    document.body.appendChild(element);

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("Hello World");

    document.body.removeChild(element);
  });

  it("should support async/await", async () => {
    const promise = Promise.resolve("test");
    const result = await promise;
    expect(result).toBe("test");
  });
});
