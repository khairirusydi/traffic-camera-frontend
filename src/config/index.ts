const { VITE_BASE_URL } = import.meta.env;

interface Config {
  ApiBaseUrl: string;
}

const config: Config = {
  ApiBaseUrl: VITE_BASE_URL || 'http://localhost:3000',
};

export default config;
