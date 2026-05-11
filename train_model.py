import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier

print("ENTRENAMIENTO MODELO ECOMMERCE")

# -------------------------------
# CARGA DATOS
df = pd.read_excel("Libro1.xlsx")
df.columns = df.columns.str.strip()

columnas = [
    "Precio del producto",
    "Tiempo en página",
    "Productos vistos",
    "Categoría",
    "Dispositivo",
    "Hora del día",
    "Compra"
]

for col in columnas:
    df[col] = pd.to_numeric(df[col], errors="coerce")

df = df.dropna().reset_index(drop=True)

X = df.drop("Compra", axis=1)
y = df["Compra"]

categoricas = ["Categoría", "Dispositivo", "Hora del día"]
numericas = ["Precio del producto", "Tiempo en página", "Productos vistos"]

preprocesador = ColumnTransformer(
    transformers=[
        ("num", StandardScaler(), numericas),
        ("cat", OneHotEncoder(), categoricas)
    ]
)

modelo = Pipeline(steps=[
    ("preprocesamiento", preprocesador),
    ("clasificador", RandomForestClassifier(
        n_estimators=200,
        max_depth=10,
        random_state=42,
        class_weight="balanced"
    ))
])

modelo.fit(X, y)

# -------------------------------
# GUARDAR MODELO
joblib.dump(modelo, "modelo_rf.pkl")

print("✅ Modelo entrenado y guardado correctamente")