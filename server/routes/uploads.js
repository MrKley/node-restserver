const express = require('express');
const fileUpload = require('express-fileupload');
const Usuario = require('../models/user');
const Producto = require('../models/producto');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(fileUpload({
    useTempFiles: true
}));


app.put('/upload/:tipo/:id', (req, res) => {

    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha seleccionado ningun archivo'
            }
        });
    };

    let tiposValidos = ['productos', 'usuarios']

    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Los tipos permitidos son ' + tiposValidos.join(', ')
            }
        })
    }
    let archivo = req.files.archivo;
    let nombreArchivo = archivo.name.split('.')
    let extValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extValidas.indexOf(nombreArchivo[nombreArchivo.length - 1]) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: ' Las extensiones permitidas son ' + extValidas.join(', ')
            }
        })
    }

    let nA = `${id}-${new Date().getMilliseconds()}.${nombreArchivo[nombreArchivo.length - 1]}`

    archivo.mv(`uploads/${tipo}/${nA}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (tipo === 'usuarios') {
            imagenUsuario(id, res, nA);
        } else {
            imagenProducto(id, res, nA);
        }
    });
});

function imagenUsuario(id, res, nA) {
    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            borraArchivo(nA, 'usuarios');
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            borraArchivo(nA, 'usuarios');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El usuario no existe'
                }
            });
        };

        borraArchivo(usuarioDB.img, 'usuarios');

        usuarioDB.img = nA;
        usuarioDB.save((err, usuarioS) => {
            res.json({
                ok: true,
                usuario: usuarioDB,
                img: nA
            })
        })
    });
}

function imagenProducto(id, res, nA) {
    Producto.findById(id, (err, productoDB) => {
        if (err) {
            borraArchivo(nA, 'productos');
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            borraArchivo(nA, 'productos');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El producto no existe'
                }
            });
        };

        borraArchivo(productoDB.img, 'productos');

        productoDB.img = nA;
        productoDB.save((err, productoS) => {
            res.json({
                ok: true,
                producto: productoS,
                img: nA
            })
        })
    });
}

function borraArchivo(nombreImg, tipo) {
    let pathUrl = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImg}`)

    if (fs.existsSync(pathUrl)) {
        fs.unlinkSync(pathUrl);
    }
}

module.exports = app;