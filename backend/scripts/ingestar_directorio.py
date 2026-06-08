import os
import requests
import sys

def ingestar_directorio(directorio_path):
    url = "http://localhost:8000/api/documentos/upload"
    
    if not os.path.exists(directorio_path):
        print(f"❌ El directorio '{directorio_path}' no existe.")
        return

    archivos_pdf = [f for f in os.listdir(directorio_path) if f.lower().endswith('.pdf')]
    
    if not archivos_pdf:
        print(f"⚠️ No se encontraron archivos PDF en '{directorio_path}'.")
        return

    print(f"🚀 Iniciando ingesta masiva de {len(archivos_pdf)} documentos...")
    print(f"Endpoint destino: {url}\n")
    
    exitosos = 0
    fallidos = 0

    for archivo in archivos_pdf:
        ruta_completa = os.path.join(directorio_path, archivo)
        print(f"Procesando: {archivo} ...", end=" ", flush=True)
        
        try:
            with open(ruta_completa, 'rb') as f:
                files = {'file': (archivo, f, 'application/pdf')}
                response = requests.post(url, files=files)
                
            if response.status_code == 200:
                print("✅ Éxito")
                exitosos += 1
            else:
                print(f"❌ Error {response.status_code}: {response.text}")
                fallidos += 1
        except Exception as e:
            print(f"❌ Error de conexión: {str(e)}")
            fallidos += 1

    print("\n" + "="*40)
    print("📊 RESUMEN DE INGESTA MASIVA")
    print(f"Total encontrados: {len(archivos_pdf)}")
    print(f"✅ Exitosos guardados en Neon DB: {exitosos}")
    print(f"❌ Fallidos: {fallidos}")
    print("="*40)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Uso: python ingestar_directorio.py <ruta_a_la_carpeta_doc_base>")
        print("Ejemplo: python ingestar_directorio.py \"C:\\Users\\Salvatore\\Desktop\\doc_base\"")
    else:
        directorio = sys.argv[1]
        ingestar_directorio(directorio)
