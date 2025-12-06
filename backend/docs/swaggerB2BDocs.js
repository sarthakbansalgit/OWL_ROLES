/**
 * @swagger
 * tags:
 *   name: B2B Analytics
 *   description: Business-to-Business Analytics API endpoints
 */

/**
 * @swagger
 * /api/v1/b2b/analytics/job-market:
 *   get:
 *     summary: Get job market analytics data
 *     tags: [B2B Analytics]
 *     security:
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Job market analytics successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobMarketAnalytics'
 *       401:
 *         description: Invalid or missing API key
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/b2b/analytics/applications:
 *   get:
 *     summary: Get application analytics data
 *     tags: [B2B Analytics]
 *     security:
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Application analytics successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApplicationAnalytics'
 *       401:
 *         description: Invalid or missing API key
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/b2b/analytics/industry-trends:
 *   get:
 *     summary: Get industry trends analytics
 *     tags: [B2B Analytics]
 *     security:
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Industry trends successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IndustryTrends'
 *       401:
 *         description: Invalid or missing API key
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/b2b/analytics/time-trends:
 *   get:
 *     summary: Get time-based trend analytics
 *     tags: [B2B Analytics]
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [day, week, month]
 *         description: Time period grouping
 *     responses:
 *       200:
 *         description: Time trends successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       401:
 *         description: Invalid or missing API key
 *       500:
 *         description: Server error
 */
