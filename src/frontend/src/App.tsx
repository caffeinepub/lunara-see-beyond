import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useLocation,
} from "@tanstack/react-router";
import { useEffect } from "react";
import Footer from "./components/Footer";
import GlobalAudioPlayer from "./components/GlobalAudioPlayer";
import Header from "./components/Header";
import RulesPopup from "./components/RulesPopup";
import { AudioProvider } from "./contexts/AudioContext";
import About from "./pages/About";
import Artistic from "./pages/Artistic";
import DevDen from "./pages/DevDen";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LunaChat from "./pages/LunaChat";
import LunarArcadia from "./pages/LunarArcadia";
import Marketplace from "./pages/Marketplace";
import Soundscape from "./pages/Soundscape";
import WildGang from "./pages/WildGang";

function ScrollToTop() {
  const { pathname } = useLocation();
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname triggers scroll-to-top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

const rootRoute = createRootRoute({
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
      <div className="text-6xl">🌙</div>
      <h1 className="text-3xl font-bold text-foreground">Page Not Found</h1>
      <p className="text-white/50 max-w-sm">
        We couldn&apos;t find what you&apos;re looking for. The moon
        doesn&apos;t shine there.
      </p>
      <a
        href="/"
        className="px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/80 transition-colors"
      >
        Go Home
      </a>
    </div>
  ),
  component: () => (
    <AudioProvider>
      <div className="flex flex-col min-h-screen bg-background">
        <ScrollToTop />
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <GlobalAudioPlayer />
        <RulesPopup />
      </div>
    </AudioProvider>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const soundscapeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/soundscape",
  component: Soundscape,
});
const aloxideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/aloxide",
  component: DevDen,
});
const pixellensRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pixellens",
  component: Artistic,
});
const wildgangRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wildgang",
  component: WildGang,
});
const lunarArcadiaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lunar-arcadia",
  component: LunarArcadia,
});
const marketplaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/marketplace",
  component: Marketplace,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});
const lunaChatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lunachat",
  component: LunaChat,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  soundscapeRoute,
  aloxideRoute,
  pixellensRoute,
  wildgangRoute,
  lunarArcadiaRoute,
  marketplaceRoute,
  aboutRoute,
  loginRoute,
  lunaChatRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
