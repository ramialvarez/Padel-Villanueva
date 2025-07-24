export enum GeneroTorneo {
  Masculino = "Masculino",
  Femenino = "Femenino",
  Mixto = "Mixto",
}

export enum GeneroJugador {
  Masculino = "Masculino",
  Femenino = "Femenino",
}

export enum CategoriaTorneo {
  Primera = "Primera",
  Segunda = "Segunda",
  Tercera = "Tercera",
  Cuarta = "Cuarta",
  Quinta = "Quinta",
  Sexta = "Sexta",
  Septima = "Septima",
  Octava = "Octava",
  Suma15 = "Suma 15",
  Suma14 = "Suma 14",
  Suma13 = "Suma 13",
  Suma12 = "Suma 12",
  Suma11 = "Suma 11",
  Suma10 = "Suma 10",
  Suma9 = "Suma 9",
  Suma8 = "Suma 8",
  Suma7 = "Suma 7",
}

export enum CategoriaJugador {
  Primera = "Primera",
  Segunda = "Segunda",
  Tercera = "Tercera",
  Cuarta = "Cuarta",
  Quinta = "Quinta",
  Sexta = "Sexta",
  Septima = "Septima",
  Octava = "Octava",
}

export function enumToOptions<T extends Record<string, string>>(enumObj: T) {
  return Object.values(enumObj).map((value) => ({
    value,
    label: value,
  }));
}

export const generoTorneoOptions = enumToOptions(GeneroTorneo);
export const generoJugadorOptions = enumToOptions(GeneroJugador);
export const categoriaTorneoOptions = enumToOptions(CategoriaTorneo);
export const categoriaJugadorOptions = enumToOptions(CategoriaJugador);
