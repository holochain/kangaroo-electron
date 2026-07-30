// Matches hostnames with a 'dev' or 'test' component, e.g.
// dev-test-bootstrap2.holochain.org or test.bootstrap.example.com.
// Component-wise matching keeps the warning working when the server is
// renamed (the exact-URL comparison this replaces silently broke when
// dev-test-bootstrap2-iroh became dev-test-bootstrap2) while avoiding
// false positives on hostnames like contest.example.com.
const TEST_HOST_PATTERN = /(^|[.-])(dev|test)([.-]|$)/i;

function isTestServerUrl(url) {
  let hostname;
  try {
    hostname = new URL(url).hostname;
  } catch {
    return false;
  }
  return TEST_HOST_PATTERN.test(hostname);
}

module.exports = { isTestServerUrl };
