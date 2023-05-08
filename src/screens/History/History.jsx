import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from "styled-components";
import Footer from '../../components/Footer/Footer';
import { Heart } from '@styled-icons/evaicons-solid/Heart'
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';
import { ArrowBack } from '@styled-icons/boxicons-regular/ArrowBack';
import API from '../../API';
import { db } from "../../firebase"
import { addDoc, collection, getDocs, updateDoc, doc } from "firebase/firestore";

const History = () => {
    const navigate = useNavigate();
    const [sports, setSports] = useState([]);
    const [likes, setLikes] = useState([]);
    const { utilityApi } = API;

    const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background: #181828;
  }

  body, html, #root {
    height: 100%;
    font-family: -apple-system, Ubuntu , BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;;
  }
`;

    const Wrapper = styled.section`
    padding: 32px;
    width: 100%;
    height: 100%,
`;

    const Title = styled.h1`
    margin-top: 24.6px;
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 42px;
    line-height: 51px;    
    display: flex;
    align-items: flex-start;
    letter-spacing: -0.055em;
    color: #FEFEFE;
`;

    const Body = styled.p`
    width: 290px;
    font-family: 'Epilogue';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
    display: flex;
    align-items: flex-start;
    color: #FEFEFE;
    `;

    const Card = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 77px;
    border-radius: 12px;
    margin-top: 14px;
    background: #212135;
    `;

    const CardImg = styled.section.attrs(props => ({
        image: props.image
    }))`
    display: flex;
    align-items: center;
    width: 80%;
    height:77px;
    border-radius: 12px;
    background-image: url(${props => props.image})!important;
    background-size: cover;
    background-position: center;

    `;
    const CardIcon = styled.section`
    width: 20%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: #212135;
    border-radius: 12px;
    `;

    const HeartIcon = styled(Heart)`
    width: 40px;
    height: 40px;
    color: #FFFFFF;
    background-color: transparent;
    `

    const CloseIcon = styled(CloseOutline)`
    width: 40px;
    height: 40px;
    color: #FFFFFF;
    background-color: transparent;
    `;

    const ArrowBackIcon = styled(ArrowBack)`
    margin-top: 28px;
    width: 40px;
    height: 40px;
    color: #FFFFFF;
    `;

    const SportTitle = styled.h2`
    margin-left: 15px;
    background-color: transparent;
    color: #FEFEFE;
    font-size: 24px;
    `;

    useEffect(() => {
        fetchSports();
    }, [])

    const displayList = (sport) => {
        let like = isLiked(sport.id);
        return (
            <Card>
                <CardImg image={sport.imageUrl} onClick={() => navigateToDetails(sport.id)}>
                    <SportTitle>{sport.name}</SportTitle>
                </CardImg>
                <CardIcon>
                    {like?<HeartIcon/>:<CloseIcon/>}
                </CardIcon>
            </Card>
        )
    }

    const navigateToDetails = (id) => {
        navigate(`/details/${id}`);
    }

    const fetchSports = async () => {
        try {
            const { data } = await utilityApi.getSports();
            let likes = []
            for(let i=0;i<data.length;i++){
                let like = await fetchLike(data[i].id);
                likes.push(like)
            }
            setLikes(likes)
            setSports(data)
        } catch (error) {
            alert(error);
        }
    };

  const fetchLike=async(id)=>{
    let data = {
      docId:"",
      liked:true,
      sportId:id
    }
    try {
      const querySnapshot = await getDocs(collection(db, "likes"));
      querySnapshot.forEach((doc) => {
        if (id == doc.data().sportId) {
          data.docId = doc.id;
          data.liked = doc.data().liked
          data.sportId = doc.data().sportId
          return;
        }
      });
      return data;
    } catch (e) {
      console.error("Error finding like: ", e);
      return data;
    }
  }

  const isLiked = (sportId) =>{
      let like = likes.find(like=>like.sportId == sportId)
      return like?like.liked:false;
  }

    return (
        <>
            <GlobalStyle />
            <Wrapper>
                <ArrowBackIcon onClick={() => navigate(-1)} />
                <Title>History</Title>
                <Body> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Body>
                <Body> 17 December</Body>
                { sports.map((sport)=>{
                    return displayList(sport)
                })}
            </Wrapper>
            <div style={{ height: 110 }}></div>
            <Footer />
        </>
    );
}

export default History; 