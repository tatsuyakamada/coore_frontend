const BaseURL = 'http://localhost:3200/api/v1';

const Url = (paths: string[] | string): string => {
  const addition = typeof paths === 'string'
    ? paths
    : paths.filter((path) => (path));
  return [BaseURL, addition].flat().join('/');
};

export default Url;
