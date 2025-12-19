#!/usr/bin/env python3
"""
Script para corregir automáticamente los formatos de documentación:
1. Agregar saltos de línea antes de listas
2. Agregar comillas dobles a labels de Mermaid con espacios
"""

import re
import glob
import sys

def fix_mermaid_labels(content):
    """Agrega comillas dobles a labels de Mermaid que contienen espacios"""
    
    # Procesar solo bloques de código mermaid
    def process_mermaid_block(match):
        mermaid_code = match.group(1)
        
        # Función interna para procesar labels
        def fix_label(label_match):
            full_match = label_match.group(0)
            label = label_match.group(1)
            
            # Si ya tiene comillas, no hacer nada
            if label.startswith('"') and label.endswith('"'):
                return full_match
            
            # Si tiene espacios, <br/>, emojis, o caracteres especiales, agregar comillas
            if (' ' in label or '<br/>' in label or 
                any(c in label for c in ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'Á', 'É', 'Í', 'Ó', 'Ú', 'Ñ', ':', '/', '-']) or
                any(ord(c) > 127 for c in label)):  # Emojis y caracteres Unicode
                return f'["{label}"]'
            
            return full_match
        
        # Corregir labels en formato [...]
        mermaid_code = re.sub(r'\[([^\[\]"]+)\]', fix_label, mermaid_code)
        
        # Corregir labels en formato ((...)) para bases de datos
        def fix_db_label(db_match):
            label = db_match.group(1)
            if not (label.startswith('"') and label.endswith('"')):
                if (' ' in label or '<br/>' in label or 
                    any(c in label for c in ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'Á', 'É', 'Í', 'Ó', 'Ú', 'Ñ']) or
                    any(ord(c) > 127 for c in label)):
                    return f'(("{label}"))'
            return db_match.group(0)
        
        mermaid_code = re.sub(r'\(\(([^\(\)"]+)\)\)', fix_db_label, mermaid_code)
        
        return f'```mermaid\n{mermaid_code}```'
    
    # Procesar solo bloques mermaid
    content = re.sub(r'```mermaid\n(.*?)```', process_mermaid_block, content, flags=re.DOTALL)
    
    return content

def fix_list_spacing(content):
    """Agrega línea en blanco antes de listas si no existe"""
    
    # Patrón: línea que NO es vacía, seguida directamente de lista
    # Lista puede empezar con -, *, o número seguido de .
    pattern = r'([^\n])\n([-\*]|\d+\.)\s'
    
    def add_blank_line(match):
        return match.group(1) + '\n\n' + match.group(2) + ' '
    
    content = re.sub(pattern, add_blank_line, content)
    
    return content

def process_file(file_path):
    """Procesa un archivo markdown"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Aplicar correcciones
        content = fix_mermaid_labels(content)
        content = fix_list_spacing(content)
        
        # Guardar solo si hubo cambios
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True, file_path
        
        return False, file_path
    
    except Exception as e:
        print(f"❌ Error procesando {file_path}: {e}", file=sys.stderr)
        return False, file_path

def main():
    print("🔧 Corrigiendo formato de documentación...\n")
    
    # Encontrar todos los archivos markdown en docs/ de forma recursiva
    files = glob.glob("docs/**/*.md", recursive=True)
    
    modified_count = 0
    
    for file_path in files:
        modified, path = process_file(file_path)
        if modified:
            print(f"✅ Corregido: {path}")
            modified_count += 1
        else:
            print(f"⏭️  Sin cambios: {path}")
    
    print(f"\n✨ Proceso completado:")
    print(f"   - Archivos procesados: {len(files)}")
    print(f"   - Archivos modificados: {modified_count}")
    print(f"   - Archivos sin cambios: {len(files) - modified_count}")

if __name__ == "__main__":
    main()
