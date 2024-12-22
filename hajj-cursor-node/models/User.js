/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - phoneNumber
 *       properties:
 *         firstName:
 *           type: string
 *           description: Prénom de l'utilisateur
 *         lastName:
 *           type: string
 *           description: Nom de l'utilisateur
 *         email:
 *           type: string
 *           format: email
 *           description: Email de l'utilisateur
 *         password:
 *           type: string
 *           description: Mot de passe hashé
 *         phoneNumber:
 *           type: string
 *           description: Numéro de téléphone
 *         role:
 *           type: string
 *           enum: [client, admin]
 *           default: client
 *           description: Rôle de l'utilisateur
 */ 