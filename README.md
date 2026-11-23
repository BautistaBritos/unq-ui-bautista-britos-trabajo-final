# Palabras Encadenadas

Juego de palabras encadenadas hecho con React para el Trabajo Final Integrador de Interfaces de Usuario (UNQ, 2° cuatrimestre 2026).

El objetivo es formar la cadena más larga posible de palabras válidas antes de que se agote el tiempo: cada palabra tiene que empezar con la última letra de la anterior.

## Requisitos

- [Node.js](https://nodejs.org/) 20.19 o superior (incluye npm).
- [Git](https://git-scm.com/).
- Conexión a internet: las palabras se validan con una API externa (`https://word-api-hmlg.vercel.app`).

## Cómo descargar e instalar el proyecto

```bash
git clone https://github.com/BautistaBritos/unq-ui-bautista-britos-trabajo-final.git
cd unq-ui-bautista-britos-trabajo-final
npm install
```

## Cómo ejecutarlo localmente

```bash
npm run dev
```

Después abrí en el navegador la URL que aparece en la terminal (por defecto `http://localhost:5173`).

## Tecnologías

- React 19 con TypeScript.
- Vite.
- CSS Modules.
- axios para las consultas a la API.
- [lucide-react](https://lucide.dev/) para los íconos y [Fontsource](https://fontsource.org/) para las tipografías (Outfit y Bebas Neue).
