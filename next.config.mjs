/** @type {import('next').NextConfig} */
const nextConfig = {
  // pode ter outras coisas aqui

  // ADICIONE ESTE BLOCO:
  eslint: {
    rules: {
      "react/no-unescaped-entities": "off"
    },
    // Isso é importante para garantir que o build não falhe
    ignoreDuringBuilds: false, 
  },
};

export default nextConfig;