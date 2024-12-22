## 🔑 Authentification

### Login

### Créer une réservation

#### Champs Requis (*)
- `packageId` * : ID du package (string)
- `passengerDetails` * : Array d'objets passagers
  - `firstName` * : Prénom du passager (string)
  - `lastName` * : Nom du passager (string)
- `contactEmail` * : Email de contact (string)
- `contactPhone` * : Téléphone de contact (format: +33XXXXXXXXX)
- `totalPrice` * : Prix total de la réservation (number)

#### Champs Optionnels
- `passengerDetails[].passportNumber` : Numéro de passeport
- `passengerDetails[].dateOfBirth` : Date de naissance (YYYY-MM-DD)
- `specialRequests` : Demandes spéciales
- `notes` : Notes additionnelles
- `passengerDetails[].medicalNeeds` : Besoins médicaux
- `passengerDetails[].dietaryRestrictions` : Restrictions alimentaires