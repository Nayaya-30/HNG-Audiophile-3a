//tsconfig.json
{
    "compilerOptions";
    {
        "baseUrl";
        ".",
            "paths";
        {
            "@/*";
            ["src/*"];
        }
        "target";
        "es2020",
            "lib";
        ["dom", "dom.iterable", "es6"],
"allowJs";
        true,
            "skipLibCheck";
        true,
            "strict";
        true,
            "forceConsistentCasingInFileNames";
        true,
            "noEmit";
        true,
            "esModuleInterop";
        true,
            "module";
        "esnext",
           "moduleResolution";
        "node",
            "resolveJsonModule";
        true,
            "isolatedModules";
        true,
            "jsx";
        "preserve",
            "incremental";
        true;
    }
    "include";
    ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
        "exclude";
    ["node_modules"];
}

/**@type {import('next').NextConfig} */
const nextConfig = {
  // Fix for webpack issue with exclamation marks in path
  webpack: (config, { isServer }) => {
    // Ensure webpack cache directory doesn't contain exclamation marks
    if (config.cache && config.cache.cacheDirectory){
      config.cache.cacheDirectory = config.cache.cacheDirectory.replace(/!/g, '_')
    }
    
    return config
  },
  // Future proof the app directory
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
