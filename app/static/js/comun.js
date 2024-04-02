// --- funcionalidades de códigos

const CC = {
    grabar: (nom, ext='.js') => {
        // --- graba el contenido de un campo de código en el archivo indicado
        let ne = nom + ext;
        ajax_post('/codigo/grabar/', {nombre: ne, 'texto': repl.editor.code });
    },

    leer: (nom, ext='.js') => {
        // --- lee el codigo según el nombre de archivo indicado
        let ne = nom + ext;
        ajax_post('/codigo/leer/', {nombre: ne}, resp => {
            repl_code(resp);
        });
    },

    lista: (cb_ok = ()=>{}) => {
        // --- lista los archivos de codigos disponibles
        ajax_post('/codigos/', {}, resp => {
            cb_ok(resp.trim().split('\n'));
        });
    }
}


const ajax_post = (url, data, cb_ok=(or)=>{}, cb_err=(or)=>{}) => {
    // --- llamada al servidor con metodo post
    let xhr = new XMLHttpRequest(),
        fd = new FormData();

    Object.keys(data).forEach( k => { fd.append(k, data[k]) });
    xhr.open('POST', url, true);
    xhr.send(fd);
    xhr.onload = () => {
        if(xhr.status === 200) {
            cb_ok(xhr.response);
        }else{
            cb_err(xhr.response);
        }
    }
}
