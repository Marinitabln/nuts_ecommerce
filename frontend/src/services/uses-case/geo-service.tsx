import axios from "axios";

const GEOREF_BASE_URL = "https://apis.datos.gob.ar/georef/api";
const PROVINCIA = "Mendoza";

export interface GeoOption {
  id: string;
  nombre: string;
}

export const getDepartamentos = async (): Promise<GeoOption[]> => {
  const response = await axios.get(`${GEOREF_BASE_URL}/departamentos`, {
    params: {
      provincia: PROVINCIA,
      campos: "id,nombre",
      max: 30,
      orden: "nombre",
    },
  });

  return response.data.departamentos;
};

export const getLocalidades = async (departamento: string): Promise<GeoOption[]> => {
  const response = await axios.get(`${GEOREF_BASE_URL}/localidades`, {
    params: {
      provincia: PROVINCIA,
      departamento,
      campos: "id,nombre",
      max: 100,
      orden: "nombre",
    },
  });

  return response.data.localidades;
};
