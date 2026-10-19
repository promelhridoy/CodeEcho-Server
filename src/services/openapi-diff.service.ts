
type OpenApiDocument = {
  paths?: Record<
    string,
    Record<string, unknown>
  >;
};

export interface ApiChange {
  type: "breaking" | "non-breaking";
  path: string;
  method: string;
  message: string;
}

const HTTP_METHODS = [
  "get",
  "post",
  "put",
  "patch",
  "delete",
  "options",
  "head",
  "trace",
];

export function compareOpenApiSpecs(
  oldSpec: OpenApiDocument,
  newSpec: OpenApiDocument
): ApiChange[] {
  const changes: ApiChange[] = [];

  const oldPaths = oldSpec.paths ?? {};
  const newPaths = newSpec.paths ?? {};

  for (const [path, oldPathItem] of Object.entries(oldPaths)) {
    const newPathItem = newPaths[path];

    if (!newPathItem) {
      changes.push({
        type: "breaking",
        path,
        method: "*",
        message: "API path was removed",
      });
      continue;
    }

    for (const method of HTTP_METHODS) {
      if (
        oldPathItem[method] !== undefined &&
        newPathItem[method] === undefined
      ) {
        changes.push({
          type: "breaking",
          path,
          method: method.toUpperCase(),
          message: "HTTP method was removed",
        });
      }
    }
  }

  for (const [path, newPathItem] of Object.entries(newPaths)) {
    if (!oldPaths[path]) {
      changes.push({
        type: "non-breaking",
        path,
        method: "*",
        message: "New API path was added",
      });
      continue;
    }

    for (const method of HTTP_METHODS) {
      if (
        oldPaths[path][method] === undefined &&
        newPathItem[method] !== undefined
      ) {
        changes.push({
          type: "non-breaking",
          path,
          method: method.toUpperCase(),
          message: "New HTTP method was added",
        });
      }
    }
  }

  return changes;
}
