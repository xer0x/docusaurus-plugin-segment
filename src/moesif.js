import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

export default (function () {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  return {
    onRouteUpdate({ location }) {
      window.moesif.track('Page View', { pathname: location.pathname, title: document.title, host: document.host }); 
    },
  };
})();
