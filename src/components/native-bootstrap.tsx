import { useEffect } from "react";

/**
 * Applies native-shell polish (status bar styling, splash hide) when the app
 * runs inside the iOS/Android Capacitor shell. No-op on the web.
 */
export function NativeBootstrap() {
  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const { Capacitor } = await import("@capacitor/core");
      if (cancelled || !Capacitor.isNativePlatform()) return;

      document.documentElement.classList.add("native-app");

      try {
        const { StatusBar, Style } = await import("@capacitor/status-bar");
        await StatusBar.setStyle({ style: Style.Dark });
        if (Capacitor.getPlatform() === "android") {
          await StatusBar.setBackgroundColor({ color: "#0b0d0c" });
        }
      } catch {
        /* status bar plugin unavailable */
      }

      try {
        const { SplashScreen } = await import("@capacitor/splash-screen");
        await SplashScreen.hide();
      } catch {
        /* splash plugin unavailable */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
