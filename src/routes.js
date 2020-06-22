import IndexTable from './Components/TracerTable/IndexTable';
import UrlGenerator from './Components/UrlGenerator'

const routes = [
    {
        path: '/',
        Component: IndexTable,
        name: "Data"
    },
    {
        path: '/urlGenerator',
        Component: UrlGenerator,
        name: "UrlGenerator"
    }
]

export default routes;