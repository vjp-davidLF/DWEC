function convertirPorDefecto(producto = "Producto generico", precio = 100, impuesto = 21) {
    let prod = String(producto);

    let prec = parseInt(precio);
    let imp = parseInt(impuesto);

    if (isNaN(prec)) prec = 100;
    if (isNaN(imp)) imp = 21;

    if (producto === null || producto === undefined) prod = "Producto generico";

    console.log(`El producto es ${prod} el precio es ${prec} y su impuesto es ${imp}`);
}

convertirPorDefecto("ads");
convertirPorDefecto("ads",true);
convertirPorDefecto("ads",true,false);
convertirPorDefecto(null,34,56);