const fs = require('fs');
const path = require('path');

// 转换函数
function convertSameNameMdFiles(dirPath) {
    try {
        const items = fs.readdirSync(dirPath);

        items.forEach(item => {
            const itemPath = path.join(dirPath, item);
            const stat = fs.statSync(itemPath);

            // 只处理目录
            if (stat.isDirectory()) {
                const mdFilePath = path.join(itemPath, `${item}.md`);

                if (fs.existsSync(mdFilePath)) {
                    const newFilePath = path.join(itemPath, 'index.md');

                    try {
                        fs.renameSync(mdFilePath, newFilePath);
                        console.log(`✅ 重命名: ${mdFilePath} → ${newFilePath}`);
                    } catch (err) {
                        console.error(`❌ 重命名失败: ${mdFilePath}`, err.message);
                    }
                } else {
                    console.log(`⏭️ 跳过目录（未找到同名 .md 文件）: ${itemPath}`);
                }
            }
        });

        console.log('\n🎉 所有同名 Markdown 文件转换完成！');

    } catch (err) {
        console.error('❌ 读取目录失败:', err.message);
    }
}

// 获取当前目录
const currentDir = process.cwd();

console.log(`📁 开始处理目录: ${currentDir}\n`);

// 执行转换
convertSameNameMdFiles(currentDir);