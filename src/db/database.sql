-- Crear tabla para la sección Identificación
CREATE TABLE identificacion (
    id_identificacion INT AUTO_INCREMENT PRIMARY KEY,
    version INT NOT NULL,
    ambiente VARCHAR(2) NOT NULL,
    tipoDte VARCHAR(2) NOT NULL,
    numeroControl VARCHAR(50) NOT NULL,
    codigoGeneracion VARCHAR(50) NOT NULL,
    tipoModelo INT NOT NULL,
    tipoOperacion INT NOT NULL,
    tipoContingencia VARCHAR(50) NULL,
    motivoContin VARCHAR(255) NULL,
    fecEmi DATE NOT NULL,
    horEmi TIME NOT NULL,
    tipoMoneda VARCHAR(3) NOT NULL
);

-- Crear tabla para la sección Emisor
CREATE TABLE emisor (
    id_emisor INT AUTO_INCREMENT PRIMARY KEY,
    nit VARCHAR(14) NOT NULL,
    nrc VARCHAR(8) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    codActividad VARCHAR(5) NOT NULL,
    descActividad VARCHAR(255) NOT NULL,
    nombreComercial VARCHAR(255) NULL,
    tipoEstablecimiento VARCHAR(2) NOT NULL,
    direccion_departamento VARCHAR(2) NOT NULL,
    direccion_municipio VARCHAR(2) NOT NULL,
    direccion_complemento VARCHAR(255) NOT NULL,
    telefono VARCHAR(9) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    codEstableMH VARCHAR(10) NOT NULL,
    codPuntoVentaMH VARCHAR(10) NULL
);

-- Crear tabla para la sección Receptor
CREATE TABLE receptor (
    id_receptor INT AUTO_INCREMENT PRIMARY KEY,
    tipoDocumento VARCHAR(2) NOT NULL,
    numDocumento VARCHAR(14) NOT NULL,
    nrc VARCHAR(8) NULL,
    nombre VARCHAR(255) NOT NULL,
    codActividad VARCHAR(5) NOT NULL,
    descActividad VARCHAR(255) NOT NULL,
    direccion_departamento VARCHAR(2) NOT NULL,
    direccion_municipio VARCHAR(2) NOT NULL,
    direccion_complemento VARCHAR(255) NOT NULL,
    telefono VARCHAR(9) NOT NULL,
    correo VARCHAR(255) NOT NULL
);

-- Crear tabla para la sección Cuerpo del Documento
CREATE TABLE cuerpo_documento (
    id_cuerpo INT AUTO_INCREMENT PRIMARY KEY,
    numItem INT NOT NULL,
    tipoItem INT NOT NULL,
    numeroDocumento VARCHAR(50) NULL,
    cantidad DECIMAL(10, 8) NOT NULL,
    codigo VARCHAR(20) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    precioUni DECIMAL(10, 2) NOT NULL,
    montoDescu DECIMAL(10, 2) NOT NULL,
    ventaNoSuj DECIMAL(10, 2) NOT NULL,
    ventaExenta DECIMAL(10, 2) NOT NULL,
    ventaGravada DECIMAL(10, 2) NOT NULL,
    psv DECIMAL(10, 2) NOT NULL,
    noGravado DECIMAL(10, 2) NOT NULL,
    ivaItem DECIMAL(10, 2) NOT NULL
);

-- Crear tabla para la sección Resumen
CREATE TABLE resumen (
    id_resumen INT AUTO_INCREMENT PRIMARY KEY,
    totalNoSuj DECIMAL(10, 2) NOT NULL,
    totalExenta DECIMAL(10, 2) NOT NULL,
    totalGravada DECIMAL(10, 2) NOT NULL,
    subTotalVentas DECIMAL(10, 2) NOT NULL,
    descuNoSuj DECIMAL(10, 2) NOT NULL,
    descuExenta DECIMAL(10, 2) NOT NULL,
    descuGravada DECIMAL(10, 2) NOT NULL,
    porcentajeDescuento DECIMAL(5, 2) NOT NULL,
    totalDescu DECIMAL(10, 2) NOT NULL,
    subTotal DECIMAL(10, 2) NOT NULL,
    ivaRete1 DECIMAL(10, 2) NOT NULL,
    reteRenta DECIMAL(10, 2) NOT NULL,
    montoTotalOperacion DECIMAL(10, 2) NOT NULL,
    totalNoGravado DECIMAL(10, 2) NOT NULL,
    totalPagar DECIMAL(10, 2) NOT NULL,
    totalLetras VARCHAR(255) NOT NULL,
    totalIva DECIMAL(10, 2) NOT NULL,
    saldoFavor DECIMAL(10, 2) NOT NULL,
    condicionOperacion INT NOT NULL
);

-- Crear tabla para la sección Pagos
CREATE TABLE pagos (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(2) NOT NULL,
    montoPago DECIMAL(10, 2) NOT NULL,
    referencia VARCHAR(255) NOT NULL,
    plazo VARCHAR(2) NOT NULL,
    periodo INT NOT NULL,
    id_resumen INT NOT NULL,
    FOREIGN KEY (id_resumen) REFERENCES resumen(id_resumen) ON DELETE CASCADE
);

-- Crear tabla para la sección Extensión
CREATE TABLE extension (
    id_extension INT AUTO_INCREMENT PRIMARY KEY,
    nombEntrega VARCHAR(255) NULL,
    docuEntrega VARCHAR(50) NULL,
    nombRecibe VARCHAR(255) NULL,
    docuRecibe VARCHAR(50) NULL,
    placaVehiculo VARCHAR(10) NULL,
    observaciones TEXT NULL
);

-- Crear tabla para la sección Apéndice
CREATE TABLE apendice (
    id_apendice INT AUTO_INCREMENT PRIMARY KEY,
    campo VARCHAR(255) NULL,
    etiqueta VARCHAR(255) NULL,
    valor VARCHAR(255) NULL
);

-- Crear tabla para la relación de las secciones con los DTE
CREATE TABLE dte (
    id_dte INT AUTO_INCREMENT PRIMARY KEY,
    id_identificacion INT NOT NULL,
    id_emisor INT NOT NULL,
    id_receptor INT NOT NULL,
    id_cuerpo_documento INT NOT NULL,
    id_resumen INT NOT NULL,
    id_extension INT NULL,
    id_apendice INT NULL,
    FOREIGN KEY (id_identificacion) REFERENCES identificacion(id_identificacion),
    FOREIGN KEY (id_emisor) REFERENCES emisor(id_emisor),
    FOREIGN KEY (id_receptor) REFERENCES receptor(id_receptor),
    FOREIGN KEY (id_cuerpo_documento) REFERENCES cuerpo_documento(id_cuerpo),
    FOREIGN KEY (id_resumen) REFERENCES resumen(id_resumen),
    FOREIGN KEY (id_extension) REFERENCES extension(id_extension),
    FOREIGN KEY (id_apendice) REFERENCES apendice(id_apendice)
);
