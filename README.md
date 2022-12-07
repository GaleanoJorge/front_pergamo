# Pergamo
Herramienta gestión de health and life ips.

---

## Descargar e Instalar CURL
-   sudo apt install curl
-   sudo curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
## Validar version CURL
-   nvm --version
## Versiones disponibles NodeJS
-   nvm ls-remote
## Instalar version especifica NodeJS (Automaticamente agrega el NPM)
-   nvm install 10.16.3
## Validar version NodeJS y NPM
-   node -v 
-   npm -v
## Cambiar version de NodeJS y NPM (Opcional)
-   nvm use 10.16.3

## Ejcutar bash nvm (Opcional)
-   source ~/.nvm/nvm.sh

## Dar permisos a la carpeta
-   sudo chown -R www-data:www-data front-ensename
-   sudo chmod -R 777 front-ensename


## Instalar dependencias (Raiz de front-ensename)
-   npm install

## Instalar AngularCLI
-   npm install -g @angular/cli@9.1.4

## Ejecutar APP (Solo si no se tiene ejecutando en un host virtual)
-   ng serve --host=0.0.0.0 --port=8002
-   node --max_old_space_size=8048 ./node_modules/@angular/cli/bin/ng serve

## Publicar APP (Destino por defecto "dist/")
-   ng build --prod

## Documentación
https://phoenixnap.com/kb/install-latest-node-js-and-nmp-on-ubuntu#:~:text=Install%20a%20Specific%20Version,-Nvm%20is%20a&text=To%20install%20a%20particular%20version,the%20number%20of%20the%20version.&text=This%20will%20list%20all%20installed,the%20default%20and%20stable%20versions.

---

## Libreria mobiscroll calendar

-- user - password 
   gi.desarrollador3@hlips.com.co - coordesa*2021
# instalar CLI
--  npm install -g @mobiscroll/cli --save 
# configurar entorno de ejecución 
-- mobiscroll config angular - You will be prompted to log in with your mobiscroll account
# library link
-- https://demo.mobiscroll.com/calendar/week-select

## License

Copyright Health and life ips 2021