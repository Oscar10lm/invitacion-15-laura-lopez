# INVITACIÓN 15 LAURA LÓPEZ

Página web estática (HTML, CSS y JavaScript). No necesita servidor, base de datos ni compilación: se publica tal cual.

## Contenido de la carpeta

```
index.html            Página de la invitación
css/estilos.css       Estilos
js/invitacion.js      Datos del evento, contador, música, WhatsApp y adornos
assets/               Foto, stickers, ticket, canción e imagen para compartir
favicon.svg           Icono de la pestaña
favicon-32.png        Icono alternativo
apple-touch-icon.png  Icono al guardar en la pantalla de inicio del celular
vercel.json           Configuración para Vercel
netlify.toml          Configuración opcional para Netlify
```

Todas las rutas son relativas, así que la carpeta funciona en Vercel, Netlify, GitHub Pages o Cloudflare Pages sin cambios.

## Publicar en Vercel

La carpeta ya incluye `vercel.json`. No hay que compilar nada: en Vercel elige el preset **Other** y deja vacíos los comandos de compilación.

### Opción A: desde GitHub (sin instalar nada)

1. Crea una cuenta en https://github.com y un repositorio nuevo llamado `invitacion-15-laura-lopez` (puede ser privado).
2. En el repositorio pulsa **Add file → Upload files** y arrastra **el contenido** de esta carpeta (`index.html` debe quedar en la raíz). Pulsa **Commit changes**.
3. Entra a https://vercel.com, regístrate con **Continue with GitHub**.
4. Pulsa **Add New… → Project**, busca `invitacion-15-laura-lopez` y pulsa **Import**.
5. En *Framework Preset* elige **Other** y pulsa **Deploy**.
6. Al terminar tendrás `https://invitacion-15-laura-lopez.vercel.app` (o un nombre parecido si ese ya existe). Puedes cambiarlo en **Settings → Domains**.

### Opción B: con la terminal (requiere Node.js)

```
cd invitacion-15-laura-lopez
npx vercel          # inicia sesión y crea el proyecto; acepta las opciones por defecto
npx vercel --prod   # publica la versión definitiva y muestra el enlace HTTPS
```

Para actualizar después: vuelve a ejecutar `npx vercel --prod` (opción B) o sube los archivos cambiados a GitHub (opción A; Vercel publica solo).

## Publicar con Netlify Drop (alternativa, unos 5 minutos)

1. Entra a https://app.netlify.com/drop desde un computador.
2. Crea una cuenta gratuita (con correo o Google) si te la pide.
3. Arrastra **la carpeta completa** `invitacion-15-laura-lopez` al recuadro de la página.
4. Espera a que termine. Netlify te mostrará un enlace HTTPS con un nombre aleatorio, por ejemplo `https://nombre-aleatorio-123.netlify.app`.
5. Para un enlace más bonito: entra a **Site configuration → Site details → Change site name**, escribe `invitacion-15-laura-lopez` y guarda. Tu enlace será `https://invitacion-15-laura-lopez.netlify.app` (si el nombre ya está ocupado, prueba otro, como `invitacion15lauralopez`).
6. Abre el enlace en tu celular y comprueba que todo funcione antes de enviarlo por WhatsApp.

### Vista previa al compartir por WhatsApp (recomendado)

WhatsApp necesita la dirección completa de la imagen de vista previa:

1. Abre `index.html` con un editor de texto (Bloc de notas sirve).
2. Busca esta línea:
   `<meta property="og:image" content="assets/og-imagen.jpg">`
3. Cambia `assets/og-imagen.jpg` por tu enlace + `/assets/og-imagen.jpg`, por ejemplo:
   `<meta property="og:image" content="https://invitacion-15-laura-lopez.netlify.app/assets/og-imagen.jpg">`
4. Guarda y vuelve a publicar (en Vercel: sube el `index.html` cambiado a GitHub o ejecuta `npx vercel --prod`; en Netlify: **Deploys** → arrastra otra vez la carpeta). El enlace no cambia.

## Alternativa: GitHub Pages

1. Crea un repositorio público en GitHub, por ejemplo `invitacion-15-laura-lopez`.
2. Sube el contenido de esta carpeta (Add file → Upload files). `index.html` debe quedar en la raíz del repositorio.
3. Ve a **Settings → Pages**, en *Source* elige la rama `main` y la carpeta `/ (root)`, y guarda.
4. En uno o dos minutos tendrás `https://TU-USUARIO.github.io/invitacion-15-laura-lopez/`.

## Dominio propio (opcional)

Si compras un dominio como `invitacion15lauralopez.com`, conéctalo en Netlify desde **Domain management → Add a domain**. Netlify activa el HTTPS automáticamente.

## Editar los datos

Abre `js/invitacion.js`. Al inicio está el bloque `const EVENTO = { ... }` con el nombre, la fecha, la hora, el lugar, el WhatsApp, el enlace del mapa y la fecha límite. Cambia el texto entre comillas, guarda y vuelve a publicar.

## Probar en tu computador

Abre `index.html` con doble clic. Si la música no suena así, sirve la carpeta con:

```
python3 -m http.server 8000
```

y visita http://localhost:8000

## Notas

- La música empieza al pulsar «Abrir invitación»; los navegadores no permiten que suene antes de que el invitado toque la pantalla. El botón dorado de la esquina la pausa o la reanuda.
- Las tipografías se cargan desde Google Fonts. Si no hay conexión con ese servicio, la página usa fuentes de respaldo parecidas.
