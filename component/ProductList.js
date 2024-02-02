import React from 'react';
import { FlatList } from 'react-native';
import ProductListItem from './ProductListItem'; // مسیر کامپوننت ProductListItem

const ProductList = ({ productList }) => {
    return (
        <FlatList
            data={productList}
            renderItem={({ item }) => <ProductListItem data={item} />}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

export default ProductList;
