
export function saveToken({ account, token, avatar, perms = [], remember, permissions = '' }) {
  localStorage.avatar = avatar;
  localStorage.setItem('permissions', JSON.stringify(
    getAllChildPerms(perms)
  ));
  if (permissions && permissions.indexOf('[') > -1) {
    localStorage.setItem('permissions', JSON.stringify(permissions)); // zero-element 使用
  }
  if (remember) {
    localStorage.setItem('token', token);
  }
  else {
    sessionStorage.setItem('token', token);
  }
}

function getAllChildPerms(perms) {
  const permsList = perms;
  const rst = [];
  while (permsList.length) {
    const perm = permsList.shift();
    if (perm.identifier) {
      rst.push(perm.identifier);
    }
    if (perm.perms && Array.isArray(perm.perms)) {
      permsList.push(...perm.perms);
    }
  }
  return rst;
}

export function removeToken() {
  const removeList = ['token', 'avatar', 'permission', 'permissions'];
  removeList.forEach(key => {
    localStorage.removeItem(key);
  });
  sessionStorage.removeItem('token');
  if (window.MC && window.MC.ACCESS_TOKEN) {
    delete window.MC.ACCESS_TOKEN;
  }
  if (window.MC && window.MC.PERMISSIONS) {
    delete window.MC.PERMISSIONS;
  }
}

export function getToken() {
  if (window.MC && window.MC.ACCESS_TOKEN) {
    return window.MC.ACCESS_TOKEN;
  }
  const ssToken = sessionStorage.getItem('token');
  const lsToken = localStorage.getItem('token');
  if (ssToken && ssToken !== 'undefined') {
    return ssToken;
  }
  return lsToken;
}

export function getAccount() {
  let token;
  if (window.MC && window.MC.ACCESS_TOKEN) {
    token = window.MC.ACCESS_TOKEN;
  }
  if (token === undefined || token === null) {
    token = sessionStorage.token;
  }
  if (token === undefined || token === null) {
    token = localStorage.token;
  }
  if (token === undefined || token === null) {
    return null;
  }
  if (token.split('\.').length !== 3) {
    try {
      const str = new Buffer(token, 'base64').toString();
      const jsonObject = JSON.parse(str);
      return jsonObject.login_name;
    }
    catch (e) {
    }
    return null;
  }
  const str = new Buffer(token.split('\.')[1], 'base64').toString();
  return str.split(',')[2].split(':')[1].replace(/\"/g, "");
}

export function getUserId() {
  let token;
  if (window.MC && window.MC.ACCESS_TOKEN) {
    token = window.MC.ACCESS_TOKEN;
  }
  if (token === undefined || token === null) {
    token = sessionStorage.token;
  }
  if (token === undefined || token === null) {
    token = localStorage.token;
  }

  if (typeof token === 'string') {
    if (token.split('\.').length !== 3) {
      try {
        const str = new Buffer(token, 'base64').toString();
        const jsonObject = JSON.parse(str);
        return jsonObject.id;
      }
      catch (e) {
      }
      return null;
    }
    //console.log(token);
    const str = new Buffer(token.split('\.')[1], 'base64').toString();
    //console.log(str);
    return str.split(',')[1].split(':')[1].replace(/\"/g, "");
  }
  return null;
}

export function setAvatar(avatar) {
  localStorage.avatar = avatar;
  sessionStorage.avatar = avatar;
}

export function getAvatar() {
  let avatar = sessionStorage.avatar;
  if (avatar === undefined) {
    avatar = localStorage.avatar;
  }
  return avatar;
}

export function getPermissions() {
  if (window.MC && window.MC.PERMISSIONS) {
    return window.MC.PERMISSIONS;
  }
  if (sessionStorage.PERMISSIONS) {
    return sessionStorage.PERMISSIONS;
  }
  const permission = localStorage.getItem('permissions');
  if (typeof permission === 'string' && (
    permission.indexOf('[') > -1 || permission.indexOf('{') > -1
  )) {
    try {
      const perm = JSON.parse(permission);
      if (perm.length > 0) {
        return perm;
      }
    } catch (error) {
      console.error('permissions parse 异常，请检查 localStorage 格式是否正确');
    }
    // else {
    //   return [];
    // }
  }
  // return JSON.parse(localStorage.getItem('permissions')) || [];
  return [];
}
