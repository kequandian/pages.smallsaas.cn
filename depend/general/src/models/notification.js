import notification from 'antd/lib/notification';

export function notificationError({ message = '操作失败', description, duration = 5 }) {
  notification['error']({ message, description });
}

export function notificationSuccess({ message = '操作成功', description, duration = 5 }) {
  notification['success']({ message, description });
}

export function notificationWarning({ message = '警告', description, duration = 5 }) {
  notification['warning']({ message, description });
}

export function notificationInfo({ message = '提示信息', description, duration = 5 }) {
  notification['warning']({ message, description });
}
