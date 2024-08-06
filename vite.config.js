import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入resolve
import { resolve } from 'path'

// 文档：https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	// 为 ./src 提供别名 @
	resolve: {
		// 设置路径别名
		alias: {
			'@': resolve(__dirname, './src'),
			'*': resolve('')
		}
	},
	// 主动开启热更新
	server: {
		hmr: true
	}
})


