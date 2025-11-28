# Ejemplo de Diagrama con Tabs (Renderizado + Código Copiable)

## Patrón para Todos los Diagramas

=== "📊 Diagrama"

    ```mermaid
    graph LR
        A[Usuario] --> B[API]
        B --> C[(Database)]
    ```

=== "📋 Código"

    Copia este código para usarlo en [Mermaid Live](https://mermaid.live):

    ```text
    graph LR
        A[Usuario] --> B[API]
        B --> C[(Database)]
    ```

---

## Instrucciones

Para cada diagrama en la presentación:

1. **Tab 1 "Diagrama"**: Usa ` ```mermaid ` (se renderiza)
2. **Tab 2 "Código"**: Usa ` ```text ` o ` ```markdown ` (tiene botón copiar)

El usuario puede:
- Ver el diagrama renderizado en tab 1
- Copiar el código fácilmente en tab 2
- Pegarlo en mermaid.live
