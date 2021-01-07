# docusaurus-plugin-moesif

A Docusaurus plugin for [Moesif API Analytics](https://www.moesif.com/) built using `moesif-browser-js`. 

For full documentation and configuration, see [moesif-browser-js docs](https://www.moesif.com/docs/client-integration/browser-js/)

The SDK automatically collects useful context from a user's device including any marketing attribution, device type, and location information and stores in the user and/or company profile in Moesif. You can add additional customer properties such as user email and company domain via the [identifyUser()](https://www.moesif.com/docs/client-integration/browser-js/#identifying-users) and [identifyCompany()](https://www.moesif.com/docs/client-integration/browser-js/#identifying-companies) methods.


> The below Diagram shows how both `docusaurus-plugin-moesif` and a Moesif [server integration](https://www.moesif.com/docs/server-integration/) to track both web and API traffic made by a customer. 

![Diagram of Moesif Moesif and Docusaurus architecture](https://www.moesif.com/docs/images/docs/client-integration/moesif-arch-docusaurus.png)

## How to install

1. Install `docusaurus-plugin-moesif`

  `npm install --save docusaurus-plugin-moesif`

2. Add plugin to `docusaurus.config.js`

```javascript
module.exports = {
  plugins: ['docusaurus-plugin-moesif'],
  themeConfig: {
    moesif: {
      applicationId: 'Your Moesif Application Id',
      // Add other Moesif options here.
    },
  },
};
```

3. Test it works

Because the plugin is disabled when `NODE_ENV` is set to development, you'll want to create a production build: 

```
npm run build

npm run serve
```

## How to use

Any of the Moesif browser APIs are accessible via `window.moesif`.
The plugin tracks page views automatically but we also recommend [identifying the user](https://www.moesif.com/docs/client-integration/browser-js/#identifying-users) like so:

```javascript
window.moesif.identifyUser("12345", {
  email: "john@acmeinc.com",
  firstName: "John",
  lastName: "Doe",
  title: "Software Engineer",
  salesInfo: {
    stage: "Customer",
    lifetimeValue: 24000,
    accountOwner: "mary@contoso.com",
  },
});
```

## Configuration Options

For full list of configuration options, [see this page](https://www.moesif.com/docs/client-integration/browser-js/#configuration-options).