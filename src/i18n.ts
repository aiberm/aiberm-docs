export const locales = ['en', 'zh', 'zh-tw', 'ko', 'ja', 'ru', 'es', 'pt', 'it', 'fr', 'de', 'vi'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeMeta: Record<
  Locale,
  { native: string; english: string; htmlLang: string }
> = {
  en: { native: 'English', english: 'English', htmlLang: 'en' },
  zh: { native: '简体中文', english: 'Chinese (Simplified)', htmlLang: 'zh-CN' },
  'zh-tw': { native: '繁體中文', english: 'Chinese (Traditional)', htmlLang: 'zh-TW' },
  ko: { native: '한국어', english: 'Korean', htmlLang: 'ko' },
  ja: { native: '日本語', english: 'Japanese', htmlLang: 'ja' },
  ru: { native: 'Русский', english: 'Russian', htmlLang: 'ru' },
  es: { native: 'Español', english: 'Spanish', htmlLang: 'es' },
  pt: { native: 'Português', english: 'Portuguese', htmlLang: 'pt' },
  it: { native: 'Italiano', english: 'Italian', htmlLang: 'it' },
  fr: { native: 'Français', english: 'French', htmlLang: 'fr' },
  de: { native: 'Deutsch', english: 'German', htmlLang: 'de' },
  vi: { native: 'Tiếng Việt', english: 'Vietnamese', htmlLang: 'vi' },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export type LocalizedString = Record<Locale, string>;

export const ui: Record<
  Locale,
  {
    backHome: string;
    toc: string;
    editOnGitHub: string;
    home: string;
    console: string;
    models: string;
    docs: string;
    wechat: string;
    login: string;
    register: string;
    navigation: string;
    friends: string;
    copyPage: string;
    copied: string;
  }
> = {
  en: {
    backHome: 'Back to Home',
    toc: 'ON THIS PAGE',
    editOnGitHub: 'Edit this page on GitHub',
    home: 'Home',
    console: 'Console',
    models: 'Models',
    docs: 'Docs',
    wechat: 'WeChat',
    login: 'Login',
    register: 'Register',
    navigation: 'Navigation',
    friends: 'Friends',
    copyPage: 'Copy page',
    copied: 'Copied!',
  },
  zh: {
    backHome: '返回首页',
    toc: '本页内容',
    editOnGitHub: '在 GitHub 上编辑此页',
    home: '首页',
    console: '控制台',
    models: '模型',
    docs: '文档',
    wechat: '微信群',
    login: '登录',
    register: '注册',
    navigation: '导航',
    friends: '友情链接',
    copyPage: '复制本页',
    copied: '已复制',
  },
  'zh-tw': {
    backHome: '返回首頁',
    toc: '本頁內容',
    editOnGitHub: '在 GitHub 上編輯此頁',
    home: '首頁',
    console: '控制台',
    models: '模型',
    docs: '文件',
    wechat: '微信群',
    login: '登入',
    register: '註冊',
    navigation: '導覽',
    friends: '友情連結',
    copyPage: '複製本頁',
    copied: '已複製',
  },
  ko: {
    backHome: '홈으로 돌아가기',
    toc: '이 페이지에서',
    editOnGitHub: 'GitHub에서 이 페이지 편집',
    home: '홈',
    console: '콘솔',
    models: '모델',
    docs: '문서',
    wechat: 'WeChat',
    login: '로그인',
    register: '회원가입',
    navigation: '탐색',
    friends: '친구 링크',
    copyPage: '페이지 복사',
    copied: '복사됨!',
  },
  ja: {
    backHome: 'ホームに戻る',
    toc: 'このページの内容',
    editOnGitHub: 'GitHub でこのページを編集',
    home: 'ホーム',
    console: 'コンソール',
    models: 'モデル',
    docs: 'ドキュメント',
    wechat: 'WeChat',
    login: 'ログイン',
    register: '登録',
    navigation: 'ナビゲーション',
    friends: 'フレンドリンク',
    copyPage: 'ページをコピー',
    copied: 'コピーしました',
  },
  ru: {
    backHome: 'На главную',
    toc: 'НА ЭТОЙ СТРАНИЦЕ',
    editOnGitHub: 'Редактировать страницу на GitHub',
    home: 'Главная',
    console: 'Консоль',
    models: 'Модели',
    docs: 'Документация',
    wechat: 'WeChat',
    login: 'Войти',
    register: 'Регистрация',
    navigation: 'Навигация',
    friends: 'Партнёры',
    copyPage: 'Копировать страницу',
    copied: 'Скопировано!',
  },
  es: {
    backHome: 'Volver al inicio',
    toc: 'EN ESTA PÁGINA',
    editOnGitHub: 'Editar esta página en GitHub',
    home: 'Inicio',
    console: 'Consola',
    models: 'Modelos',
    docs: 'Documentación',
    wechat: 'WeChat',
    login: 'Iniciar sesión',
    register: 'Registrarse',
    navigation: 'Navegación',
    friends: 'Enlaces',
    copyPage: 'Copiar página',
    copied: '¡Copiado!',
  },
  pt: {
    backHome: 'Voltar ao início',
    toc: 'NESTA PÁGINA',
    editOnGitHub: 'Editar esta página no GitHub',
    home: 'Início',
    console: 'Console',
    models: 'Modelos',
    docs: 'Documentação',
    wechat: 'WeChat',
    login: 'Entrar',
    register: 'Registrar',
    navigation: 'Navegação',
    friends: 'Links',
    copyPage: 'Copiar página',
    copied: 'Copiado!',
  },
  it: {
    backHome: 'Torna alla home',
    toc: 'IN QUESTA PAGINA',
    editOnGitHub: 'Modifica questa pagina su GitHub',
    home: 'Home',
    console: 'Console',
    models: 'Modelli',
    docs: 'Documentazione',
    wechat: 'WeChat',
    login: 'Accedi',
    register: 'Registrati',
    navigation: 'Navigazione',
    friends: 'Link amici',
    copyPage: 'Copia pagina',
    copied: 'Copiato!',
  },
  fr: {
    backHome: "Retour à l'accueil",
    toc: 'SUR CETTE PAGE',
    editOnGitHub: 'Modifier cette page sur GitHub',
    home: 'Accueil',
    console: 'Console',
    models: 'Modèles',
    docs: 'Documentation',
    wechat: 'WeChat',
    login: 'Connexion',
    register: "S'inscrire",
    navigation: 'Navigation',
    friends: 'Liens',
    copyPage: 'Copier la page',
    copied: 'Copié !',
  },
  de: {
    backHome: 'Zurück zur Startseite',
    toc: 'AUF DIESER SEITE',
    editOnGitHub: 'Diese Seite auf GitHub bearbeiten',
    home: 'Startseite',
    console: 'Konsole',
    models: 'Modelle',
    docs: 'Dokumentation',
    wechat: 'WeChat',
    login: 'Anmelden',
    register: 'Registrieren',
    navigation: 'Navigation',
    friends: 'Links',
    copyPage: 'Seite kopieren',
    copied: 'Kopiert!',
  },
  vi: {
    backHome: 'Về trang chủ',
    toc: 'TRÊN TRANG NÀY',
    editOnGitHub: 'Chỉnh sửa trang này trên GitHub',
    home: 'Trang chủ',
    console: 'Bảng điều khiển',
    models: 'Mô hình',
    docs: 'Tài liệu',
    wechat: 'WeChat',
    login: 'Đăng nhập',
    register: 'Đăng ký',
    navigation: 'Điều hướng',
    friends: 'Liên kết',
    copyPage: 'Sao chép trang',
    copied: 'Đã sao chép!',
  },
};
