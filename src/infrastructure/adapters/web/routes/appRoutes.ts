import { Router } from 'express';

// Create a router for user-related endpoints
const appRouter = Router();

// TODO generate the app endpoints

// EXAMPLE: products endpoint
appRouter.get('/products', async (req, res) => {
  res.status(201).json([
    { productId: 1, name: 'testingProduct 1' },
    { productId: 2, name: 'testingProduct 2' },
  ]);
});

export default appRouter;
