#  Sistema de Predicción de Compra en E-commerce

##  Descripción del problema

En el entorno del comercio electrónico, es fundamental identificar qué usuarios tienen mayor probabilidad de realizar una compra. Muchas empresas no cuentan con herramientas que permitan anticipar el comportamiento del usuario en tiempo real.

Este proyecto busca solucionar esta necesidad mediante el uso de inteligencia artificial, permitiendo predecir la probabilidad de compra a partir del comportamiento del usuario dentro de una página web.

---

##  Tecnologías utilizadas

###  Backend
- Python
- FastAPI
- Uvicorn
- Pandas
- Scikit-learn
- Joblib

###  Frontend
- React
- TypeScript
- Vite
- TailwindCSS

---

##  Construcción del dataset

El dataset fue construido de manera simulada, representando el comportamiento de usuarios en un entorno de comercio electrónico.

Se incluyeron variables como:

- Precio del producto
- Tiempo de navegación en la página
- Cantidad de productos visualizados
- Categoría del producto
- Tipo de dispositivo (Celular, Tablet, PC)
- Hora del día

Cada registro fue etiquetado con:

---

##  Cantidad de datos

- Más de 100 registros simulados
- Datos estructurados en formato tabular
- Variables numéricas y categóricas

---

##  Modelo de Machine Learning utilizado

Se utilizó un modelo de clasificación supervisada para predecir la intención de compra del usuario.

### Modelo:
- Random Forest Classifier

---

##  Justificación del modelo

El modelo fue seleccionado debido a:

- Buena capacidad de generalización
- Manejo eficiente de datos mixtos (numéricos y categóricos)
- Robustez frente a ruido en el dataset
- Buen desempeño sin necesidad de mucho ajuste previo

---

##  Métricas del modelo

El modelo fue evaluado mediante:

- Accuracy (precisión general)
- Análisis de predicciones correctas

Se observaron limitaciones debido a inconsistencias en el dataset, lo cual permitió evidenciar la importancia de la calidad de los datos en modelos de Machine Learning.

---

##  Predicciones generadas

El sistema genera:

- Probabilidad de compra (%)
- Clasificación: Compra ✅ / No Compra ❌
- Nivel de interés (Alto / Medio / Bajo)
- Perfil del usuario
- Tipo de producto
- Acción recomendada

---

##  Uso de las predicciones

Las predicciones permiten:

- Identificar usuarios con alta intención de compra
- Generar recomendaciones de marketing
- Analizar el comportamiento del usuario
- Apoyar la toma de decisiones estratégicas

---

##  Implementación web

La solución fue llevada a la web mediante una arquitectura cliente-servidor:

- Backend: API REST con FastAPI
- Frontend: Aplicación React interactiva
- Comunicación: Fetch API (HTTP)

---

##  Arquitectura del sistema

### Backend:
- Endpoint `/predict` → recibe datos y genera predicción
- Endpoint `/historial` → retorna historial de consultas
- Modelo cargado con joblib

### Frontend:
- Formulario de entrada de datos
- Visualización de resultados
- Dashboard con métricas
- Tabla de historial

---

##  Dashboard

El sistema incluye un módulo de análisis que muestra:

- Total de predicciones
- Número de compras
- Número de no compras
- Tasa de conversión (%)

---

##  Reglas adicionales del sistema

Se implementaron reglas basadas en las predicciones:

- Clasificación del nivel de interés:
  - 🟢 Alto (>70%)
  - 🟡 Medio (40–70%)
  - 🔴 Bajo (<40%)

- Visualización de resultados mediante indicadores y barras

---

##  Interfaz de usuario

La interfaz permite:

- Ingresar datos de comportamiento del usuario
- Obtener predicciones en tiempo real
- Visualizar resultados de forma clara
- Analizar métricas mediante dashboard

### Objetivo

Facilitar la interpretación de datos y mejorar la toma de decisiones en comercio electrónico.

---

##  Ejecución del proyecto

### Backend:
pip install fastapi uvicorn pandas scikit-learn joblib
python -m uvicorn api:app --reload
---

### Frontend:
cd front
npm install
npm run dev

---

## Conclusión

El sistema demuestra cómo la inteligencia artificial puede ser utilizada para predecir el comportamiento de los usuarios y apoyar decisiones estratégicas en entornos digitales.

Además, evidencia la importancia de la calidad del dataset en el rendimiento de los modelos de Machine Learning.

---

## Autor

Desarrollado por: Nicolas Duran  
Proyecto académico – Ingeniería de Software