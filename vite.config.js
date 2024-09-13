export default {
    root: './src', // Esto le dice a Vite que sirva los archivos desde la carpeta src
    base: './', // Esto es para el path base, ajusta si es necesario
    build: {
      outDir: '../dist', // Esto especifica dónde se construirá tu proyecto para producción
      // otras opciones de build...
    },
    server: {
      open: true, // Esto abrirá automáticamente el navegador al iniciar el servidor de desarrollo
      port: 8080, // Puedes cambiar el puerto si es necesario
      // otras opciones del servidor...
    },
    // otras configuraciones...
  };