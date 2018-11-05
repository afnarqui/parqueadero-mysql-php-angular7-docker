export interface VehiculosParqueadosPagos{
    id?:number;
    vehiculos_id:number;
    celdas_id:number;
    fecha_entrada?:string;
    fecha_salida?:string;
    estado:string;
    created_at?:string;
    update_at?:string;
    nombrecelda:string;
    placavehiculo:string;
    marcavehiculo:string;
    valorpagar:number;
    cadena:string;
}