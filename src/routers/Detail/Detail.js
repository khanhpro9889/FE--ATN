import React, {useState, useEffect}from 'react';
import {
  FacebookShareButton
} from "react-share";
import { 
  Wrapper, 
  Body, 
  Left, 
  Right,
  SubTitle,
  Icon,
  Date,
  Name,
  Content,
  ReviewTablet,
  MarginTop,
  Title,
  Host,
  NameHost,
  ProfileImage,
  FloatLeft,
  ClearFix,
  IconLeft,
  NameUtil,
  Top,
  TitleWrapper,
  Save,
  LeftTitle
} from './styles';
import Boxed from '../../components/Boxed';
//import ImageGallery from 'react-image-gallery';
import { useParams } from 'react-router-dom';
import "react-image-gallery/styles/css/image-gallery.css";
import ReviewInfo from '../../components/ReviewInfo';
import { getOneGym } from '../../api/gymApi';
import { parseDate } from '../../utils/date';
import MyButton from '../../components/MyButton'
import ReviewItem from '../../components/ReviewItem/ReviewItem';
import { connect } from 'react-redux';
import ServiceItem from '../../components/ServiceItem';
import ImageGallery from '../../components/ImageGallery'
import LoadingSpinner from '../../components/LoadingSpinner';
import { addConversationStore, open } from '../../store/ChatFrame/ChatFrameAction';
import { addConversation } from '../../api/conversationApi';
import { Link } from 'react-router-dom';
import { addSave, getSavesByUser, deleteSave } from '../../api/saveApi';

const Detail = ({profile, addConversationStore, openChatFrame}) => {
  const { id } = useParams();
  const [gym, setGym] = useState(null);
  const [services, setServices] = useState([]);
  const [isSaved, setIsSaved] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getOneGym(id);
      setGym(res.gym);
      setServices(res.services);
    }
    fetchData();
    if (profile) {
      getSavesByUserApi(profile._id);
    }
  }, [id, profile])

  const getSavesByUserApi = async (uid) => {
    try {
      const res = await getSavesByUser(uid);
      const finded = res.saves.find(s => s.gym._id === id);
      if (finded) {
        setIsSaved(finded);
      } else {
        setIsSaved(null);
      }
    } catch(err) {
      console.log(err);
    }
  }

  const handleClickChat = async () => {
    try {
      const res = await addConversation({
        user1: profile._id,
        user2: gym.createBy._id,
        gym: gym._id
      });
      addConversationStore(res.conversation);
      openChatFrame();
    } catch (err) {
      console.log(err);
    }
  }

  const addSaveApi = async () => {
    try {
      const res = await addSave({gym: gym._id, user: profile._id});
      getSavesByUserApi(profile._id);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteSaveApi = async () => {
    try {
      const res = await deleteSave(isSaved._id);
      getSavesByUserApi(profile._id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <Wrapper>
        <Boxed>
            {gym && <Top>
              <TitleWrapper>
                <Title>{gym.title}</Title>
                <Date>Ngày đăng: {parseDate(gym.createAt)}</Date>
              </TitleWrapper>
              <LeftTitle>
                {!isSaved ? 
                  <Save onClick={() => addSaveApi()}>
                    <Icon icon={['far', 'heart']}/> <u>Lưu</u>
                  </Save> : 
                  <Save onClick={() => deleteSaveApi()}>
                    <Icon icon={['fas', 'heart']}/> <u>Hủy lưu</u>
                  </Save>
                }
                <FacebookShareButton url={window.location.href}>
                  <Icon icon={['fab', 'facebook']}/> <u>Share</u>
                </FacebookShareButton>
              </LeftTitle>
            </Top>}
          <br />
          {!gym ? <LoadingSpinner /> : <ImageGallery images={gym.gallery}/>}
        </Boxed>

        <Boxed>
          <Body>
            <Left>
              {gym && 
              <>
              <Host>
                <NameHost>Được đăng bởi {gym.createBy.name}</NameHost>
                <Link to={`/profile/${gym.createBy._id}`}><ProfileImage src={gym.createBy.profileImg}/></Link>
              </Host>
              <Name>Thông tin liên hệ</Name>
              <SubTitle>
                <Icon icon={['fas', 'map-marked']} /> {gym.address}, {gym.district.path_with_type}
              </SubTitle>
              <SubTitle>
                <Icon icon={['fab', 'facebook']} /> Facebook page
              </SubTitle>
              <SubTitle>
                <Icon icon={['fas', 'phone']} /> {gym.phone}
              </SubTitle>
              {(profile && (profile._id !== gym.createBy._id)) && 
                <MyButton text="Chat now" icon={['fas', 'sms']} onClick={handleClickChat}/>}
              {!profile && 'Đăng nhập để chat'}
              <Name>Giới thiệu</Name>
              <Content dangerouslySetInnerHTML={{ __html: gym.content }} /></>}
              <Name>Dịch vụ</Name>
              {services.map(item => {
                return <MarginTop key={item._id}>
                      <ServiceItem serviceItem={item} deleteItem={false}/>
                  </MarginTop>
              })}
              <Name>Các tiện ích</Name>
              <ClearFix>
                {gym && gym.utilities.map(({utility}) => {
                  return (
                    <FloatLeft key={utility._id}>
                      <IconLeft>
                        <Icon icon={['fas', 'check-circle']} />
                      </IconLeft>
                      <NameUtil>{utility.name}</NameUtil>
                    </FloatLeft>
                  )
                })}
              </ClearFix>
              <Name>Nhận xét và đánh giá</Name>
              <ReviewTablet><ReviewInfo /></ReviewTablet>
              <ReviewItem isReply={false}/>
              <ReviewItem isReply={true}/>
            </Left>
            <Right>
              <ReviewInfo />
            </Right>
          </Body>
        </Boxed>
      </Wrapper>
    );
};

const mapStateToProps = (state) => {
  return {
      profile: state.ProfileReducer.userProfile,
      coversation: state.ChatFrameReducer.coversation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      openChatFrame: () => { dispatch(open()) },
      addConversationStore: (conversation) => { dispatch(addConversationStore(conversation)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);