import { ErrorsDictionary } from "@pet-shop/entities/errorsDictionary";
import { Response } from "express";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export function errorMiddleware(error: unknown, res: Response) {
  try {
    const err = ErrorsDictionary[(error as Error).message];
    res.status(err.status).json({ message: err.message });
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}
