export const parseId = (idParam: string): number | null => {
  const id = parseInt(idParam);
  return isNaN(id) ? null : id;
};
