/** @type {import('next').NextConfig} */
const nextConfig = {
  // pode ter outras coisas aqui

  // ADICIONE ESTE BLOCO (MODIFICADO):
  eslint: {
    // Diz ao Next.js: "Não falhe o build se encontrar erros de lint."
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;