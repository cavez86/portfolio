import { router } from './init';
import { pdfRouter } from './routers/pdf';

export const appRouter = router({
  pdf: pdfRouter,
});

export type AppRouter = typeof appRouter;
