// 管理员查看用户和其他管理员功能
function initAdminUserManagement() {
  // 添加用户管理标签页
  const userManagementTab = document.createElement('div');
  userManagementTab.className = 'tab-content';
  userManagementTab.id = 'userManagement';
  userManagementTab.innerHTML = `
    <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">用户管理</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">查看和管理所有用户信息</p>
      </div>
      <div class="border-t border-gray-200">
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <div class="text-sm font-medium text-gray-500">总用户数</div>
          <div class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"><span id="totalUsersCount">0</span></div>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <div class="text-sm font-medium text-gray-500">管理员数量</div>
          <div class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"><span id="adminUsersCount">0</span></div>
        </div>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <div class="text-sm font-medium text-gray-500">普通用户数量</div>
          <div class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"><span id="normalUsersCount">0</span></div>
        </div>
      </div>
    </div>

    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">用户列表</h3>
        <input type="text" id="userSearchInput" placeholder="搜索用户..." class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-64 sm:text-sm border-gray-300 rounded-md">
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户名</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">角色</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">积分</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">服务申请数</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200" id="usersList">
            <!-- 用户列表将在这里动态生成 -->
          </tbody>
        </table>
      </div>
    </div>
  `;
  document.getElementById('mainContent').appendChild(userManagementTab);

  // 添加管理员列表标签页
  const adminManagementTab = document.createElement('div');
  adminManagementTab.className = 'tab-content hidden';
  adminManagementTab.id = 'adminManagement';
  adminManagementTab.innerHTML = `
    <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">管理员列表</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">查看所有管理员信息</p>
      </div>
    </div>

    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户名</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">积分</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200" id="adminsList">
            <!-- 管理员列表将在这里动态生成 -->
          </tbody>
        </table>
      </div>
    </div>
  `;
  document.getElementById('mainContent').appendChild(adminManagementTab);

  // 添加用户详情模态框
  const userDetailModal = document.createElement('div');
  userDetailModal.className = 'fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center hidden';
  userDetailModal.id = 'userDetailModal';
  userDetailModal.innerHTML = `
    <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">用户详情</h3>
            <div class="mt-2">
              <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="userDetailUsername">用户名</h3>
                  <p class="mt-1 max-w-2xl text-sm text-gray-500">
                    角色: <span id="userDetailRole">普通用户</span> | 
                    积分: <span id="userDetailPoints">0</span>
                  </p>
                </div>
                <div class="border-t border-gray-200">
                  <div class="px-4 py-5 sm:p-0">
                    <dl class="sm:divide-y sm:divide-gray-200">
                      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">服务申请记录</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" id="userDetailServiceRequests">
                          <!-- 服务申请记录将在这里动态生成 -->
                        </dd>
                      </div>
                      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">活动报名记录</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" id="userDetailActivities">
                          <!-- 活动报名记录将在这里动态生成 -->
                        </dd>
                      </div>
                      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">订单记录</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" id="userDetailOrders">
                          <!-- 订单记录将在这里动态生成 -->
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onclick="document.getElementById('userDetailModal').classList.add('hidden')">
          关闭
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(userDetailModal);

  // 添加导航菜单项
  const navItem = document.createElement('li');
  navItem.innerHTML = `
    <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" id="userManagementLink">用户管理</a>
  `;
  document.querySelector('nav ul').appendChild(navItem);

  const adminNavItem = document.createElement('li');
  adminNavItem.innerHTML = `
    <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" id="adminManagementLink">管理员列表</a>
  `;
  document.querySelector('nav ul').appendChild(adminNavItem);

  // 绑定导航菜单点击事件
  document.getElementById('userManagementLink').addEventListener('click', function(e) {
    e.preventDefault();
    showTab('userManagement');
    loadUserManagement();
  });

  document.getElementById('adminManagementLink').addEventListener('click', function(e) {
    e.preventDefault();
    showTab('adminManagement');
    loadAdminsList();
  });

  // 绑定用户搜索功能
  document.getElementById('userSearchInput').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const users = JSON.parse(localStorage.getItem('timebank_users') || '[]');
    const filteredUsers = users.filter(user => 
      user.username.toLowerCase().includes(searchTerm) || 
      (user.role === 'admin' ? '管理员' : '普通用户').includes(searchTerm)
    );
    renderUsersList(filteredUsers);
  });
}

// 加载用户管理数据
function loadUserManagement() {
  // 从localStorage获取用户数据
  const users = JSON.parse(localStorage.getItem('timebank_users') || '[]');
  
  // 渲染用户列表
  renderUsersList(users);
  
  // 更新用户统计
  updateUserStats(users);
}

// 渲染用户列表
function renderUsersList(users) {
  const usersContainer = document.getElementById('usersList');
  usersContainer.innerHTML = '';
  
  if (users.length === 0) {
    usersContainer.innerHTML = '<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">暂无用户</td></tr>';
    return;
  }
  
  // 按ID排序
  users.sort((a, b) => a.id - b.id);
  
  users.forEach(user => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">${user.id}</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">${user.username}</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">${user.role === 'admin' ? '管理员' : '普通用户'}</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">${user.points || 0}</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">${user.serviceRequests ? user.serviceRequests.length : 0}</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button class="text-blue-600 hover:text-blue-900 view-user-btn" data-id="${user.id}">查看详情</button>
      </td>
    `;
    
    usersContainer.appendChild(row);
  });
  
  // 绑定查看用户详情按钮事件
  document.querySelectorAll('.view-user-btn').forEach(button => {
    button.addEventListener('click', function() {
      const userId = parseInt(this.getAttribute('data-id'));
      showUserDetail(userId);
    });
  });
}

