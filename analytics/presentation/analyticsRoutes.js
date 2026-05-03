const express = require('express');

const analyticsRoutes = (analyticsController) => {
  const router = express.Router();

  router.get('/', analyticsController.getAll.bind(analyticsController));
  router.get('/:id', analyticsController.getOne.bind(analyticsController));
  router.delete('/:id', analyticsController.delete.bind(analyticsController));

  return router;
};

module.exports = analyticsRoutes;