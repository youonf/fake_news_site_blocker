// Limit the requests for which events are
// triggered.
//
// This allos us to have our code being executed
// only when the following URLs are matched.
// 
// ps.: if we were going to dynamically set the
//      URLs to be matched (used a configuration
//      page, for example) we'd then specify the 
//      wildcard <all_urls> and then do the filtering
//      ourselves.
const filter = {
    urls: [
      '*://www.orangenews.hk/*',
      // "block_links"
    ],
  }
  
  // Extra flags for the `onBeforeRequest` event.
  //
  // Here we're specifying that we want our callback
  // function to be executed synchronously such that
  // the request remains blocked until the callback 
  // function returns (having our filtering taking 
  // effect).
  const webRequestFlags = [
    'blocking',
  ];
  
  // Register our function that takes action when a request
  // is initiated and matches the provided filter that we
  // specified in the options.
  //
  // Because we outsourced the URL filtering to chrome itself
  // all we need to do here is always cancel the request (as
  // it matches the filter of unwanted webpages).
  window.chrome.webRequest.onBeforeRequest.addListener(
    page => {
      console.log('page blocked - ' + page.url);
  
      return {
        cancel: true,
      };
    },
    filter,
    webRequestFlags,
  );