/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "avatar.iran.liara.run"

            },
            {
                hostname: "utfs.io"
            }
        ]
    },
    experimental: {
        staleTimes: {
            dynamic: 30,
            static: 180
        },
        serverComponentsExternalPackages: ["@node-rs/argon2"]
    },
    output: "standalone",
    skipMiddlewareUrlNormalize: true,
    reactStrictMode: true

};

export default nextConfig;