// 更新用户统计
function updateUserStats(users) {
  const totalUsers = users.length;
  const adminUsers = users.filter(u => u.role === 'admin').length;
  const normalUsers = users.filter(u => u.role !== 'admin').length;
  
  document.getElementById('totalUsersCount').textContent = totalUsers;
  document.getElementById('adminUsersCount').textContent = adminUsers;
  document.getElementById('normalUsersCount').textContent = normalUsers;
}

// 显示用户详情
function showUserDetail(userId) {
  // 从localStorage获取用户数据
  const users = JSON.parse(localStorage.getItem('timebank_users') || '[]');
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    alert('用户不存在');
    return;
  }
  
  // 填充用户详情模态框
  document.getElementById('userDetailUsername').textContent = user.username;
  document.getElementById('userDetailRole').textContent = user.role === 'admin' ? '管理员' : '普通用户';
  document.getElementById('userDetailPoints').textContent = user.points || 0;
  
  // 渲染用户服务申请列表
  const serviceRequestsContainer = document.getElementById('userDetailServiceRequests');
  serviceRequestsContainer.innerHTML = '';
  
  if (!user.serviceRequests || user.serviceRequests.length === 0) {
    serviceRequestsContainer.innerHTML = '<div class="text-center py-4 text-gray-500">暂无服务申请记录</div>';
  } else {
    const serviceRequestsList = document.createElement('ul');
    serviceRequestsList.className = 'divide-y divide-gray-200';
    
    user.serviceRequests.forEach(request => {
      const item = document.createElement('li');
      item.className = 'py-4';
      
      // 设置状态样式
      let statusClass = '';
      if (request.status === '待审核') {
        statusClass = 'bg-yellow-100 text-yellow-800';
      } else if (request.status === '已通过') {
        statusClass = 'bg-green-100 text-green-800';
      } else if (request.status === '已拒绝') {
        statusClass = 'bg-red-100 text-red-800';
      }
      
      item.innerHTML = `
        <div class="flex justify-between">
          <div>
            <p class="text-sm font-medium text-gray-900">${request.serviceType}</p>
            <p class="text-sm text-gray-500">${request.hours} 小时</p>
          </div>
          <div>
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}">
              ${request.status}
            </span>
          </div>
        </div>
      `;
      
      serviceRequestsList.appendChild(item);
    });
    
    serviceRequestsContainer.appendChild(serviceRequestsList);
  }
  
  // 渲染用户活动报名列表
  const activitiesContainer = document.getElementById('userDetailActivities');
  activitiesContainer.innerHTML = '';
  
  if (!user.registeredActivities || user.registeredActivities.length === 0) {
    activitiesContainer.innerHTML = '<div class="text-center py-4 text-gray-500">暂无活动报名记录</div>';
  } else {
    const activitiesList = document.createElement('ul');
    activitiesList.className = 'divide-y divide-gray-200';
    
    user.registeredActivities.forEach(activity => {
      const item = document.createElement('li');
      item.className = 'py-4';
      
      // 设置状态样式
      let statusClass = '';
      if (activity.status === '待审核') {
        statusClass = 'bg-yellow-100 text-yellow-800';
      } else if (activity.status === '已通过') {
        statusClass = 'bg-green-100 text-green-800';
      } else if (activity.status === '已拒绝') {
        statusClass = 'bg-red-100 text-red-800';
      }
      
      item.innerHTML = `
        <div class="flex justify-between">
          <div>
            <p class="text-sm font-medium text-gray-900">${activity.activityTitle}</p>
            <p class="text-sm text-gray-500">${activity.date} ${activity.time}</p>
          </div>
          <div>
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}">
              ${activity.status}
            </span>
          </div>
        </div>
      `;
      
      activitiesList.appendChild(item);
    });
    
    activitiesContainer.appendChild(activitiesList);
  }
  
  // 渲染用户订单列表
  const ordersContainer = document.getElementById('userDetailOrders');
  ordersContainer.innerHTML = '';
  
  if (!user.orders || user.orders.length === 0) {
    ordersContainer.innerHTML = '<div class="text-center py-4 text-gray-500">暂无订单记录</div>';
  } else {
    const ordersList = document.createElement('ul');
    ordersList.className = 'divide-y divide-gray-200';
    
    user.orders.forEach(order => {
      const item = document.createElement('li');
      item.className = 'py-4';
      
      // 设置状态样式
      let statusClass = '';
      if (order.status === '待发货') {
        statusClass = 'bg-yellow-100 text-yellow-800';
      } else if (order.status === '已发货') {
        statusClass = 'bg-blue-100 text-blue-800';
      } else if (order.status === '已完成') {
        statusClass = 'bg-green-100 text-green-800';
      } else if (order.status === '已取消') {
        statusClass = 'bg-red-100 text-red-800';
      }
      
      item.innerHTML = `
        <div class="flex justify-between">
          <div>
            <p class="text-sm font-medium text-gray-900">${order.productName}</p>
            <p class="text-sm text-gray-500">${order.quantity} 件，${order.points} 积分</p>
          </div>
          <div>
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}">
              ${order.status}
            </span>
          </div>
        </div>
      `;
      
      ordersList.appendChild(item);
    });
    
    ordersContainer.appendChild(ordersList);
  }
  
  // 显示模态框
  document.getElementById('userDetailModal').classList.remove('hidden');
}

