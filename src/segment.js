import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

export default (function () {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  return {
    onRouteUpdate({ location }) {
      if (!window.analytics) return;
      window.analytics.track('Page Viewed', { pathname: location.pathname, title: document.title, host: document.host }); 
    },
  };
})();
