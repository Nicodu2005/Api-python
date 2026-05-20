from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd


app = FastAPI(
    title="API IA Ecommerce",
    description="Predicción de compra de usuarios",
    version="1.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


historiaUsuario = []
id_usuario = 1 
# -------------------------------
# CARGAR MODELO
modelo = joblib.load("modelo_rf.pkl")

# -------------------------------
# FUNCIÓN DE INTERPRETACIÓN
def interpretar_usuario(usuario, prob):
    precio, tiempo, productos, categoria, dispositivo, hora = usuario

    if tiempo < 10 and productos < 3:
        perfil = "Pasivo"
    elif tiempo < 30:
        perfil = "Explorador"
    else:
        perfil = "Comprometido"

    if prob < 0.3:
        nivel = "Muy baja"
    elif prob < 0.5:
        nivel = "Baja"
    elif prob < 0.7:
        nivel = "Media"
    elif prob < 0.85:
        nivel = "Alta"
    else:
        nivel = "Compra inminente"

    if precio < 40000:
        tipo = "Económico"
    elif precio < 80000:
        tipo = "Medio"
    else:
        tipo = "Premium"

    if prob > 0.7:
        accion = "Ofrecer descuento"
    elif prob > 0.4:
        accion = "Aplicar remarketing"
    else:
        accion = "No invertir"

    return perfil, nivel, tipo, accion


# -------------------------------
# ENDPOINT PRINCIPAL
@app.post("/predict")
def predecir(data: dict):
    global id_usuario
    usuario = pd.DataFrame([{
        "Precio del producto": data["precio"],
        "Tiempo en página": data["tiempo"],
        "Productos vistos": data["productos"],
        "Categoría": data["categoria"],
        "Dispositivo": data["dispositivo"],
        "Hora del día": data["hora"]
    }])

    prob = modelo.predict_proba(usuario)[0][1]
    pred = int(modelo.predict(usuario)[0])

    usuario_fila = usuario.iloc[0].values
    perfil, nivel, tipo, accion = interpretar_usuario(usuario_fila, prob)

    respuesta = {
         "id": id_usuario,
        "probabilidad_compra": round(prob, 3),
        "prediccion": pred,
        "perfil_usuario": perfil,
        "nivel_compra": nivel,
        "tipo_producto": tipo,
        "accion_recomendada": accion
    }

    historiaUsuario.append(respuesta)
    id_usuario +=1
    return respuesta


# -------------------------------
# ENDPOINT GET Historia

@app.get("/historial")
def historial():
    return historiaUsuario