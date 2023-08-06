type HeadersType = {
  [key: string]: string;
}

type PropertiesType = {
  method: string;
  headers: HeadersType;
}

export type FetchPropertiesType = {
  url: string;
  properties: PropertiesType;
}