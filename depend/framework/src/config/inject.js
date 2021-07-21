let data = {

};

export const inject = (key, obj) => {
  data[key] = obj;
};

export const get = (key) => {
  return data[key];
};
