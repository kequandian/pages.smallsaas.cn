const config = {
  submitConfirm: false, //form 提交时 是否需要确认
  clearSearch: true, // 是否自动清除 search 的数据
};

export function getConfig(key) {
  return config[key];
}

export function setConfig(key, value) {
  config[key] = value;
}