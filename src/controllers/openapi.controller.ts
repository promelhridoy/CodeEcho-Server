
import type { Request, Response } from "express";
import { validateOpenApi } from "../services/openapi-validator.service";

export async function validateOpenApiController(
  req: Request,
  res: Response
): Promise<void> {
  const result = await validateOpenApi(req.body);

  if (!result.valid) {
    res.status(400).json({
      success: false,
      message: "Invalid OpenAPI specification",
      error: result.error,
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: "OpenAPI specification is valid",
    data: {
      title: result.title,
      version: result.version,
    },
  });
}
