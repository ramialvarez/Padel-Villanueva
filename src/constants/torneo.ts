export enum Genero {
  M = "Masculino",
  F = "Femenino",
  X = "Mixto",
}

export enum Categoria {
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
  Suma11 = "Suma11",
  Suma10 = "Suma 10",
  Suma9 = "Suma 9",
  Suma8 = "Suma 8",
  Suma7 = "Suma 7",
}

export function enumToOptions<T extends Record<string, string>>(enumObj: T) {
  return Object.values(enumObj).map((value) => ({
    value,
    label: value,
  }));
}

export const generoOptions = enumToOptions(Genero);
export const categoriaOptions = enumToOptions(Categoria);
