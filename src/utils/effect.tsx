import { useEffect } from 'react';

const useDidMount = (func: () => void) => useEffect(() => { func(); }, []);

export default useDidMount;
