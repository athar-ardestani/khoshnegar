import React, { useEffect, useState } from 'react';
import DataAndTime from '../component/DataAndTime';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, ScrollView, TextInput, ImageBackground, Divider } from "react-native";
import { SimpleLineIcons, Ionicons, AntDesign, Feather, Entypo } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Picker } from '@react-native-picker/picker';
import { saveAccessToken, retrieveAccessToken } from '../component/AccessTokenStorage';
import ProductList from '../component/ProductList';



function NewOrders({ route }) {

    const Navigation = useNavigation();
    const ID = route.params.ProductID;
    const [productList, setproductList] = useState(null);
    const [OpenOrder, setOpenOrder] = useState(null);
    const [OrderName, setOrderName] = useState(route.params.PersianType);
    const [OrderCode, setOrderCode] = useState('OrderCode');
    const [ProfileData, setProfileData] = useState(route.params.Profile);
    const [ProductCode, setProductCode] = useState('');
    const [ProductCount, setProductCount] = useState('1');
    const [ProductWidth, setProductWidth] = useState('');
    const [ProductHeight, setProductHeight] = useState('');
    const [typeAslit, settypeAslit] = useState('');
    const [Codetor, setCodetor] = useState('');
    const [CodeAstar, setCodeAstar] = useState('');
    const [WhiteForDown, setWhiteForDown] = useState('');
    const [WhiteForUp, setWhiteForUp] = useState('');
    const [LeftGavare, setLeftGavare] = useState('');
    const [RightGavare, setRightGavare] = useState('');
    const [SumTwoGavare, setSumTwoGavare] = useState('');
    const [ProductMultiline, setProductMultiline] = useState('');
    const [Chain, setChain] = useState();
    const [Chain2, setChain2] = useState();
    const [Accessories, setAccessories] = useState();
    const [Bast, setBast] = useState();
    const [UpSystem, setUpSystem] = useState();
    const [ClothType, setClothtype] = useState();
    const [ClothType2, setClothtype2] = useState();
    const [Did, setDid] = useState();
    const [Chap, setChap] = useState();
    const [Chap2, setChap2] = useState();
    const [VolvetCloth, setVolvetCloth] = useState();
    const [PaperType, setPaperType] = useState();
    const [SleepThing, setSleepThing] = useState();
    const [ThreadBatonDirection, setThreadBatonDirection] = useState();
    const [SlotSize, setSlotSize] = useState();

    const [data, setData] = useState(null);


    const HandleGoOrder = () => {
        Navigation.goBack();
    }

    // clearAsyncStorage = async () => {
    //     AsyncStorage.clear();
    // }








    useEffect(() => {


        const fetchData = async () => {
            try {
                const token = await retrieveAccessToken();
                const apiUrl = 'http://65.109.192.77/curtain/api/orders/?order_by=create_date&order_type=ascending';

                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token.access}`,
                    },
                    body: '',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                // اینجا می‌توانید لیست را چک کنید و کارهای مورد نیاز را انجام دهید
                console.log('لیست سفارشات:', data[0].product_orders);


                // اگر وضعیت سفارش Open باشد، کارهای مورد نیاز را انجام دهید
                if (data.length > 0 && data[0].order_status === 'open') {
                    setOrderCode(data[0].order_code);
                    setproductList(data[0].product_orders);
                }
                else {
                    const fetchData = async () => {
                        try {
                            const token = await retrieveAccessToken();
                            const apiUrl = 'http://65.109.192.77/curtain/api/orders/';

                            const response = await fetch(apiUrl, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Authorization': `Bearer ${token.access}`,
                                    'X-CSRFTOKEN': '4lCtIGvxgcjM5J5BeSArSLWtvFe0FGKVHZIoGpH5ax4JbTCtsJiSEEvB5r5Xk69m',
                                },
                                body: '',
                            });

                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }

                            const data = await response.json();

                            // اینجا می‌توانید لیست را چک کنید و کارهای مورد نیاز را انجام دهید
                            console.log('لیست سفارشات:', data);
                            setOrderCode(data.order_code);


                        } catch (error) {
                            console.error('خطا در درخواست:', error.message);
                        }
                    };

                    // اجرای درخواست
                    fetchData();
                }

            } catch (error) {
                console.error('خطا در درخواست:', error.message);
            }
        };

        // اجرای درخواست
        fetchData();

    }, []);


    const submitHandle = async () => {

        const token = await retrieveAccessToken();
        const apiUrl = 'http://65.109.192.77/curtain/api/orders/products/';


        const requestData = {
            "order_code": OrderCode,
            "product_id": ID,
            "file_id": "",
            "code": isNaN(ProductCode) ? 0 : ProductCode,
            "width": isNaN(ProductWidth) ? 0 : parseInt(ProductWidth),
            "height": isNaN(ProductHeight) ? 0 : parseInt(ProductHeight),
            "count": isNaN(ProductCount) ? 1 : parseInt(ProductCount),
            "chain_direction": Chain === undefined ? '' : Chain,
            "chain_direction_2nd": Chain2 === undefined ? '' : Chain2,
            "holder_type": Bast === undefined ? '' : Bast,
            "lifting_system": UpSystem === undefined ? '' : UpSystem,
            "net_code": isNaN(Codetor) ? 0 : parseInt(Codetor),
            "lining_code": isNaN(CodeAstar) ? 0 : parseInt(CodeAstar),
            "cloth_type": ClothType === undefined ? '' : ClothType,
            "cloth_type_2nd": ClothType2 === undefined ? '' : ClothType2,
            "view_type": Did === undefined ? '' : Did,
            "printing_type": Chap === undefined ? '' : Chap,
            "printing_type_2nd": Chap2 === undefined ? '' : Chap2,
            "left_lot_count": isNaN(LeftGavare) ? 0 : parseInt(LeftGavare),
            "right_lot_count": isNaN(RightGavare) ? 0 : parseInt(RightGavare),
            "same_sum_for_lots": isNaN(SumTwoGavare) ? 0 : parseInt(SumTwoGavare),
            "velvet_cloth_type": VolvetCloth === undefined ? '' : VolvetCloth,
            "white_top_padding": isNaN(WhiteForUp) ? 0 : parseInt(WhiteForUp),
            "white_down_padding": isNaN(WhiteForDown) ? 0 : parseInt(WhiteForDown),
            "paper_type": PaperType === undefined ? '' : PaperType,
            "thread_baton_direction": ThreadBatonDirection === undefined ? '' : ThreadBatonDirection,
            "slot_size": SlotSize === undefined ? '' : SlotSize,
            "label": "",
            "description": isNaN(ProductMultiline) ? '' : ProductMultiline
        };

        console.log(requestData);
        try {

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token.access}`,
                    'Content-Type': 'application/json',
                    'X-CSRFTOKEN': '2V5X40sDf8Vkj2GkykzX0EkPcdraPVCuFzbS2JEb9tGhpcdcMbhoMxTXMZi7ul1V',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${JSON.stringify(response)}`);
            }
            else {

                const responseData = await response.json();
                console.log('Response Data:', responseData);
                try {
                    const apiUrl = `http://65.109.192.77/curtain/api/orders/?order_by=create_date&order_type=ascending&search_term=${OrderCode}`;
                    console.log(apiUrl);
                    const response = await fetch(apiUrl, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token.access}`
                        }
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const data = await response.json();

                    setproductList(data[0].product_orders);
                    console.log(data); // Handle the response data as needed
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }

        } catch (error) {
            console.error('Error in fetch request:', error.message);
        }
    };









    return (

        <View style={styles.container}>
            <StatusBar hidden={true} />


            <ImageBackground source={require('../assets/Dushboard.png')} resizeMode="cover" style={styles.image}>

                {/* تاریخ و ساعت  */}
                <DataAndTime />



                {/* سربرگ اودر  */}
                <View style={styles.HeaderButton}>

                    <View style={styles.constainerBasket}>
                        <TouchableHighlight style={styles.button}>
                            <SimpleLineIcons name="basket" size={24} color="black" style={styles.basketIcon} onPress={() => { Navigation.navigate('NewOrders') }} />
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.button}>
                            <Ionicons name="menu-outline" size={24} color="black" style={styles.MenuIcon} />
                        </TouchableHighlight>
                    </View>

                    <View style={styles.constainerUser}>
                        <TouchableOpacity style={styles.userbutton} onPress={() => { Navigation.navigate('Profile', { Profile: ProfileData }) }}>
                            <Image source={require('../assets/user.png')} style={styles.userLogo} />
                            <Text style={styles.userName}>{ProfileData && ProfileData.fullname}</Text>
                        </TouchableOpacity>
                    </View>

                </View>







                <View style={styles.constainerButtons}></View>

                <View style={styles.constainerOrderButtons} >


                    <View style={styles.constainerViewButton}>
                        <Text style={styles.OrderCodeText}>{OrderCode}</Text>
                        <Text style={styles.OrderNameText}>{OrderName}</Text>

                    </View>




                    <ScrollView style={{ marginBottom: 200, height: 400, }} >

                        {ID === 1 || ID === 3 || ID === 4 || ID === 6 || ID === 7 || ID === 16 || ID === 222 || ID === 225 || ID === 333 || ID === 34 || ID === 31 ?
                            (< View style={styles.constainerTextPartOne}>
                                <TextInput maxLength={3} keyboardType='numeric' placeholder="تعداد" value={ProductCount} onChangeText={setProductCount} style={styles.TxtCode} require />
                                <TextInput maxLength={30} keyboardType='numeric' placeholder="کد محصول" value={ProductCode} onChangeText={setProductCode} style={styles.TxtCode} />
                            </View>) : (<View></View>)
                        }
                        {ID === 10 || ID === 11 ?
                            (< View style={styles.constainerTextPartOne}>
                                <TextInput maxLength={30} keyboardType='default' placeholder="هازان" value={typeAslit} onChangeText={settypeAslit} style={styles.TxtCode} editable={false} />
                                <TextInput maxLength={30} keyboardType='numeric' placeholder="کد محصول" value={ProductCode} onChangeText={setProductCode} style={styles.TxtCode} />
                            </View>) : (<View></View>)
                        }
                        {ID === 8 || ID === 9 ?
                            (< View style={styles.constainerTextPartOne}>
                                <TextInput maxLength={30} keyboardType='numeric' placeholder="ارتفاع" value={ProductWidth} onChangeText={setProductWidth} style={styles.TxtCode} />
                                <TextInput maxLength={30} keyboardType='numeric' placeholder="کد محصول" value={ProductCode} onChangeText={setProductCode} style={styles.TxtCode} />
                            </View>) : (<View></View>)
                        }

                        {ID === 1 || ID === 2 || ID === 3 || ID === 4 || ID === 5 || ID === 6 || ID === 7 || ID === 10 || ID === 11 || ID === 16 || ID === 333 || ID === 34 || ID === 31 ?
                            (<View style={styles.constainerTextPartOne}>
                                <TextInput maxLength={30} keyboardType='numeric' placeholder="عرض" value={ProductWidth} onChangeText={setProductWidth} style={styles.TxtCode} />
                                <TextInput maxLength={30} keyboardType='numeric' placeholder="ارتفاع" value={ProductHeight} onChangeText={setProductHeight} style={styles.TxtCode} />
                            </View>) : (<View></View>)
                        }

                        {ID === 12 ?
                            (<View style={styles.constainerPicker}>
                                <Picker style={styles.picker} selectedValue={Accessories}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setAccessories(itemValue)
                                    }>
                                    <Picker.Item style={styles.itemsHeader} key={0} label={'اکسسوری'} value={0} />
                                    <Picker.Item style={styles.items} key={1} label={'ریل'} value={'12'} />
                                    <Picker.Item style={styles.items} key={2} label={'قپه'} value={'13'} />
                                    <Picker.Item style={styles.items} key={2} label={'بست سقفی'} value={'14'} />
                                    <Picker.Item style={styles.items} key={2} label={'بست دیواری'} value={'15'} />
                                </Picker>
                            </View>) : (<View></View>)}

                        {ID === 12 ?
                            (< View style={styles.constainerTextPartOne}>
                                <TextInput maxLength={30} keyboardType='numeric' placeholder="عرض" value={ProductWidth} onChangeText={setProductWidth} style={styles.TxtCode} />
                                <TextInput maxLength={3} keyboardType='numeric' placeholder="تعداد" value={ProductCount} onChangeText={setProductCount} style={styles.TxtCode} />
                            </View>) : (<View></View>)
                        }
                        {ID === 2 || ID === 5 ?
                            (<View style={styles.constainerTextPartOne}>
                                <TextInput maxLength={3} keyboardType='numeric' placeholder="تعداد" value={ProductCount} onChangeText={setProductCount} style={styles.TxtNumber} />
                                <TextInput maxLength={30} keyboardType='numeric' placeholder="کد تور" value={Codetor} onChangeText={setCodetor} style={styles.TxtCode3} />
                                <TextInput maxLength={30} keyboardType='numeric' placeholder="کد آستر" value={CodeAstar} onChangeText={setCodeAstar} style={styles.TxtCode3} />
                            </View>) : (<View></View>)}

                        {ID === 8 || ID === 9 || ID === 10 ?
                            (<View style={styles.constainerTextPartOne}>
                                <TextInput maxLength={30} keyboardType='numeric' placeholder="سفید برای جای دوخت پایین" value={WhiteForDown} onChangeText={setWhiteForDown} style={styles.TxtCode} />
                                <TextInput maxLength={30} keyboardType='numeric' placeholder="سفید برای جای دوخت بالا" value={WhiteForUp} onChangeText={setWhiteForUp} style={styles.TxtCode} />
                            </View>) : (<View></View>)}

                        {ID === 8 || ID === 10 || ID === 11 ?
                            (<View style={styles.constainerTextPartOne}>
                                <TextInput maxLength={3} keyboardType='numeric' placeholder="تعداد قواره سمت چپ" value={LeftGavare} onChangeText={setLeftGavare} style={styles.TxtCode} />
                                <TextInput maxLength={3} keyboardType='numeric' placeholder="تعداد قواره سمت راست" value={RightGavare} onChangeText={setRightGavare} style={styles.TxtCode} />
                            </View>) : (<View></View>)}
                        {ID === 10 || ID === 11 ?
                            (<View style={styles.constainerTextPartTwo}>
                                <TextInput maxLength={4} keyboardType='numeric' placeholder="مجموعه دو قواره یک تصویری باشد" value={SumTwoGavare} onChangeText={setSumTwoGavare} style={styles.TxtCode2} />
                            </View>) : (<View></View>)}
                        {ID === 1 || ID === 3 || ID === 4 || ID === 6 || ID === 7 ?
                            (<View style={styles.constainerPicker}>
                                <Picker style={styles.picker} selectedValue={Chain}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setChain(itemValue)
                                    }>
                                    <Picker.Item style={styles.itemsHeader} key={0} label={'جهت زنجیر'} value={0} />
                                    <Picker.Item style={styles.items} key={1} label={'راست'} value={'right'} />
                                    <Picker.Item style={styles.items} key={2} label={'چپ'} value={'left'} />
                                </Picker>
                            </View>) : (<View></View>)}
                        {ID === 2 || ID === 5 ?
                            (<View style={styles.constainerPicker}>
                                <Picker style={styles.picker} selectedValue={Chain2}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setChain2(itemValue)
                                    }>
                                    <Picker.Item style={styles.itemsHeader} key={0} label={'جهت زنجیر'} value={0} />
                                    <Picker.Item style={styles.items} key={1} label={'هر دو راست'} value={'right_right'} />
                                    <Picker.Item style={styles.items} key={2} label={'هر دو چپ'} value={'left_left'} />
                                    <Picker.Item style={styles.items} key={2} label={'جپ و راست'} value={'right_left'} />
                                </Picker>
                            </View>) : (<View></View>)}
                        {ID === 1 || ID === 2 || ID === 3 || ID === 4 || ID === 5 || ID === 6 || ID === 7 || ID === 333 || ID === 31 ?
                            (<View style={styles.constainerPicker}>
                                <Picker style={styles.picker} selectedValue={Bast}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setBast(itemValue)
                                    }>
                                    <Picker.Item style={styles.itemsHeader} key={0} label={'نوع بست'} value={0} />
                                    <Picker.Item style={styles.items} key={1} label={'سقفی'} value={'ceiling'} />
                                    <Picker.Item style={styles.items} key={2} label={'دیواری'} value={'wall'} />
                                </Picker>
                            </View>) : (<View></View>)}
                        {ID === 1 || ID === 3 || ID === 4 || ID === 6 ?
                            (<View style={styles.constainerPicker}>
                                <Picker style={styles.picker} selectedValue={UpSystem}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setUpSystem(itemValue)
                                    }>
                                    <Picker.Item style={styles.itemsHeader} key={0} label={'سیستم بالارو'} value={0} />
                                    <Picker.Item style={styles.items} key={1} label={'گیربکس زنجیره دار'} value={'chain_gearbox'} />
                                    <Picker.Item style={styles.items} key={2} label={'موتور و ریموت'} value={'motor_remote'} />
                                </Picker>
                            </View>) : (<View></View>)}
                        {ID === 34 ?
                            (<View style={styles.constainerPicker}>
                                <Picker style={styles.picker} selectedValue={ClothType}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setClothtype(itemValue)
                                    }>
                                    <Picker.Item style={styles.itemsHeader} key={0} label={'نوع پارچه'} value={0} />
                                    <Picker.Item style={styles.items} key={1} label={'میکرو عرض ۱۵۰ '} value={'160micro'} />
                                    <Picker.Item style={styles.items} key={2} label={'میکرو عرض ۲۵۰'} value={'250micro'} />
                                </Picker>
                            </View>) : (<View></View>)}
                        {ID === 4 || ID === 5 ?
                            (<View style={styles.constainerPicker}>
                                <Picker style={styles.picker} selectedValue={ClothType2}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setClothtype2(itemValue)
                                    }>
                                    <Picker.Item style={styles.itemsHeader} key={0} label={'نوع پارچه'} value={0} />
                                    <Picker.Item style={styles.items} key={1} label={' ۷ سانتی '} value={'7cm'} />
                                    <Picker.Item style={styles.items} key={2} label={' ۲ سانتی '} value={'2cm'} />
                                    <Picker.Item style={styles.items} key={2} label={' ۱ سانتی '} value={'1cm'} />
                                </Picker>
                            </View>) : (<View></View>)}
                        {ID === 4 || ID === 6 || ID === 31 ?
                            (<View style={styles.constainerPicker}>
                                <Picker style={styles.picker} selectedValue={Did}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setDid(itemValue)
                                    }>
                                    <Picker.Item style={styles.itemsHeader} key={0} label={'نوع دید'} value={0} />
                                    <Picker.Item style={styles.items} key={1} label={' پنجره ( دید از روبروی) '} value={'front'} />
                                    <Picker.Item style={styles.items} key={2} label={' اپن دید از پشت '} value={'back'} />
                                </Picker>
                            </View>) : (<View></View>)}
                        {ID === 4 ?
                            (<View style={styles.constainerPicker}>
                                <Picker style={styles.picker} selectedValue={Chap}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setChap(itemValue)
                                    }>
                                    <Picker.Item style={styles.itemsHeader} key={0} label={'نوع چاپ'} value={0} />
                                    <Picker.Item style={styles.items} key={1} label={'یک رو'} value={'one_sided'} />
                                    <Picker.Item style={styles.items} key={2} label={'دو رو'} value={'two_sided'} />
                                </Picker>
                            </View>) : (<View></View>)}
                        {ID === 5 ?
                            (<View style={styles.constainerPicker}>
                                <Picker style={styles.picker} selectedValue={Chap2}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setChap2(itemValue)
                                    }>
                                    <Picker.Item style={styles.itemsHeader} key={0} label={'نوع چاپ'} value={0} />
                                    <Picker.Item style={styles.items} key={1} label={'معمولی ( چاپ روی تور)'} value={'regular'} />
                                    <Picker.Item style={styles.items} key={2} label={'آینه ای ( چاپ روی تور و آستر)'} value={'mirror'} />
                                </Picker>
                            </View>) : (<View></View>)}

                        {ID === 8 || ID === 9 ?
                            (<View style={styles.constainerPicker}>
                                <Picker style={styles.picker} selectedValue={VolvetCloth}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setVolvetCloth(itemValue)
                                    }>
                                    <Picker.Item style={styles.itemsHeader} key={0} label={'نوع پارچه پانچی'} value={0} />
                                    <Picker.Item style={styles.items} key={1} label={'هازان'} value={'hazan'} />
                                    <Picker.Item style={styles.items} key={2} label={'مخمل پورش'} value={'porsche_velvet'} />
                                    <Picker.Item style={styles.items} key={2} label={'محمل الیزه'} value={'elise_velvet'} />
                                    <Picker.Item style={styles.items} key={2} label={'کالیفرنیا'} value={'california'} />
                                    <Picker.Item style={styles.items} key={2} label={'ساتن'} value={'satin'} />
                                </Picker>
                            </View>) : (<View></View>)}

                        {ID === 225 ?
                            (<View style={styles.constainerPicker}>
                                <Picker style={styles.picker} selectedValue={Accessories}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setAccessories(itemValue)
                                    }>
                                    <Picker.Item style={styles.itemsHeader} key={0} label={'اکسسوری'} value={0} />
                                    <Picker.Item style={styles.items} key={1} label={'آباژور'} value={'25'} />
                                    <Picker.Item style={styles.items} key={2} label={'لوستر'} value={'26'} />
                                    <Picker.Item style={styles.items} key={3} label={'دیوار کوب'} value={'27'} />
                                    <Picker.Item style={styles.items} key={4} label={'ساعت'} value={'28'} />
                                    <Picker.Item style={styles.items} key={5} label={'جای دستمال'} value={'29'} />
                                    <Picker.Item style={styles.items} key={6} label={'سطل زباله'} value={'30'} />
                                </Picker>
                            </View>) : (<View></View>)}
                        {ID === 16 ? (<View style={styles.constainerPicker}>
                            <Picker style={styles.picker} selectedValue={PaperType}
                                onValueChange={(itemValue, itemIndex) =>
                                    setPaperType(itemValue)
                                }>
                                <Picker.Item style={styles.itemsHeader} key={0} label={'نوع کاغذ'} value={0} />
                                <Picker.Item style={styles.items} key={1} label={'چرمی'} value={'leather'} />
                                <Picker.Item style={styles.items} key={2} label={'سندی'} value={'sanadi'} />
                                <Picker.Item style={styles.items} key={3} label={'اکلیلی(هندی)'} value={'indian'} />
                                <Picker.Item style={styles.items} key={4} label={'الماسی'} value={'diamond'} />
                                <Picker.Item style={styles.items} key={5} label={'برلیان'} value={'brilliant'} />
                                <Picker.Item style={styles.items} key={6} label={'اکسیر'} value={'elixir'} />
                                <Picker.Item style={styles.items} key={7} label={'نوبل'} value={'noble'} />
                                <Picker.Item style={styles.items} key={8} label={'رافايل'} value={'raphael'} />
                                <Picker.Item style={styles.items} key={9} label={'یک تکه'} value={'one_piece'} />
                            </Picker>
                        </View>) : (<View></View>)}
                        {ID === 222 ? (<View style={styles.constainerPicker}>
                            <Picker style={styles.picker} selectedValue={SleepThing}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSleepThing(itemValue)
                                }>
                                <Picker.Item style={styles.itemsHeader} key={0} label={'کالای خواب'} value={0} />
                                <Picker.Item style={styles.items} key={1} label={'کالای خواب ست دونفره'} value={'17'} />
                                <Picker.Item style={styles.items} key={2} label={'کالای خواب ست تک نفره'} value={'18'} />
                                <Picker.Item style={styles.items} key={3} label={'لحاف دو نفره'} value={'19'} />
                                <Picker.Item style={styles.items} key={4} label={'لحاف تک نفره'} value={'20'} />
                                <Picker.Item style={styles.items} key={5} label={'کاور کش دو نفره'} value={'21'} />
                                <Picker.Item style={styles.items} key={6} label={'کاور کش تک نفره'} value={'22'} />
                                <Picker.Item style={styles.items} key={7} label={'روبالشتی'} value={'23'} />
                                <Picker.Item style={styles.items} key={8} label={'کوسن'} value={'24'} />
                            </Picker>
                        </View>) : (<View></View>)}
                        {ID === 333 || ID === 31 ? (<View style={styles.constainerPicker}>
                            <Picker style={styles.picker} selectedValue={ThreadBatonDirection}
                                onValueChange={(itemValue, itemIndex) =>
                                    setThreadBatonDirection(itemValue)
                                }>
                                <Picker.Item style={styles.itemsHeader} key={0} label={'جهت نخ و باتوم'} value={0} />
                                <Picker.Item style={styles.items} key={1} label={'راست'} value={'right'} />
                                <Picker.Item style={styles.items} key={2} label={'چپ'} value={'left'} />
                            </Picker>
                        </View>) : (<View></View>)}
                        {ID === 333 ?
                            (<View style={styles.constainerPicker}>
                                <Picker style={styles.picker} selectedValue={SlotSize}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setSlotSize(itemValue)
                                    }>
                                    <Picker.Item style={styles.itemsHeader} key={0} label={'سایز اسلت'} value={0} />
                                    <Picker.Item style={styles.items} key={1} label={'۱۶ میل'} value={'16mm'} />
                                    <Picker.Item style={styles.items} key={2} label={'۲۵ میل'} value={'25mm'} />
                                </Picker>
                            </View>) : (<View></View>)}


                        {ID === 1 || ID === 2 || ID === 3 || ID === 4 || ID === 5 || ID === 6 || ID === 7 ?
                            (<View>
                                <Text style={styles.descriptions}>در صورت نوع قاب یکسره و پارچه دو تکه یا چند تکه است در قسمت توضیحات به همراه جهت زنجیرها و سایر توضیحات لازم ذکر شود.</Text>
                            </View>) : (<View></View>)}
                        {ID === 8 || ID === 9 || ID === 10 || ID === 11 || ID === 12 || ID === 16 || ID === 222 || ID === 225 || ID === 34 ?
                            (<View>
                                <Text style={styles.descriptions}>در صورت داشتن توضیحات در کادر زیر توضیحات  لازم را ذکر کنید</Text>
                            </View>) : (<View></View>)}
                        {ID === 31 || ID === 333 ?
                            (<View>
                                <Text style={styles.descriptions}>نهایت عرض برای تولید ۲۰۰ سانتی متر است</Text>
                            </View>) : (<View></View>)}
                        <View style={styles.constainerText}>
                            <TextInput multiline={true} maxLength={250} keyboardType='default' placeholder="توضیحات"
                                value={ProductMultiline} onChangeText={setProductMultiline} style={styles.TxtMultiline} />
                        </View>
                        <View style={styles.constainerSubmit}>
                            <TouchableHighlight style={styles.Upload}>
                                <Feather name="upload" size={24} color="black" style={styles.uploadIcon} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.submit} onPress={submitHandle}>
                                <Text style={styles.submitText}>ثبت</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={{ minHeight: 250, }}>
                            <ProductList productList={productList} />



                        </View>
                    </ScrollView>

                </View>


            </ImageBackground >

            <View style={styles.footer}>
                <View style={styles.LeftCorder}>
                    <View style={styles.LeftCorderInside}></View>
                </View>
                <View style={styles.RightCorder}>
                    <View style={styles.RightCorderInside}></View>
                </View>



                <View style={styles.constainerfooter}>
                    <TouchableHighlight style={styles.cancel} onPress={HandleGoOrder}>
                        <Entypo name="cross" size={45} color="red" />
                    </TouchableHighlight>
                    <View style={styles.verticalDivider}></View>
                    {ProductList.length !== 0 ? (<TouchableHighlight style={styles.nextPage}>
                        <AntDesign name="arrowright" size={45} color="green" />
                    </TouchableHighlight>) : null}

                </View>


            </View>

        </View >

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',

    },
    dateTimeText: {
        color: 'black',
        fontSize: 16,
        margin: 5,
    },




    HeaderButton: {

        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 5,
    },
    constainerBasket: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

    basketIcon: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 50,
    },
    MenuIcon: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 50,
    },

    button: {
        marginLeft: 5,
        marginRight: 5,
    },
    constainerUser: {
        flexDirection: 'row',
    },
    userName: {
        color: 'black',
        fontSize: 18,
        textAlignVertical: 'center',
    },
    userbutton: {
        flexDirection: 'row',
    },
    userLogo: {
        margin: 10,
        width: 35,
        height: 35,
        resizeMode: 'contain',
    },






    constainerButtons: {
        backgroundColor: '#052f47',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        height: 50,
    },


    constainerOrderButtons: {
        backgroundColor: '#eeaa38',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        marginTop: -35,
        padding: 25,
    },



    constainerViewButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },
    constainerPicker:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'silver',
        margin: 2,
    },


    OrderCodeText: {
        fontSize: 18,
        width: '49%',
        color: 'white',
    },
    OrderNameText: {
        fontSize: 22,
        width: '49%',
        color: 'white',
    },


    TxtCode: {
        width: '49%',
        height: 40,
        borderRadius: 5,
        fontSize: 15,
        color: 'black',
        borderWidth: 1,
        borderColor: 'silver',
        backgroundColor: 'white',
        textAlign: 'center',
        margin: 2,
    },
    TxtCode2: {
        width: '99%',
        height: 40,
        borderRadius: 5,
        fontSize: 15,
        color: 'black',
        borderWidth: 1,
        borderColor: 'silver',
        backgroundColor: 'white',
        textAlign: 'center',
        margin: 2,
    },
    TxtCode3: {
        width: '40%',
        height: 40,
        borderRadius: 5,
        fontSize: 15,
        color: 'black',
        borderWidth: 1,
        borderColor: 'silver',
        backgroundColor: 'white',
        textAlign: 'center',
        margin: 2,
    },
    TxtNumber: {
        width: '15%',
        height: 40,
        borderRadius: 5,
        fontSize: 15,
        color: 'black',
        borderWidth: 1,
        borderColor: 'silver',
        backgroundColor: 'white',
        textAlign: 'center',
        margin: 2,
    },



    TxtMultiline: {
        width: '98%',
        height: 110,
        borderRadius: 5,
        margin: 5,
        padding: 10,
        fontSize: 15,
        color: 'black',
        borderWidth: 1,
        borderColor: 'silver',
        backgroundColor: 'white',
        textAlign: 'right',
        textAlignVertical: 'top',

    },
    constainerTextPartOne:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    constainerText: {
        flex: 1,
        justifyContent: 'center',

    },

    notification: {
        backgroundColor: '#0e526b',
        borderRadius: 5,
        padding: 15,
    },
    buttonOrder: {
        backgroundColor: '#eeaa38',
        width: '45%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'silver',
        borderStyle: 'dashed',
        margin: 2,
    },
    TextButtonOrder: {
        fontSize: 18,
        textAlign: 'center',
        padding: 20,
    },
    picker: {
        height: 40,
        width: '100%',
        fontSize: 15,
        color: 'black',
        borderRadius: 15,
    },
    itemsHeader: {
        color: 'red',
    },
    constainerSubmit:
    {
        paddingTop: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        marginBottom: 10,
    },
    submit: {
        width: '80%',
        height: 40,
        backgroundColor: '#0c86cd',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 5,

    },
    submitText: {
        color: 'white',

    },
    Upload: {
        width: '15%',
        height: 40,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: '#0ccd1a',
    },
    uploadIcon: {
        color: 'white',
    },



    constainerfooter: {
        backgroundColor: '#052f47',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: 80,
        zIndex: 2,
        position: 'absolute',
        bottom: 0,
    },
    verticalDivider: {
        height: '70%',
        width: 1, // عرض خط عمودی
        backgroundColor: 'white', // رنگ خط عمودی
    },
    descriptions: {
        color: 'white',
    },




    LeftCorder: {

        width: 25,
        height: 25,
        backgroundColor: '#052f47',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'absolute',
        bottom: 80,
        left: 0,
    },
    LeftCorderInside: {
        backgroundColor: '#eeaa38',
        height: 25,
        width: 25,
        alignSelf: 'flex-end',
        borderBottomLeftRadius: 50,
        zIndex: 2,
        position: 'absolute',
        bottom: 0,

    },
    RightCorder: {

        width: 25,
        height: 25,
        backgroundColor: '#052f47',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'absolute',
        bottom: 80,
        right: 0,
    },
    RightCorderInside: {
        backgroundColor: '#eeaa38',
        height: 25,
        width: 25,
        alignSelf: 'flex-end',
        borderBottomRightRadius: 50,
        zIndex: 2,
        position: 'absolute',
        bottom: 0,

    },
    footer: {
        zIndex: 20,
        width: '100%',
        height: 20,
        position: 'absolute',
        bottom: 0,

    }




});
export default NewOrders;