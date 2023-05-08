import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import styled, { createGlobalStyle } from "styled-components";
import Footer from '../../components/Footer/Footer';
import { Heart } from '@styled-icons/evaicons-solid/Heart'
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';
import { Moon } from '@styled-icons/entypo/Moon';
import { CloudSunFill } from '@styled-icons/bootstrap/CloudSunFill';
import { db } from "../../firebase"
import { addDoc, collection, getDocs, updateDoc, doc } from "firebase/firestore";

import API from '../../API';

const Details = ({ themeToggler }) => {
  const { id } = useParams();
  const [sport, setSport] = useState(null);
  const [like, setLike] = useState({
    docId:"",
    liked:true
  });
  const { utilityApi } = API;
  const darkMode = true;

  const GlobalStyle = createGlobalStyle`
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    body, html, #root {
      height: 100%;
      font-family: -apple-system, Ubuntu , BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;;
    }
  `;

  const Wrapper = styled.section.attrs(props => ({
    image: props.image
  }))`
    display: flex;
    flex-direction: column-reverse;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    height: 63%;
    width: 100%;
    border-bottom-left-radius: 32px;
    border-bottom-right-radius: 32px;
  `;

  const DivImg = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 100px;
  background: linear-gradient(360deg, #000000 0%, #000000 58.85%, rgba(0, 0, 0, 0) 100%);
  border-radius: 0px 0px 32px 32px;
  ;`

  const SportTitle = styled.h2`
      font-family: 'DM Sans';
      font-style: normal;
      font-weight: 700;
      font-size: 34px;
      line-height: 41px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      margin-left: 21px;
      margin-bottom: 26px;
      color: #FEFEFE;
      background-color: transparent;
    `;

  const BtnsContainer = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 17%
  `;

  const CircleButton = styled.button.attrs((props)=>({
    background: props.background
  }))`
  margin-right: 11px;
  margin-left: 11px;
  padding: 10px;
  height: 51px;
  width: 51px;
  background:  ${props=>props.background}#;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.08);
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  &:hover {
    height: 81px;
    width: 81px;
    background: linear-gradient(#236BFE, 100%, #063BA8 100%);

  }
  `;

  const HeartIcon = styled(Heart)`
  width: 19.43px;
  height: 19.43px;
  color: #FFFFFF;
  background-color: transparent;
  &:hover {
    height: 36.45px;
    width: 34.63px;
    background: linear-gradient(#236BFE, 100%, #063BA8 100%);
  }
  `
  const CloseIcon = styled(CloseOutline)`
    width: 19.43px;
    height: 19.43px;
    color: #FFFFFF;
    background-color: transparent;
    &:hover {
    height: 36.45px;
    width: 34.63px;
    background: linear-gradient(#236BFE, 100%, #063BA8 100%);
  }
  `;

  const ModeDark = styled(CloudSunFill)`
  position: absolute;
  top: 22px;
  left: 21px;
  height: 59px;
  width: 59px;
  border: none;
  cursor: pointer;
  padding: 10px;
  color: #FFFFFF;
  border-radius: 16px;
  background-color: "#1F1F31";
`;

  const lightMode = styled(Moon)`
position: absolute;
top: 22px;
left: 21px;
height: 59px;
width: 59px;
border: none;
cursor: pointer;
padding: 10px;
color: #F2CC4C;
border-radius: 16px;
background: #FFFFFF;
`;

  useEffect(() => {
    fetchSports();
  }, [])


  const fetchSports = async () => {
    try {
      const { data } = await utilityApi.getSport(id);
      setSport(data);
      const likes = await fetchLike(data.id)
      setLike(likes)
    } catch (error) {
      alert(error);
    }
  };

  const fetchLike=async(id)=>{
    let data = {
      docId:"",
      liked:true
    }
    try {
      const querySnapshot = await getDocs(collection(db, "likes"));
      querySnapshot.forEach((doc) => {
        console.log(id == doc.data().sportId)
        if (id == doc.data().sportId) {
          data.docId = doc.id;
          data.liked = doc.data().liked
          return;
        }
      });
      return data;
    } catch (e) {
      console.error("Error finding like: ", e);
      return data;
    }
  }

  const likeSport = async (id, liked) => {
    let data = await fetchLike(id);
    try {
      if (data.docId != '') {
        let docReference = doc(db, "likes", data.docId)
        console.log("Like updated with ID: ", data.docId, liked);
        await updateDoc(docReference, { liked: liked })
      }
      else {
        let like = {
          sportId: id,
          liked: liked
        }
        setLike(like)
        const docRef = await addDoc(collection(db, "likes"), like);
        console.log("Like written with ID: ", docRef.id, liked);
      }
    } catch (e) {
      console.error("Error adding like: ", e);
    }
  }

  return (
    <>
      <GlobalStyle />
      {sport && <>
        <Wrapper image={sport.imageUrl}>
          {darkMode ? <ModeDark onClick={() => themeToggler()} /> : <lightMode onClick={() => themeToggler()} />}
          <DivImg>
            <SportTitle>{sport.name}</SportTitle>
          </DivImg>
        </Wrapper>
        <BtnsContainer>
          <CircleButton background={like?.liked == false?"linear-gradient(#236BFE, 100%, #063BA8 100%);":"222243"} onClick={() => likeSport(sport.id, false)}>
            <CloseIcon />
          </CircleButton>
          <CircleButton background={like?.liked == true?"linear-gradient(#236BFE, 100%, #063BA8 100%);":"222243"} onClick={() => likeSport(sport.id, true)}>
            <HeartIcon />
          </CircleButton>
        </BtnsContainer>
      </>
      }
      <Footer />
    </>
  );
}

export default Details; 