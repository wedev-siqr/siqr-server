export const cleanObject = (o: any) => {
  return Object.keys(o).reduce(
    (ob: any, k: string) => (o[k] != undefined ? { ...ob, [k]: o[k] } : o),
    {}
  );
};
