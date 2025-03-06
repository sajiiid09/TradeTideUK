## Description

- This directory is to store all your models and database calls.
- Only keep prisma based server actions in this repository.
- All the components here must use ```use server``` at the top to ensure they are running on the server side

## Special lookouts

- Look out for ```getAll`` methods, please use pagination in such functions to reduce the amount of data fetching.
- Database may have tons of data in a table, please keep the data fetching as low as possible using the ```select``` method
- Please ignore and avoid importing user password, if user record is required please use ```user.id```.