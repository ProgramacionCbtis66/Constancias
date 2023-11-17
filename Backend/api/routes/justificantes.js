const express = require('express');
const just = express.Router();

const ccn = require('../connection/connection');

const verifica = require('./verificaToken');

just.get('/obtenerdatos',verifica, async (req, res) => { 
    const sql = 'select u.nombre, u.apellidoP, u.apellidoM, u.numControl, u.foto, j.motivo, j.periodo, j.inetutor, j.cartatutor, j.documentoreferencia, j.tipo, j.fecha, a.especialidad, a.grado, a.grupo, a.turno from justificante as j join alumno as a on j.numControl = a.numControl join usuario as u on a.numControl = u.numControl where j.estado = 0';
    //const sql = 'SELECT u.nombre FROM justificante j JOIN alumno a ON j.numControl = a.numControl JOIN usuario u ON a.numControl = u.numControl WHERE j.estado = 0 ';
    //const sql = 'SELECT * FROM justificante WHERE estado = 0';
    try {
        const conexion = await ccn();
        const [registros] = await conexion.execute(sql);
        if (registros.length > 0) {
        registros.forEach(function(){
            var i = 0;
            if(registros[i].foto != null){
                registros[i].foto = registros[i].foto = registros[i].foto.toString('utf-8');
            }
            i++;
        });
        //if(registros[0].foto != null) {registros.foto = registros[0].foto = registros[0].foto.toString('utf-8');}
        //res.json({data: registros});
        // Erik
        res.json({data: JSON.parse(JSON.stringify(registros))});
     }
     else {
        res.json({data:[]})
     }
        
    }catch(err) {
        console.log(err);
        res.json({data:[]})
    }
})


just.post('/guardardatos',verifica, async (req, res) => {
    const datos = req.body;
    const sql = 'insert into justificante (numControl, motivo, periodo, inetutor, cartatutor, doctoref, tipo, fecha, estado) values (?,?,?,?,?,?,?,?,?)';
    try {
        const conexion = await ccn();
        const resultado = await conexion.execute(sql, [datos.numControl, datos.motivo, datos.periodo, datos.inetutor, datos.cartatutor, datos.doctoref, datos.tipo, datos.fecha, 0]);
        if (resultado[0].affectedRows > 0) {
            res.json({status: 'Registrado'});
        }
        else {
            res.json({status: 'error'});
        }
    }catch(err) {   
        res.json({status: 'error'});
    }
})


module.exports = just;