import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
  experimental: {
    // 이미지는 브라우저에서 Blob으로 직접 업로드되므로, 이 값은 텍스트 필드만 감당하면 된다.
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
