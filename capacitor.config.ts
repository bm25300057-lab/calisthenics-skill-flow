import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.lovable.atlas.calisthenics",
  appName: "Atlas",
  webDir: "dist",
  // Atlas is a server-rendered app, so the native shells load the deployed site.
  // Swap this to your custom domain once you have one.
  server: {
    url: "https://calisthenics-skill-flow.lovable.app",
    cleartext: false,
  },
  ios: {
    contentInset: "always",
    backgroundColor: "#0b0d0c",
  },
  android: {
    backgroundColor: "#0b0d0c",
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      backgroundColor: "#0b0d0c",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#0b0d0c",
    },
  },
};

export default config;
