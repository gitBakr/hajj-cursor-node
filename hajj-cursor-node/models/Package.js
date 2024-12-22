/**
 * @swagger
 * components:
 *   schemas:
 *     Package:
 *       type: object
 *       required:
 *         - type
 *         - title
 *         - description
 *         - duration
 *         - startDate
 *         - endDate
 *         - price
 *         - capacity
 *       properties:
 *         type:
 *           type: string
 *           enum: [hajj, omra]
 *           description: Type de voyage
 *         title:
 *           type: string
 *           description: Titre du package
 *         description:
 *           type: string
 *           description: Description détaillée
 *         duration:
 *           type: number
 *           description: Durée en jours
 *         startDate:
 *           type: string
 *           format: date
 *           description: Date de début
 *         endDate:
 *           type: string
 *           format: date
 *           description: Date de fin
 *         price:
 *           type: number
 *           description: Prix par personne
 *         capacity:
 *           type: number
 *           description: Nombre total de places
 *         remainingSpots:
 *           type: number
 *           description: Places restantes
 *         includes:
 *           type: array
 *           items:
 *             type: string
 *           description: Services inclus
 *         itinerary:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               day:
 *                 type: number
 *               description:
 *                 type: string
 *           description: Programme jour par jour
 *         status:
 *           type: string
 *           enum: [active, inactive, completed]
 *           default: active
 *           description: Statut du package
 */ 