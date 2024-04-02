#!/usr/bin/env python
# -*- coding:utf-8 -*-

from os import listdir
from os.path import splitext
from flask import ( Flask, render_template, request,
                   url_for, redirect, jsonify, send_file)
from werkzeug.exceptions import abort
#from markdown import Markdown
import yaml


# configuración

cfg = {}
with open('./seteos.yml', 'r') as f:
    cfg = yaml.safe_load(f)


# aplicación flash

app = Flask(__name__)
app.debug = True
app.config['TEMPLATES_AUTO_RELOAD'] = True


# pagina de controles

@app.route('/')
def editor():
    return render_template('editor.html', cfg=cfg, **locals())



# codigos

ru_codigos = '../' + cfg['carpeta']['codigos']

@app.route('/codigos/', methods=('GET','POST'))
def codigos_lista():
    lista = []
    for ar in listdir(ru_codigos):
        lista.append(splitext(ar)[0])
    return '\n'.join(lista)

@app.route('/codigo/leer/', methods=('GET','POST'))
def codigo_leer():
    if request.method == 'POST':
        nomb = request.form['nombre']
        with open(f'{ru_codigos}{nomb}', 'r') as f:
            return f.read()
    return 'error'

@app.route('/codigo/grabar/', methods=('GET','POST'))
def codigo_grabar():
    if request.method == 'POST':
        nomb = request.form['nombre']
        with open(f'{ru_codigos}{nomb}', 'w') as f:
            f.write(request.form['texto'])
            return ''
    return 'error'
