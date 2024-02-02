import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const ProductListItem = ({ data }) => {
    return (
        <TouchableHighlight>
            <View style={{
                height: 90, width: "95%", backgroundColor: 'white', margin: 5, padding: 10, borderRadius: 15, borderColor: '#58595c',
                borderWidth: 1, borderStyle: 'dashed', flexDirection: 'row',
            }}>
                {data.file_id === "" ? (
                    <Entypo name="attachment" size={24} color="#052f47" style={{ width: 30, zIndex: 10, textAlign: 'center', verticalAlign: 'middle' }} />
                ) : null}
                <Text style={{
                    width: 90, height: 60, fontSize: 15, color: 'white', fontWeight: 'bold', backgroundColor: '#052f47', textAlign: 'center',
                    verticalAlign: 'middle', borderTopRightRadius: 15, borderTopLeftRadius: 15, transform: [{ rotateZ: '90deg' }],
                    position: 'absolute', right: -16, top: 14, borderWidth: 1, borderTopColor: '#58595c', borderRightColor: '#58595c', borderLeftColor: '#58595c'
                    , borderBottomColor: '#052f47', borderStyle: 'dashed', zIndex: 10,
                }}>کد : {data.code} </Text>
                <Text style={{ width: '80%', paddingRight: 30, textAlign: 'right', color: '#58595c', verticalAlign: 'middle' }}>
                    عرض : {data.width}  ارتفاع : {data.height}   تعداد : {data.count}  {'\n'}
                    جهت زنجیر : {data.chain_direction === 'left' ? 'چپ' : 'راست'} جهت بست : {data.holder_type === 'ceiling' ? 'سقفی' : 'دیوار'}  {'\n'}
                    سیستم بالا رو :  {data.lifting_system === 'chain_gearbox' ? 'گیربکس زنجیر دار' : 'موتور و ریموت'}{'\n'}
                    توضیحات : {data.description} </Text>
            </View>
        </TouchableHighlight>
    );
};

export default ProductListItem;
