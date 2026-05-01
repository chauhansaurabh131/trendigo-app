export const searchProductApi = query => {
  return api.get(`/user/product/search`, {
    params: {
      keyword: query,
    },
  });
};
