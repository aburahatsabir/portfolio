"use client";

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import "./MocsLiveDemo.css";
import {
  MOCS_LIVE_DEMO_FUNCTIONS,
  MOCS_LIVE_DEMO_HTML,
  MOCS_LIVE_DEMO_SCRIPT,
} from "./MocsLiveDemo.source";

Chart.register(...registerables);

type RuntimeApi = Record<string, (...args: unknown[]) => unknown> & {
  __mocsDispose?: () => void;
  renderAll?: () => void;
  renderAnalyticsOverview?: () => void;
  renderDashboard?: () => void;
  renderDashCharts?: () => void;
};

function decodeEscapedPayload(input: string) {
  return input
    .replace(/\\\$\{/g, "${")
    .replace(/\\`/g, "`")
    .replace(/\\\\/g, "\\");
}

export default function MocsLiveDemo() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    root.innerHTML = decodeEscapedPayload(MOCS_LIVE_DEMO_HTML);

    const doc = root.ownerDocument;
    const cleanups: Array<() => void> = [];
    const escapeId = (id: string) => {
      if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
        return CSS.escape(id);
      }
      return id.replace(/([ !"#$%&'()*+,./:;<=>?@[\]^`{|}~\\])/g, "\\$1");
    };

    const __mocsGet = (id: string) => root.querySelector<HTMLElement>(`#${escapeId(id)}`);
    const __mocsOne = <T extends Element>(selector: string) => root.querySelector<T>(selector);
    const __mocsAll = (selector: string) => root.querySelectorAll(selector);
    const __mocsAddDocEvent = (
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ) => {
      doc.addEventListener(type, listener, options);
      cleanups.push(() => doc.removeEventListener(type, listener, options));
    };

    let runtime: RuntimeApi | null = null;
    const previousGlobals = new Map<string, unknown>();

    try {
      const runtimeFactory = new Function(
        "__mocsGet",
        "__mocsOne",
        "__mocsAll",
        "__mocsAddDocEvent",
        "Chart",
        `${decodeEscapedPayload(MOCS_LIVE_DEMO_SCRIPT)}

if (typeof initDashboard === "function") {
  initDashboard();
}

return {
  ${MOCS_LIVE_DEMO_FUNCTIONS.join(",\n  ")},
  __mocsDispose: () => {
    try {
      if (typeof _charts === "object" && _charts) {
        Object.keys(_charts).forEach((id) => {
          try {
            destroyChart(id);
          } catch (err) {
            void err;
          }
        });
      }
    } catch (err) {
      void err;
    }
    try {
      if (typeof io !== "undefined" && io && typeof io.disconnect === "function") {
        io.disconnect();
      }
    } catch (err) {
      void err;
    }
  },
};
`
      ) as (
        __mocsGet: (id: string) => HTMLElement | null,
        __mocsOne: <T extends Element>(selector: string) => T | null,
        __mocsAll: (selector: string) => NodeListOf<Element>,
        __mocsAddDocEvent: (
          type: string,
          listener: EventListenerOrEventListenerObject,
          options?: boolean | AddEventListenerOptions
        ) => void,
        ChartCtor: typeof Chart
      ) => RuntimeApi;

      runtime = runtimeFactory(
        __mocsGet,
        __mocsOne,
        __mocsAll,
        __mocsAddDocEvent,
        Chart
      );

      Object.entries(runtime).forEach(([name, value]) => {
        if (name === "__mocsDispose" || typeof value !== "function") {
          return;
        }
        previousGlobals.set(name, (window as unknown as Record<string, unknown>)[name]);
        (window as unknown as Record<string, unknown>)[name] = value;
      });
    } catch (error) {
      const runtimeError =
        error instanceof Error
          ? `${error.name}: ${error.message}\n${error.stack ?? ""}`
          : String(error);
      (window as unknown as Record<string, unknown>).__mocsRuntimeError = runtimeError;
      console.error("MocsLiveDemo runtime init failed\n" + runtimeError);
    }

    // ── Re-render charts when the component becomes visible ──────
    // Chart.js requires the canvas to have non-zero dimensions.
    // Since the parent section uses a fade-in animation (opacity:0 initially),
    // charts drawn before the section is visible will be blank.
    // We use an IntersectionObserver to re-render once the demo is in view.
    let hasRenderedOnVisible = false;
    const rerenderCharts = () => {
      if (!runtime) return;
      try {
        if (typeof runtime.renderAll === "function") runtime.renderAll();
        if (typeof runtime.renderAnalyticsOverview === "function") runtime.renderAnalyticsOverview();
      } catch (e) {
        void e;
      }
    };

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRenderedOnVisible) {
            hasRenderedOnVisible = true;
            // Small delay to ensure CSS transitions have completed
            // and the container has its final painted dimensions
            setTimeout(rerenderCharts, 120);
          }
        });
      },
      { threshold: 0.15 }
    );
    visibilityObserver.observe(root);
    cleanups.push(() => visibilityObserver.disconnect());

    // Also re-render on resize (handles initial paint race on slow machines)
    if (typeof ResizeObserver !== "undefined") {
      let resizeTimer: ReturnType<typeof setTimeout> | null = null;
      const resizeObs = new ResizeObserver(() => {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(rerenderCharts, 200);
      });
      resizeObs.observe(root);
      cleanups.push(() => {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeObs.disconnect();
      });
    }

    // Final safety net: re-render 600ms after mount regardless
    const safetyTimer = setTimeout(rerenderCharts, 600);
    cleanups.push(() => clearTimeout(safetyTimer));

    return () => {
      runtime?.__mocsDispose?.();
      cleanups.forEach((fn) => fn());

      previousGlobals.forEach((oldValue, name) => {
        if (typeof oldValue === "undefined") {
          delete (window as unknown as Record<string, unknown>)[name];
          return;
        }
        (window as unknown as Record<string, unknown>)[name] = oldValue;
      });

      root.innerHTML = "";
    };
  }, []);

  return <div ref={rootRef} className="mocs-root" />;
}
