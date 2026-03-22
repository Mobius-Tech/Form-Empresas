# 👁️ Form - MobiusTech

![MobiusTech](src/assets/MobiusTechLogo.png)

**Form** es una plataforma de diagnóstico interactivo diseñada para identificar problemas en empresas y ofrecer soluciones estratégicas a través de una experiencia de usuario moderna, fluida y altamente visual.

## ✨ Características Principales

- **Interfaz Premium:** Diseño moderno con estética *glassmorphism*, fondos dinámicos y micro-animaciones fluidas.
- **Flujo Interactivo:** Sistema de preguntas paso a paso diseñado con **Framer Motion** para una navegación intuitiva.
- **Diagnóstico Integral:** Evalúa áreas críticas del negocio:
  - Control y métricas de ventas.
  - Gestión y rotación de inventarios.
  - Procesos de conversión y seguimiento de clientes.
  - Base de datos y personalización de ofertas.
- **Totalmente Responsivo:** Optimizado para una experiencia impecable tanto en dispositivos móviles como en tablets y escritorio.
- **Validación en Tiempo Real:** Asegura que toda la información necesaria sea capturada correctamente antes de avanzar.

## 🛠️ Tecnologías Utilizadas

- **React 18:** Biblioteca principal para la interfaz de usuario.
- **TypeScript:** Para un desarrollo robusto y tipado estático.
- **Vite:** Herramienta de construcción (build tool) ultra rápida para el desarrollo moderno.
- **Framer Motion:** Motor de animaciones para transiciones suaves y elegantes.
- **CSS3 (Vanilla):** Estilos personalizados utilizando variables y diseños modernos (Glassmorphism).

## 📂 Estructura del Proyecto

```text
src/
├── assets/             # Recursos visuales (Logos, imágenes de fondo)
├── components/         # Componentes reutilizables (FormContainer, QuestionSlide, Background)
├── constants.ts        # Configuración de las preguntas y datos estáticos
├── types.ts            # Definiciones de tipos para TypeScript
├── App.tsx             # Componente raíz y lógica principal del flujo
└── main.tsx            # Punto de entrada de la aplicación
```

## 🚀 Instalación y Desarrollo

Sigue estos pasos para ejecutar el proyecto localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Mobius-Tech/IRIS-Form.git
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Construir para producción:**
   ```bash
   npm run build
   ```

## 🌐 Despliegue

El proyecto está preparado para ser desplegado en plataformas como **Vercel** o **Netlify** con un solo clic, o mediante la carpeta `dist` generada por el comando de build.

---

Desarrollado con ❤️ por el equipo de **MobiusTech**.
