const repl = document.createElement('strudel-editor');

const repl_code = (c) => repl.editor.setCode(c);
const repl_eval = () => repl.editor.evaluate();
const repl_start = () => repl.editor.repl.start();
const repl_pause = () => repl.editor.repl.pause();
const repl_stop = () => repl.editor.repl.stop();

const repl_lineNumber = (e) => repl.editor.setLineNumbersDisplayed(Boolean(e));
const repl_textWrap = (e) => repl.editor.setLineWrappingEnabled(Boolean(e));
const repl_autoCompletion = (e) => repl.editor.setAutocompletionEnabled(Boolean(e));

const toggle_ln = () => { ln = !ln; repl_lineNumber(ln); }
const toggle_tw = () => { tw = !tw; repl_textWrap(tw);}
const toggle_ac = () => { ac = !ac; repl_autoCompletion(ac);}

const list_themes = () => console.log(Object.keys(themes).sort().join('\n'));
const list_functions = () => console.log(Object.keys(controls).sort().join('\n'));

const shutdown_app = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/fin', true);
    xhr.send();
    setTimeout( window.close, 500);
};

const set_theme = (k) => repl.editor.setTheme(k);

const informar_dimensiones = () => {
    window.dimensiones.innerHTML = `${window.innerWidth}x${window.innerHeight}`;
}

var ln, tw, ac;

window.addEventListener('load', e => {

    window.code.append(repl);

    ln = repl.settings.isLineNumbersDisplayed;
    tw = repl.settings.isLineWrappingEnabled;
    ac = repl.settings.isAutoCompletionEnabled;

    repl.editor.setFontFamily(font_family);
    set_theme(theme_key);
    repl_textWrap(true);

    setTimeout(()=>{
        console.log(1)
        document.body.style.backgroundColor = settings[theme_key].background;
    }, 0);


    window.btnEval.addEventListener('click', repl_eval);
    window.btnStart.addEventListener('click', repl_start);
    window.btnPause.addEventListener('click', repl_pause);
    window.btnStop.addEventListener('click', repl_stop);
    window.btnLineNumberToggle.addEventListener('click', toggle_ln);
    window.btnWrapTextToggle.addEventListener('click', toggle_tw);
    window.btnAutoCommpleteToggle.addEventListener('click', toggle_ac);
    window.btnShutdown.addEventListener('click', shutdown_app);


    window.codeComando.addEventListener('keydown', e => {
        let el = e.currentTarget,
            cB = 'bien',
            cE = 'error';
        el.classList = [];
        if(e.code === 'Enter'){
            try{
                eval(el.value);
                el.classList.add(cB);
                setTimeout(() => { el.classList.remove(cB) }, 1000);
            }catch{
                el.classList.add(cE);
            }

        }
    });

    window.addEventListener('resize', informar_dimensiones);

    window.addEventListener('keydown', e=>{
        if(e.code === 'Escape'){
            window.menu.classList.toggle('activo');
        }
    });

    informar_dimensiones();

    CC.lista(d => CC.leer(d.sort()[0]));
});
