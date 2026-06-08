import os
import psycopg
from dotenv import load_dotenv

load_dotenv()
db_url = os.getenv('NEON_DATABASE_URL')
import urllib.parse
parsed = urllib.parse.urlsplit(db_url)
qs = urllib.parse.parse_qs(parsed.query)
qs.pop('channel_binding', None)
if 'neon.tech' in parsed.netloc and 'options' not in qs:
    host = parsed.netloc.split('@')[-1].split(':')[0]
    qs['options'] = [f"endpoint={host.split('.')[0]}"]
if 'sslmode' not in qs: qs['sslmode'] = ['require']
new_query = urllib.parse.urlencode(qs, doseq=True)
db_url = urllib.parse.urlunsplit((parsed.scheme, parsed.netloc, parsed.path, new_query, parsed.fragment))

conn = psycopg.connect(db_url)
cursor = conn.cursor()
cursor.execute("INSERT INTO empleado (id_empleado, nombre, apellido, dni, correo_corporativo) VALUES (1, 'Admin', 'Sistema', '12345678', 'admin@justicia.com') ON CONFLICT DO NOTHING;")
conn.commit()
print('Empleado admin creado')
