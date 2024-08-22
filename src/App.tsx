import { Suspense } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routes from './routes';
import { SuspenseLoading } from './components';

function AppRoutes() {
    const routing = useRoutes(routes);

    return routing;
}

function App() {
    return (
        <Router>
            <Suspense fallback={<SuspenseLoading />}>
                <AppRoutes />
            </Suspense>
        </Router>
    );
}

export default App;