// 加载管理员列表
function loadAdminsList() {
  // 从localStorage获取用户数据
  const users = JSON.parse(localStorage.getItem('timebank_users') || '[]');
  const admins = users.filter(user => user.role === 'admin');
  
  // 渲染管理员列表
  renderAdminsList(admins);
}

// 渲染管理员列表
function renderAdminsList(admins) {
  const adminsContainer = document.getElementById('adminsList');
  adminsContainer.innerHTML = '';
  
  if (admins.length === 0) {
    adminsContainer.innerHTML = '<tr><td colspan="4" class="px-6 py-4 text-center text-gray-500">暂无管理员</td></tr>';
    return;
  }
  
  // 按ID排序
  admins.sort((a, b) => a.id - b.id);
  
  admins.forEach(admin => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">${admin.id}</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">${admin.username}</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">${admin.points || 0}</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button class="text-blue-600 hover:text-blue-900 view-admin-btn" data-id="${admin.id}">查看详情</button>
      </td>
    `;
    
    adminsContainer.appendChild(row);
  });
  
  // 绑定查看管理员详情按钮事件
  document.querySelectorAll('.view-admin-btn').forEach(button => {
    button.addEventListener('click', function() {
      const adminId = parseInt(this.getAttribute('data-id'));
      showUserDetail(adminId); // 复用用户详情函数
    });
  });
}
