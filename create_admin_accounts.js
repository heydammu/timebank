// 创建管理员账户脚本
function createAdminAccounts() {
  // 获取现有用户数据
  let users = JSON.parse(localStorage.getItem('timebank_users') || '[]');

  // 创建4个管理员账户
  const adminUsers = [
    {
      id: Date.now() + 1,
      username: 'admin1',
      password: 'admin123',
      role: 'admin',
      points: 1000,
      loggedIn: false,
      registeredActivities: [],
      serviceRequests: [],
      orders: []
    },
    {
      id: Date.now() + 2,
      username: 'admin2',
      password: 'admin123',
      role: 'admin',
      points: 1000,
      loggedIn: false,
      registeredActivities: [],
      serviceRequests: [],
      orders: []
    },
    {
      id: Date.now() + 3,
      username: 'admin3',
      password: 'admin123',
      role: 'admin',
      points: 1000,
      loggedIn: false,
      registeredActivities: [],
      serviceRequests: [],
      orders: []
    },
    {
      id: Date.now() + 4,
      username: 'admin4',
      password: 'admin123',
      role: 'admin',
      points: 1000,
      loggedIn: false,
      registeredActivities: [],
      serviceRequests: [],
      orders: []
    }
  ];

  // 添加管理员账户到用户列表
  adminUsers.forEach(admin => {
    // 检查用户名是否已存在
    if (!users.some(user => user.username === admin.username)) {
      users.push(admin);
    }
  });

  // 保存更新后的用户数据
  localStorage.setItem('timebank_users', JSON.stringify(users));
  console.log('已成功创建4个管理员账户');
  
  return '已成功创建4个管理员账户: admin1, admin2, admin3, admin4，密码均为admin123';
}
