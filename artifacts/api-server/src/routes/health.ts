import { Router, type IRouter } from "express";

interface HealthCheckResponse {
  status: "ok" | "error";
}

const router: IRouter = Router();

router.get("/healthz", (_req, res) => {
  const data: HealthCheckResponse = { status: "ok" };
  res.json(data);
});

export default router;
