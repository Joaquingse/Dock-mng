## Backend project

# CONTEXTO

Gestionar el servicio de atraques de un muelle deportivo, creando una API que se encargue de ello, ofreciendo las siguientes funcionalidades:

- Gestión de atraques:
    - Consultar atraques disponibles,
    - Reservar atraques,
    - Obtener información de atraques en uso 
    - Actualización del número de atraques en caso de necesidad (ampliación por parte del muelle, etc...)

- Gestión del Staff de la empresa:
    - Creación de empleados,
    - Consultar lista de empleados,
    - Consultas específicas del Staff (por departamento, estado laboral...)
  
- Gestión de datos económicos:
    - Consultar ingresos mensuales (o buscar en histórico),
    - Consultar reservas pendientes de pago.
    
- Clientes:
    - Gestionar registro de clientes registrados en la web del muelle.
    - Gestionar registro de barcos registrados en la web del muelle.
    

# DEVELOPERS

- [Hamilton Vanegas](https://github.com/havacy7319)
- [Iratze Eizaguirre](https://github.com/IraEiza)
- [Joaquín Gázquez](https://github.com/Joaquingse)


# DB SCHEMAS

## USER

| KEY        | TYPE         | REFERENCE | REQUIRED | VALIDATION       |
|------------|--------------|-----------|----------|------------------|
| name       | string       |           | YES      | minLength, maxLength                 |
|dni|string|  |YES|unique, maxLength, minLenght|
| email      | Mongoose Schema Type email|           | YES      | Mongoose, Unique   |
| password   | string       |           | YES      |                  |
| role       | string         |           | default=owner |enum: admin, owner, worker |
|ships  |   [ ObjectId ]   |    ship    |     |    |
|department|string|                     |{role: worker}|enum: finances, RRHH, maintenance|
|active|boolean|                        |{role: worker}|        |
...

## SHIP

| KEY         | TYPE          | REFERENCE | REQUIRED | VALIDATION        |
|-------------|---------------|-----------|----------|-------------------|
| name       | string        |           | YES      |                   |
| owner | [ ObjectId ]        |   user        | YES      |                   |
| reg     | string      |       | YES      | unique |
...

## DOCK

| KEY    | TYPE         | REFERENCE | REQUIRED | VALIDATION     |
|--------|--------------|-----------|----------|----------------|
|dock|number|   |yes|unique|
|occuppied|boolean|     |default = false|        |
|ship|ObjectId|ship|{occuppied: true}|unique|
|checkin| date |        |{occuppied: true}|     |
|checkout| date |        |{occuppied: true}|     |
...

## PAYMENT

| KEY    | TYPE   | REFERENCE | REQUIRED | VALIDATION     |
|--------|--------|-----------|----------|----------------|
|paid|boolean|      |default: false|        |
|dock| ObjectId| dock |YES|    |
|owner|ObjectId| dock |YES|    |
|resDate| date |        |YES|       |
|payDate| date |        |YES|       |
...

# API ROUTES

## AUTHENTICATION ENDPOINTS

| METHOD | URL             | AUTH | FUNCTION                 |
|--------|-----------------|------|--------------------------|
| POST   | '/auth/signup'   | NO   | register a user      |
| POST   | '/auth/login'   | NO   | Authenticate a user      |

## USERS ENDPOINTS

| METHOD | URL                  | AUTH    | FUNCTION                    |
|--------|----------------------|---------|-----------------------------|
| GET    | '/users/'    | admin | List all users           |
| GET    | '/users/workers'    | admin, RRHH | List all workers      |
| GET    | '/users/:id'    | admin | Get a user     |
| POST   | '/users/'     | admin | Create a user account    |
| PUT    | '/users/:id' | admin | Update a user account    |
| DELETE | '/users/:id' | admin | Delete a user account    |
...

## SHIPS ENDPOINTS

| METHOD | URL               | AUTH | FUNCTION                          |
|--------|-------------------|------|-----------------------------------|
| GET    | '/ships/'    | admin | List all ships           |
| POST   | '/ships/'     | admin | Create a ship doc    |
| PUT    | '/ships/:id' | admin | Update a ship doc    |
| DELETE | '/ships/:id' | admin | Delete a ship doc    |
...

## PROFILE ENDPOINTS

| METHOD | URL                   | AUTH | FUNCTION                                 |
|--------|-----------------------|------|------------------------------------------|
| GET    | '/profile/'    | YES | Get own info   |
| GET    | '/profile/ships'    | YES | List all owner's ships      |
| GET    | '/profile/bills'    | YES | List all owner's reserves     |
| POST   | '/profile/ships'     | YES | Create a owner ship    |
| PUT    | '/profile/pay' | YES | Update owner's payments    |
| PUT    | '/profile/updateProfile' | YES | Update own profile    |
| PUT    | '/profile/updateShip/:id' | YES | Update own ship data    |
...

## DOCKS ENDPOINTS

| METHOD | URL            | AUTH    | FUNCTION                   |
|--------|----------------|---------|----------------------------|
| GET    | '/docks/'     | admin, maintenance     | List all docks           |
| GET    | '/docks/avalaible' | NO     | Get non occuppied docks    |
| POST   | '/docks/'     | admin | Create new dock          |
| PUT   | '/docks/reserve'     | YES | reserve a dock     |
| PUT   | '/docks/:id'     | admin | Update a dock info     |
...

## PAY ENDPOINTS

| METHOD | URL                          | AUTH    | FUNCTION                              |
|--------|------------------------------|---------|---------------------------------------|
| GET    | 'payments/'     | admin, Finances     | Lists all payments (paid or not)       |
| GET    | 'payments/incoming' |  admin, Finances   | Get actual month incoming (the total amount)  |
| GET   | 'payments/incoming/:date'     | admin, Finances | Get historic month incoming (the total amount) |
