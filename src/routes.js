import React from 'react';
const Dashboard = React.lazy(() => import("./views/pages/Dashboard/Banlamviec"));
const About = React.lazy(() => import("./views/pages/Abouts/about"));
const Service = React.lazy(() => import("./views/pages/Service/service"));
const ServiceDetail = React.lazy(() => import("./views/pages/Service/Detail"));
const Product = React.lazy(() => import("./views/pages/Products/Product"));
const ProductDetail = React.lazy(() => import("./views/pages/Products/ProductDetail"));
const CartShop = React.lazy(() => import("./views/pages/Products/CartShooping"));
const routes = [
    { path: '/Home', name: 'Bàn làm việc', component: Dashboard },
    { path: '/', exact: true, name: 'Trang chủ' },
    { path: '/About', name: 'About', component: About },
    { path: '/Service', name: 'Service', component: Service },
    { path: '/Detail/:id', name: 'Detail', component: ServiceDetail },
    { path: '/Product', name: 'Sản phẩm', component: Product },
    { path: '/ProductDetail/:id', name: 'Chi tiết sản phẩm', component: ProductDetail },
    { path: '/CartShooping', name: 'Chi tiết giỏ hàng', component: CartShop },
];
export default routes;