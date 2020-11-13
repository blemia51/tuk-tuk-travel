
function ApiExecutor(executor) {
  return { getWithHeader, get, put, post, del };

  function handle(request) {
    return request.then(({ data }) => {
      return data;
    });
  }

  function handleWithHeader(request) {
    return request.then(data => {
      return {
        body: data.data,
        headers: data.headers
      };
    });
  }
 
  function getUrl(url) {
    return url;
  }

  function getWithHeader(url, params, config) {
    return handleWithHeader(executor.get(getUrl(url), params, config));
  }

  function get(url, params, config) {
    return handle(executor.get(getUrl(url), params, config));
  }

  function put(url, body) {
    return handle(executor.put(getUrl(url), body));
  }

  function post(url, body, config) {
    return handle(executor.post(getUrl(url), body, config));
  }

  function del(url) {
    return handle(executor.delete(getUrl(url)));
  }
}

export default ApiExecutor;
