# Calculadora de Diseño de Circuitos Electrónicos

Una aplicación web moderna y completa para automatizar cálculos comunes en el diseño de circuitos electrónicos, desarrollada con React y TypeScript.

![Circuit Calculator Preview](https://via.placeholder.com/800x400/2563eb/ffffff?text=Circuit+Calculator+Preview)

## Características Principales

### Ley de Ohm
- Cálculo automático de voltaje, corriente, resistencia y potencia
- Solo necesitas ingresar dos valores conocidos
- Implementa todas las variantes: V=IR, P=VI, P=V²/R, P=I²R

### Divisor de Voltaje
- Calcula voltaje de salida dado R1 y R2
- Determina R2 necesario para un voltaje específico
- **Selección automática de valores estándar E12/E24**
- Muestra voltaje real con componentes comerciales
- Calcula corriente y potencia disipada

### Filtros RC con Visualización
- Filtros pasa-bajos y pasa-altos
- Cálculo de frecuencia de corte: fc = 1/(2πRC)
- **Gráfica interactiva de respuesta en frecuencia**
- Visualización de magnitud en dB vs frecuencia
- Actualización en tiempo real

### Componentes Estándar
- Series E12 (±10%) y E24 (±5%) completas
- Algoritmo para encontrar valores comerciales más cercanos
- Información detallada sobre tolerancias

## Capturas de Pantalla

<details>
<summary>Ver capturas</summary>

### Ley de Ohm
![Ohm's Law Calculator](https://via.placeholder.com/600x400/f3f4f6/374151?text=Ohm's+Law+Calculator)

### Divisor de Voltaje
![Voltage Divider](https://via.placeholder.com/600x400/f3f4f6/374151?text=Voltage+Divider+Calculator)

### Filtros RC
![RC Filters](https://via.placeholder.com/600x400/f3f4f6/374151?text=RC+Filter+with+Graph)

</details>

## Tecnologías Utilizadas

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Gráficas**: Recharts
- **Iconos**: Lucide React
- **Matemáticas**: Cálculos nativos de JavaScript

## Instalación

### Prerequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/circuit-calculator.git
cd circuit-calculator
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

## Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye para producción
npm run preview      # Previsualiza build de producción

# Calidad de código
npm run lint         # Ejecuta ESLint
npm run type-check   # Verifica tipos de TypeScript
```

## Estructura del Proyecto

```
circuit-calculator/
├── README.md
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── index.html
├── src/
│   ├── components/       # Componentes
│   └── ... 
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Punto de entrada
│   ├── index.css         # Estilos globales
│   └── vite-env.d.ts     # Definiciones de tipos
├── public/               # Archivos estáticos
└── dist/                 # Build de producción
```

## Fórmulas Implementadas

### Ley de Ohm
```
V = I × R    (Voltaje = Corriente × Resistencia)
P = V × I    (Potencia = Voltaje × Corriente)  
P = V² / R   (Potencia = Voltaje² / Resistencia)
P = I² × R   (Potencia = Corriente² × Resistencia)
```

### Divisor de Voltaje
```
Vout = Vin × (R2 / (R1 + R2))
R2 = (Vout × R1) / (Vin - Vout)
```

### Filtros RC
```
fc = 1 / (2π × R × C)    (Frecuencia de corte)
H(jω) = 1 / (1 + jωRC)   (Función de transferencia pasa-bajos)
```

## Valores Estándar de Componentes

### Serie E12 (±10%)
```
1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2
```

### Serie E24 (±5%)
```
Incluye todos los valores E12 más:
1.1, 1.3, 1.6, 2.0, 2.4, 3.0, 3.6, 4.3, 5.1, 6.2, 7.5, 9.1
```

*Los valores se multiplican por potencias de 10 (ej: 1.2Ω, 12Ω, 120Ω, 1.2kΩ)*

## Casos de Uso

### Para Estudiantes
- Verificar cálculos de tareas y exámenes
- Visualizar respuesta en frecuencia de filtros
- Aprender sobre valores comerciales de componentes

### Para Ingenieros
- Cálculos rápidos durante el diseño
- Selección de componentes estándar
- Validación de diseños de filtros

### Para Técnicos
- Dimensionamiento de resistencias y capacitores
- Cálculo de potencias disipadas
- Diseño de divisores de voltaje

## Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar la calculadora:

1. **Fork** el repositorio
2. Crea una **rama** para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un **Pull Request**

### Ideas para contribuir
- [ ] Calculadora de transformadores
- [ ] Filtros RLC (segunda orden)
- [ ] Amplificadores operacionales
- [ ] Análisis de circuitos AC
- [ ] Exportar resultados a PDF
- [ ] Modo oscuro
- [ ] Múltiples idiomas

## Reportar Problemas

Si encuentras algún bug o tienes sugerencias:

1. Verifica que no exista un [issue similar](../../issues)
2. Crea un [nuevo issue](../../issues/new) con:
   - Descripción clara del problema
   - Pasos para reproducirlo
   - Capturas de pantalla (si aplica)
   - Información del navegador

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/Jobyta-avila)
- LinkedIn: [Tu LinkedIn](https://linkedin.com/in/mireya-ávila-velásquez-637504138)
- Email: mireyajobita@gmail.com

## Agradecimientos

- [React](https://reactjs.org/) - Biblioteca de UI
- [Vite](https://vitejs.dev/) - Build tool ultrarrápido
- [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS
- [Recharts](https://recharts.org/) - Gráficas para React
- [Lucide](https://lucide.dev/) - Iconos hermosos

## ¿Te gusta el proyecto?

Si este proyecto te ha sido útil, ¡dale una estrella! 

---

<div align="center">
  <p>Desarrollado con ❤️ para la comunidad de ingeniería electrónica</p>
  <p>
    <a href="#-calculadora-de-diseño-de-circuitos-electrónicos">Volver arriba</a>
  </p>
</div>
