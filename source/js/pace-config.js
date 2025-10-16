// pace.js 配置
paceOptions = {
  // 禁用自动开始（我们将手动控制）
  startOnPageLoad: false,
  
  // 元素选择器
  elements: false,
  
  // 事件监听
  eventLag: false,
  
  // AJAX 请求跟踪
  ajax: {
    trackMethods: ['GET', 'POST', 'PUT', 'DELETE', 'REMOTE']
  },
  
  // 文档跟踪
  document: true,
  
  // 最小进度百分比
  minTime: 250,
  
  // 初始进度
  initialRate: 0.01,
  
  // 进度增长速率
  catchupTime: 100,
  
  // 最大进度百分比
  maxProgressPerFrame: 20,
  
  // 轻松因子
  easeFactor: 1.25,
  
  // 目标渲染频率
  target: 'body'
};

// 自定义进度条样式
document.addEventListener('DOMContentLoaded', function() {
  // 移除默认的 pace 进度条
  var defaultPace = document.querySelector('.pace');
  if (defaultPace) {
    defaultPace.parentNode.removeChild(defaultPace);
  }
  
  // 创建自定义进度条容器
  var customPace = document.createElement('div');
  customPace.id = 'custom-pace';
  customPace.innerHTML = `
    <div class="custom-pace-progress">
      <div class="custom-pace-progress-inner"></div>
    </div>
  `;
  document.body.appendChild(customPace);
  
  // pace.js 事件监听
  Pace.on('start', function() {
    document.getElementById('custom-pace').classList.add('active');
  });
  
  Pace.on('progress', function(progress) {
    var progressInner = document.querySelector('.custom-pace-progress-inner');
    progressInner.style.width = progress + '%';
  });
  
  Pace.on('done', function() {
    document.getElementById('custom-pace').classList.add('complete');
    setTimeout(function() {
      document.getElementById('custom-pace').classList.remove('active', 'complete');
    }, 500);
  });
  
  // 开始 pace
  Pace.start();
});

// 页面跳转时触发进度条
document.addEventListener('click', function(e) {
  var link = e.target.closest('a');
  if (link && link.href && !link.target && 
      link.href.startsWith(window.location.origin) && 
      !link.href.includes('javascript:')) {
    Pace.restart();
  }
});