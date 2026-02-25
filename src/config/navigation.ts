export interface NavItem {
  id: string;
  title: {
    en: string;
    zh: string;
  };
  icon?: string;
}

export interface NavGroup {
  title: {
    en: string;
    zh: string;
  };
  items: NavItem[];
}

export const navigation: NavGroup[] = [
  {
    title: { en: 'OVERVIEW', zh: '概览' },
    items: [
      {
        id: 'getting-started',
        title: { en: 'Getting Started', zh: '快速开始' },
        icon: 'rocket',
      },
      {
        id: 'faq',
        title: { en: 'FAQ', zh: '常见问题' },
        icon: 'help-circle',
      },
    ],
  },
  {
    title: { en: 'AUTHENTICATION', zh: '认证' },
    items: [
      {
        id: 'authentication',
        title: { en: 'Authentication', zh: '身份认证' },
        icon: 'key',
      },
    ],
  },
  {
    title: { en: 'API REFERENCE', zh: 'API 参考' },
    items: [
      {
        id: 'models',
        title: { en: 'Models List', zh: '获取模型列表' },
        icon: 'file-text',
      },
      {
        id: 'chat',
        title: { en: 'Chat Completions', zh: '聊天完成' },
        icon: 'message-square',
      },
      {
        id: 'embeddings',
        title: { en: 'Embeddings', zh: '文本嵌入' },
        icon: 'file-code',
      },
      {
        id: 'images',
        title: { en: 'Image Generation', zh: '图像生成' },
        icon: 'image',
      },
      {
        id: 'nano-banana-pro',
        title: { en: 'NanoBanana Pro', zh: 'NanoBanana Pro' },
        icon: 'image',
      },
      {
        id: 'nano-banana-pro-edit',
        title: { en: 'NanoBananaPro Edit', zh: 'NanoBananaPro Edit' },
        icon: 'image',
      },
    ],
  },
  {
    title: { en: 'GUIDES', zh: '指南' },
    items: [
      {
        id: 'claude-code',
        title: { en: 'Claude Code Setup', zh: 'Claude Code 设置' },
        icon: 'terminal',
      },
      {
        id: 'codex',
        title: { en: 'OpenAI Codex Setup', zh: 'OpenAI Codex 设置' },
        icon: 'code',
      },
      {
        id: 'opencode',
        title: { en: 'OpenCode Setup', zh: 'OpenCode 设置' },
        icon: 'terminal',
      },
      {
        id: 'openclaw',
        title: { en: 'OpenClaw Setup', zh: 'OpenClaw 设置' },
        icon: 'terminal',
      },
      {
        id: 'trae',
        title: { en: 'Trae Setup', zh: 'Trae 设置' },
        icon: 'terminal',
      },
      {
        id: 'error-handling',
        title: { en: 'Error Handling', zh: '错误处理' },
        icon: 'alert-triangle',
      },
      {
        id: 'examples',
        title: { en: 'Code Examples', zh: '代码示例' },
        icon: 'code',
      },
    ],
  },
];
