import { useEffect } from 'react';

const useDidMount = (func: Function) => useEffect(() => { func(); }, []);

export default useDidMount;
