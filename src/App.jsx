import { useRoutes } from 'react-router-dom';

import { routers } from './router';
const App = () => {
    return useRoutes(routers);
};

export default App;
