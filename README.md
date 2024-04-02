# Strudel - MiniEditor


> Editor mínimo y simple para [Strudel](https://strudel.cc/).


## Requiere

+ Python 3
+ Livereload

## Características:

+ Personalizable, con la edición de `seteos.yml`.
+ Menú superior:
  + Conmutar visibilidad con `Key Escape`.
  + Área de comando. Para ejecutar código javascript.
  + Botones de ejecución del Strudel-REPL.
  + Botones para conmutar características del Strudel-REPL.
  + Dimensiones de ventana.
+ Comando javascript específicos:
  + `CC.leer("nombre_del_archivo")`: Lee el código con dicho nombre y extensión `.js` ubicado en la carpeta `./codigos/`, y lo introduce en el REPL.
  + `CC.grabar("nombre_del_archivo")`: Graba el código actual del REPL en un archivo con dicho nombre y extensión `.js` en la carpeta `./codigos/`.
