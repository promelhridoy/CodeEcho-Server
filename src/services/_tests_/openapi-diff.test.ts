
import { describe, it, expect } from "vitest";
import { compareOpenApiSpecs } from "../openapi-diff.service";

describe("compareOpenApiSpecs", () => {
  it("detects a removed API path as breaking", () => {
    const oldSpec = {
      paths: {
        "/users": {
          get: {},
        },
      },
    };

    const newSpec = {
      paths: {},
    };

    const changes = compareOpenApiSpecs(oldSpec, newSpec);

    expect(changes).toContainEqual({
      type: "breaking",
      path: "/users",
      method: "*",
      message: "API path was removed",
    });
  });

  it("detects a newly added API path as non-breaking", () => {
    const oldSpec = {
      paths: {},
    };

    const newSpec = {
      paths: {
        "/products": {
          get: {},
        },
      },
    };

    const changes = compareOpenApiSpecs(oldSpec, newSpec);

    expect(changes).toContainEqual({
      type: "non-breaking",
      path: "/products",
      method: "*",
      message: "New API path was added",
    });
  });

  it("returns no changes for identical specs", () => {
    const spec = {
      paths: {
        "/users": {
          get: {},
        },
      },
    };

    expect(compareOpenApiSpecs(spec, spec)).toEqual([]);
  });
});
