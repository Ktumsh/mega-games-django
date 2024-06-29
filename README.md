# 🕹️ Mega Games Django 👋
Cosas que debes tener en cuenta a la hora de revisar el código:
- 🚀 Las páginas principales las encontrarás en la carpeta /store
- 🪐 La carga de contenido de las páginas con Java Script las encontrarás en la carpeta /data
- 👽 Algunos scripts se manejan con JQuery, pero en su mayoría no
- 🌖 Las api las encontrarás en la ruta /data/api
- 🌎 Los scripts generales los encontrarás en la ruta /assets/js además del manejo de la parte de usuario, compras y algunos adicionales
- ✨ El manejo del servidor con express lo encontrarás en la carpeta /server
- ☄️ El manejo de la autenticación de usuario y del stock de productos se encuentra en la carpeta /controllers
- ⭐️ Para iniciar sesión primero debes crear tu cuenta, en el login, donde dice "Crear cuenta"
- 🚀 La página está creada por y para uso didáctico, inspirada en Steam y Eneba ¡Espero te guste!

## 📋 Requisitos

- Python 3.x

## 🐍 Instalación de Python

### En Windows 🪟

1. Descarga el instalador de Python desde [python.org](https://www.python.org/downloads/).
2. Ejecuta el instalador y asegúrate de seleccionar la opción "Add Python to PATH".
3. Sigue las instrucciones del instalador.

### En macOS 🍏

1. Abre la terminal.
2. Usa Homebrew para instalar Python:
```bash
brew install python
```

## ⚙️ Configuración del Proyecto 

### 1. Clonar el repositorio 📂

1. Abre la terminal o el símbolo del sistema.
2. Clona el repositorio:
```bash
git clone https://github.com/ktumsh/mega-games-django.git
cd mega-games-django
```

### 2. Crear y activar un entorno virtual 🌐

En Windows:

```bash
python -m venv venv
venv\Scripts\activate
```

En Unix/macOS:
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Instalar las dependencias 📦
```bash
pip install -r requirements.txt
```

### 4. Aplicar migraciones 🔄
```bash
python manage.py migrate
```

### 5. Crear un superusuario (opcional) 🛡️
```bash
python manage.py createsuperuser
```

### 6. Ejecutar el servidor de desarrollo 🚀
```bash
python manage.py runserver
```

### 7. Abrir la aplicación en el navegador 🌍

Abre un navegador web y navega a `http://127.0.0.1:8000/` para ver la aplicación en funcionamiento.

## ➕ Adicionales

### Acceder a la ventana de administrador 🔐

1. Abre un navegador web y navega a `http://127.0.0.1:8000/admin`.
2. Inicia sesión con las credenciales del superusuario que creaste anteriormente.

### Colaboradores principales:
<details>
  <summary>:zap: Josué Barra</summary>
</details>

<details>
  <summary>:zap: Renato Rivera</summary>
</details>
