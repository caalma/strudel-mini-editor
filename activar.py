#!/usr/bin/env python
# -*- coding:utf-8 -*-

from livereload import Server
from app.app import app, cfg
from subprocess import Popen, PIPE
from os import chdir

def shutdown():
    print("Chau, hasta luego!")
    quit()

if __name__ == '__main__':
    r = './app/'
    chdir(r)

    h = cfg['server_host']
    p = cfg['server_port']
    l = 35729
    url = f'http://{h}:{p}'

    pb = Popen(f'{cfg["browser"]}"{url}"',
        shell=True, stdout=PIPE, stderr=PIPE)

    app.browser = pb
    app.livereload_shutdown = shutdown

    server = Server(app.wsgi_app)

    server.setHeader('Access-Control-Allow-Origin', '*')
    server.setHeader('Access-Control-Allow-Methods', '*')

    server.serve(root='./', liveport=l, host=h, port=p)
