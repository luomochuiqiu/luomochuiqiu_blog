/**
 * canvas-nest.js
 * 动态线条背景效果 - 本地化版本
 * 参数配置与原始版本一致
 */

!(function() {
    // 配置参数 - 与您最初提出的参数一致
    var config = {
        color: '220,220,220',    // 线条颜色
        opacity: 0.7,            // 透明度
        zIndex: -2,              // z-index
        count: 200               // 线条数量
    };

    // 获取脚本标签上的自定义属性
    var script = document.currentScript || (function() {
        var scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
    })();
    
    // 从脚本标签属性中获取配置（如果存在）
    if (script) {
        config.color = script.getAttribute('color') || config.color;
        config.opacity = parseFloat(script.getAttribute('opacity')) || config.opacity;
        config.zIndex = parseInt(script.getAttribute('zIndex')) || config.zIndex;
        config.count = parseInt(script.getAttribute('count')) || config.count;
    }

    // 核心实现代码
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var points = [];
    var width = window.innerWidth;
    var height = window.innerHeight;
    var random = Math.random;

    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: ${config.zIndex};
        pointer-events: none;
    `;

    document.body.appendChild(canvas);

    // 创建点
    function createPoint() {
        var x = random() * width;
        var y = random() * height;
        var vx = (random() - 0.5) * 2;
        var vy = (random() - 0.5) * 2;
        return { x: x, y: y, vx: vx, vy: vy };
    }

    // 初始化点
    for (var i = 0; i < config.count; i++) {
        points.push(createPoint());
    }

    // 绘制函数
    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        // 绘制线条
        ctx.strokeStyle = 'rgba(' + config.color + ',' + config.opacity + ')';
        ctx.lineWidth = 0.5;
        
        for (var i = 0; i < points.length; i++) {
            var p1 = points[i];
            for (var j = i + 1; j < points.length; j++) {
                var p2 = points[j];
                var dx = p1.x - p2.x;
                var dy = p1.y - p2.y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
        
        // 更新点位置
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x <= 0 || p.x >= width) p.vx = -p.vx;
            if (p.y <= 0 || p.y >= height) p.vy = -p.vy;
        }
        
        requestAnimationFrame(draw);
    }

    // 窗口大小调整
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    // 初始化
    window.addEventListener('resize', resize);
    resize();
    draw();
})();