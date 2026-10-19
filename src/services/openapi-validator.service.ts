
import SwaggerParser from "@apidevtools/swagger-parser";

export interface OpenApiValidationResult {
  valid: boolean;
  title?: string;
  version?: string;
  error?: string;
}

export async function validateOpenApi(
  spec: unknown
): Promise<OpenApiValidationResult> {
  try {
    if (
      typeof spec !== "object" ||
      spec === null ||
      Array.isArray(spec)
    ) {
      return {
        valid: false,
        error: "Specification must be a JSON object",
      };
    }

    const document = structuredClone(spec);

    const api = await SwaggerParser.validate(
     document as any
    );
    
    return {
      valid: true,
      title: api.info?.title,
      version: api.info?.version,
    };
  } catch (error) {
    return {
      valid: false,
      error:
        error instanceof Error
          ? error.message
          : "Invalid OpenAPI specification",
    };
  }
}
