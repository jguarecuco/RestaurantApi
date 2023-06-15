 ## Description

Se creo un servicio que pretende ingresar sus gusto de comida y como resultado se mostrara la información del Restaurant

## Entities

RestaurantCollection

## Access Patterns

- [x] Crea Restaurant
- [x] Lista restaurant
- [x] Busca restaurant por Gusto

## CI/CD
  - Se implemento Gihub Action que permite desplegar el contenedor a un repositorio especifico
  
## Insert Datos a la collection
  Para hacer un restore collection se debe ejecutar este comando desde la consola (Favor asegurarse de tener el archivo dentro del directorio desde donde se ejecute el comando).
  aws dynamodb batch-write-item --request-items "$(cat DUMP.json)"

## Running the app

```bash
  docker build . -t imagename (Image name se debe implementar la del hub o repositorio de image)
  docker run -d -p 3000:3000 -e AWS_REGION=ANY AWS_ACCESS_KEY_ID=dummy AWS_SECRET_ACCESS_KEY=dummy  imagename

```
