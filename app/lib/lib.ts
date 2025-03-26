export const getNumGalleries = (galleries: any) => {
  const numGalleriesDivided = galleries / 10;
  const numGalleries =
    numGalleriesDivided < 1 ? 1 : Math.floor(numGalleriesDivided) * 10;

  return numGalleries;
};
