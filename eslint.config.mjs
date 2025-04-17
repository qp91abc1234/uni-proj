import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier'
import importSortPlugin from 'eslint-plugin-for-sort-import'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'

const ignoreCfg = {
  files: ['**/*.{js,mjs,cjs,ts,vue}'],
  ignores: [
    // 构建产物
    'dist',
    'build',

    // 依赖
    'node_modules',

    // 缓存
    '.cache',
    '.temp',

    // 自动生成的文件
    'auto-imports.d.ts',
    'components.d.ts',

    // 测试覆盖率报告
    'coverage',

    // 静态资源
    'public',
    'static',

    // 编辑器配置
    '.vscode',
    '.idea',

    // 环境变量
    '.env.*',

    // 日志
    '*.log',

    // 其他
    '*.min.js',
    '*.min.css'
  ]
}

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,vue}'], plugins: { js }, extends: ['js/recommended'] },
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } }
  },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  ignoreCfg,
  eslintPluginPrettier,
  eslintConfigPrettier,
  importSortPlugin(),
  {
    languageOptions: {
      globals: {
        uni: true
      }
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
])
