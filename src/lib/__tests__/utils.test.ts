import { cn } from "../utils";

describe("utils", () => {
  describe("cn", () => {
    it("should merge class names correctly", () => {
      const result = cn("px-4", "py-2");
      expect(result).toBe("px-4 py-2");
    });

    it("should handle conditional classes", () => {
      const isActive = true;
      const result = cn("base-class", isActive && "active-class");
      expect(result).toBe("base-class active-class");
    });

    it("should handle falsy conditional classes", () => {
      const isActive = false;
      const result = cn("base-class", isActive && "active-class");
      expect(result).toBe("base-class");
    });

    it("should merge conflicting tailwind classes correctly", () => {
      // twMerge should resolve conflicts (e.g., last padding wins)
      const result = cn("px-2 px-4");
      expect(result).toBe("px-4");
    });

    it("should handle arrays of classes", () => {
      const result = cn(["px-4", "py-2"], "text-sm");
      expect(result).toBe("px-4 py-2 text-sm");
    });

    it("should handle objects with conditional classes", () => {
      const result = cn({
        "px-4": true,
        "py-2": true,
        "text-red-500": false,
        "text-blue-500": true,
      });
      expect(result).toBe("px-4 py-2 text-blue-500");
    });

    it("should handle empty input", () => {
      const result = cn();
      expect(result).toBe("");
    });

    it("should handle null and undefined values", () => {
      const result = cn("px-4", null, undefined, "py-2");
      expect(result).toBe("px-4 py-2");
    });

    it("should handle complex mixed inputs", () => {
      const result = cn(
        "base",
        ["flex", "items-center"],
        {
          "text-red": true,
          "text-blue": false,
        },
        "justify-between"
      );
      expect(result).toBe("base flex items-center text-red justify-between");
    });
  });
});
