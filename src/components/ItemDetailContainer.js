import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './css/main.scss'
import loadingImg from './assets/imgs/loadingGif.gif'
import ItemDetail from './ItemDetail'

//Firebase
import { getData } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';



function ItemDetailContainer() {
    const { id } = useParams();
    const [loading, setLoading] =  useState(false);
    const [itemDetails, setItemDetails] = useState({});

    const fetchItemDetail = async () => {
        setLoading(true);
        const fetchCollection = collection(getData(), 'productos');
        const productSnaphot = await getDocs(fetchCollection);
        const productList = productSnaphot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const Product = productList.find(item => item.id === id )
              
        setItemDetails(Product);
        setLoading(false);
    };


    useEffect(() => {
        fetchItemDetail();

    }, [id]);





    // const getItemDetails =  () => {

    //     const promesa = new Promise((resolve) => {
    //         setLoading(true);
    //         setTimeout(function () {
  
    //             const fetchItems = [
    //                 { id: '1', title: "Nike Nikelab Acg Gore Tex 3", description: 'Nike Poncho vest black yellow rain wind jacket.', price: "120" + "$", pictureUrl: itemImg, altImg:'Poncho Nike Nikelab Acg Gore Tex 3' },
    //                 { id: '2', title: "Y-3 CLASSIC HOODED TRENCH", description: 'Y-3 Spring/Summer 2021 – Chapter 2.', price: "250" + "$", pictureUrl: itemImg2, altImg:'Y-3 Classic Hooded Trench' },
    //                 { id: '3', title: "Y-3 XPLORIC RAIN.RDY PARKA", description: 'Y-3 Technical rain parka for the stormiest weather and plenty of pockets.', price: "80" + "$", pictureUrl: itemImg3, altImg:'Y-3 Technical rain parka' }
    //              ] ;
                
                
    //             const myProduct = fetchItems.find(item => item.id === id )
    //             resolve(myProduct)
                
    //         }, 2000);
  
  
    //     }).then((dataResolve) => {
    //         setLoading(false);
    //         setItemDetails(dataResolve);
            
  
  
  
    //     }).catch((error) => {
    //         console.log('Error Product not found')
    //     })
    // }

    // useEffect(() => {
    //     getItemDetails();
    // }, [id]);


     if (loading) {
      return (
          <div className="App" style={{ marginTop: "15vh" }}>
              <h3>Loading Products...</h3>
              <img alt='loading'style={{ width: "20%" }} src={loadingImg} />

          </div>
      );
  }

    return (

        <div>
          {itemDetails && <ItemDetail details={itemDetails}  />}  
        </div>

    )

}

export default ItemDetailContainer;
