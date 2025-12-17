#!/bin/bash

echo "=========================================="
echo "🚀 Documentation AI - Inicio Completo"
echo "=========================================="
echo ""

# Función para verificar si Docker está corriendo
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo "❌ Error: Docker no está corriendo"
        echo "   Por favor inicia Docker Desktop o el daemon de Docker"
        exit 1
    fi
    echo "✅ Docker está corriendo"
}

# Función para verificar si docker-compose está instalado
check_docker_compose() {
    if ! command -v docker-compose &> /dev/null; then
        echo "❌ Error: docker-compose no está instalado"
        exit 1
    fi
    echo "✅ docker-compose está instalado"
}

# Menú de opciones
echo "Selecciona el modo de inicio:"
echo ""
echo "1) 🐳 Docker Compose (Recomendado - Todo en contenedores)"
echo "2) 💻 Local (Backend + MongoDB local, Frontend en Docker)"
echo "3) 🔧 Solo Backend (desarrollo local)"
echo ""
read -p "Opción (1-3): " option

case $option in
    1)
        echo ""
        echo "🐳 Iniciando con Docker Compose..."
        echo ""
        check_docker
        check_docker_compose
        
        echo "📦 Deteniendo contenedores previos..."
        docker-compose down
        
        echo "🏗️  Construyendo imágenes..."
        docker-compose build
        
        echo "🚀 Iniciando servicios..."
        docker-compose up -d
        
        echo ""
        echo "✅ ¡Servicios iniciados!"
        echo ""
        echo "📡 URLs disponibles:"
        echo "   - Frontend (MkDocs): http://localhost:8001"
        echo "   - Backend API:       http://localhost:8000"
        echo "   - API Docs (Swagger): http://localhost:8000/docs"
        echo "   - MongoDB:           mongodb://localhost:27017"
        echo ""
        echo "📊 Ver logs:"
        echo "   docker-compose logs -f"
        echo ""
        echo "🛑 Detener:"
        echo "   docker-compose down"
        ;;
    
    2)
        echo ""
        echo "💻 Iniciando en modo local..."
        echo ""
        
        # Verificar MongoDB
        if ! docker ps | grep -q mongodb; then
            echo "📦 Iniciando MongoDB..."
            docker run -d -p 27017:27017 --name mongodb mongo:7.0
        else
            echo "✅ MongoDB ya está corriendo"
        fi
        
        # Backend local
        cd backend
        if [ ! -d "venv" ]; then
            echo "📦 Creando entorno virtual..."
            python3 -m venv venv
        fi
        
        echo "🔌 Activando entorno virtual..."
        source venv/bin/activate
        
        echo "📥 Instalando dependencias..."
        pip install -q -r requirements.txt
        
        if [ ! -f ".env" ]; then
            echo "⚙️  Creando .env..."
            cp .env.example .env
        fi
        
        echo "🚀 Iniciando backend..."
        python run.py &
        BACKEND_PID=$!
        
        cd ..
        
        # Frontend en Docker
        echo "🎨 Iniciando frontend..."
        docker-compose up -d frontend
        
        echo ""
        echo "✅ ¡Servicios iniciados!"
        echo ""
        echo "📡 URLs disponibles:"
        echo "   - Frontend (MkDocs): http://localhost:8001"
        echo "   - Backend API:       http://localhost:8000"
        echo "   - API Docs (Swagger): http://localhost:8000/docs"
        echo ""
        echo "🛑 Para detener:"
        echo "   kill $BACKEND_PID"
        echo "   docker-compose down frontend"
        ;;
    
    3)
        echo ""
        echo "🔧 Iniciando solo backend..."
        echo ""
        cd backend
        ./start.sh
        ;;
    
    *)
        echo "❌ Opción inválida"
        exit 1
        ;;
esac
