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
  LeftTitle,
  StyledSelect,
  FilterReview,
  WrapperDialog,
  FlexBox,
  RightMap,
  LeftMap,
  Item,
  LeftDiv,
  RightDiv,
  Times,
  View,
  Element,
  FlexBox1
} from './styles';
import Boxed from '../../components/Boxed';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useParams } from 'react-router-dom';
import "react-image-gallery/styles/css/image-gallery.css";
import ReviewInfo from '../../components/ReviewInfo';
import { getOneGym, getRelativeGym } from '../../api/gymApi';
import { parseDate } from '../../utils/date';
import MyButton from '../../components/MyButton'
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import ServiceItem from '../../components/ServiceItem';
import ImageGallery from '../../components/ImageGallery'
import LoadingSpinner from '../../components/LoadingSpinner';
import { addConversationStore, open } from '../../store/ChatFrame/ChatFrameAction';
import { addConversation } from '../../api/conversationApi';
import { Link } from 'react-router-dom';
import { addSave, getSavesByUser, deleteSave } from '../../api/saveApi';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import ReviewBox from '../../components/ReviewBox/ReviewBox';
import { getReviewsByGym, addReview, deleteReview, updateReview } from '../../api/reviewApi';
import { Marker, Popup, TileLayer, Map } from "react-leaflet";
import { HOME_PATH } from '../../constants/Path';
import { useHistory } from 'react-router-dom';
import FixedLoadingSpinner from '../../components/FixedLoadingSpinner';
import GymItemV2 from '../../components/GymItemV2';
import Avatar from '../../assets/images/avatar.jpg';

const Detail = ({profile, addConversationStore, openChatFrame}) => {
  const { id } = useParams();
  const [gym, setGym] = useState(null);
  const [isSaved, setIsSaved] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [filterReview, setFilterReview] = useState([]);
  const [noReview, setNoReview] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(-1);
  const [filterStars, setFilterStars] = useState([]);
  const [reviewToEdit, setReviewToEdit] = useState(null);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [relative, setRelative] = useState([]);

  useEffect(() => {
    if (profile) {
      getSavesByUserApi(profile._id);
    }
    getReviewByGymApi(id)
     // eslint-disable-next-line
  }, [id, profile])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getOneGym(id);
      setLoading(false);
      if (!res.gym.complete) {
        return history.push(HOME_PATH);
      }
      setGym(res.gym);
    }
    fetchData();
     // eslint-disable-next-line
  }, [id, history])

  useEffect(() => {
    setFilterStars([...new Set([...reviews.sort((a, b) => a.rating > b.rating).map((item) => {return item.rating})])]);
  }, [reviews])

  useEffect(() => {
    const getRelative = async () => {
      const res = await getRelativeGym(gym.addresses.district.code);
      const filtered =  res.gyms.filter(item => item._id !== id);
      if (filtered.length >= 2) {
        setRelative([filtered[0], filtered[1]]);
      } else {
        if (filtered.length === 0) {
          setRelative([]);
        } else {
          setRelative([filtered[0]]);
        }
      }
    }
    if (gym) {
      getRelative();
    }
  }, [gym, id])

  const getSavesByUserApi = async (uid) => {
    const res = await getSavesByUser(uid);
    const finded = res.saves.map(item => {
      return {
          ...item._doc.gym,
          reviews: item.reviews
      }
    }).find(s => s._id === id);
    if (finded) {
      setIsSaved(finded);
    } else {
      setIsSaved(null);
    }
  }

  const handleClickChat = async () => {
    const res = await addConversation({
      user1: profile._id,
      user2: gym.createBy._id,
      gym: gym._id
    });
    addConversationStore(res.conversation);
    openChatFrame();
  }

  const addSaveApi = async () => {
    setLoading(true);
    const res = await addSave({gym: gym._id, user: profile._id});
    setLoading(false);
    if (res) {}
    getSavesByUserApi(profile._id);
  }

  const deleteSaveApi = async () => {
    setLoading(true);
    const res = await deleteSave(isSaved._id);
    setLoading(false);
    if (res) {}
    getSavesByUserApi(profile._id);
  }

  const handleAddReview = async (value) => {
    setLoading(true);
    const res = await addReview({...value, gym: id, user: profile._id, gymHost: gym.createBy._id});
    setLoading(false);
    if (res) {}
    getReviewByGymApi(id);
  }

  const handleEditReview = async (value, idReview) => {
    setLoading(true);
    const res = await updateReview(idReview, {...value, gym: id, user: profile._id});
    setLoading(false);
    if (res) {}
    setReviewToEdit(null);
    getReviewByGymApi(id);
  }

  const getReviewByGymApi = async (id) => {
    const res = await getReviewsByGym(id);
    if (profile) {
      const findedReview = res.reviews.find(item => item.author._id === profile._id);
      if (findedReview) {
        setNoReview(true);
      } else {
        setNoReview(false);
      }
    }
    setReviews(res.reviews);
    setFilterReview(res.reviews);
  }

  const handleDeleteReview = async (reviewId) => {
    setLoading(true);
    const res = await deleteReview(reviewId);
    setLoading(false);
    if (res) {}
    getReviewByGymApi(id, profile)
  }

  const handleAfterAddReply = (idReview) => {
    setReviews(reviews.map(item => {
      if (item._id.toString() === idReview.toString()) {
        return {
          ...item,
          replyQuantity: item.replyQuantity + 1
        }
      }
      return item;
    }))
    setFilterReview(filterReview.map(item => {
      if (item._id.toString() === idReview.toString()) {
        return {
          ...item,
          replyQuantity: item.replyQuantity + 1
        }
      }
      return item;
    }));
  }

  const handleAfterDeleleReply = (idReview) => {
    setReviews(reviews.map(item => {
      if (item._id.toString() === idReview.toString()) {
        console.log('aa')
        return {
          ...item,
          replyQuantity: item.replyQuantity - 1
        }
      }
      return item;
    }))
    setFilterReview(filterReview.map(item => {
      if (item._id.toString() === idReview.toString()) {
        console.log('aa')
        return {
          ...item,
          replyQuantity: item.replyQuantity - 1
        }
      }
      return item;
    }));
  }

  return (
    <>
      {loading && <FixedLoadingSpinner />}
      <Wrapper>
        <Boxed>
            {gym && <Top>
              <TitleWrapper>
                <Title>{gym.title}</Title>
                <Date>Ngày đăng: {parseDate(gym.createAt)}</Date>
              </TitleWrapper>
              <LeftTitle>
                {profile && (!isSaved ? 
                  <Save onClick={() => addSaveApi()}>
                    <Icon icon={['far', 'heart']}/> <u>Lưu</u>
                  </Save> : 
                  <Save onClick={() => deleteSaveApi()}>
                    <Icon icon={['fas', 'heart']}/> <u>Hủy lưu</u>
                  </Save>
                )}
                <FacebookShareButton url={window.location.href}>
                  <Icon icon={['fab', 'facebook']}/> <u>Share</u>
                </FacebookShareButton>
                <View><Icon icon={['fas', 'eye']} /> {gym.totalViews} lượt xem</View>
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
                <Link to={`/profile/${gym.createBy._id}`}><ProfileImage src={gym.createBy.profileImg || Avatar}/></Link>
              </Host>
              <Name>Thông tin</Name>
              <SubTitle>
                <Icon icon={['fas', 'map-marked']} />Địa chỉ: {gym.addresses.address}, {gym.addresses.district.path_with_type}
              </SubTitle>
              {
                gym.facebooks.map((item) => {
                  return (
                    <SubTitle key={item._id}>
                      <Icon icon={['fas', 'globe-asia']} /> <a href={item.web}>{item.web}</a>
                    </SubTitle>
                  )
                })
              }
              <SubTitle>
                <Icon icon={['fas', 'phone']} /> 
                {gym.phones.map(item => {
                  return (<span key={item._id}>
                    {item.phone}  
                  </span>)
                })}
              </SubTitle>
              <Times>
                <LeftDiv>
                  <Icon icon={['fas', 'clock']} />Giờ mở cửa:
                </LeftDiv>
                <RightDiv>
                  {gym.times.map(item => {
                    if (item.fromDay === item.toDay)
                      return (<span key={item._id}>
                        {item.fromDay}: {item.openTime} - {item.closeTime} <br />
                      </span>)
                    return (<span key={item._id}>
                      {item.fromDay} - {item.toDay}: {item.openTime} - {item.closeTime} <br />
                    </span>)
                  })}
                  {gym.holiday ? 'Ngày lễ nghỉ' : 'Ngày lễ vẫn mở cửa'}
                </RightDiv>
              </Times>
              {(profile && (profile._id !== gym.createBy._id)) && 
                <MyButton text="Chat now" icon={['fas', 'sms']} onClick={handleClickChat}/>}
              {!profile && <h4>Đăng nhập để chat</h4>}
              <Name>Thông tin thêm</Name>
              <Content dangerouslySetInnerHTML={{ __html: gym.content }} /></>}
              {gym && gym.services.length > 0 && 
                <>
                  <Name>Các lớp học nhóm</Name>
                  {gym.services.map(item => {
                    return <MarginTop key={item._id}>
                          <ServiceItem serviceItem={item} deleteItem={false}/>
                      </MarginTop>
                  })}
                </>
              }         
              <Name>Các tiện ích</Name>
              <ClearFix>
                {gym && gym.utilities.map((item) => {
                  return (
                    <FloatLeft key={item._id}>
                      <IconLeft>
                        <Icon icon={['fas', 'check-circle']} />
                      </IconLeft>
                      <NameUtil>{item.utility.name}</NameUtil>
                    </FloatLeft>
                  )
                })}
              </ClearFix>
              <Name>Bản đồ</Name>
              {gym && <FlexBox>
                <LeftMap>
                  <Map center={[gym.addresses.lat, gym.addresses.lng]} zoom={15} scrollWheelZoom={false}>
                      <TileLayer
                          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={[gym.addresses.lat, gym.addresses.lng]}>
                          <Popup>
                              Your place
                          </Popup>
                      </Marker>
                  </Map>
                </LeftMap>
                <RightMap>
                  <Item>Tỉnh/thành: <span>{gym.addresses.province.name}</span></Item>
                  <Item>quận/huyện: <span>{gym.addresses.district.name}</span></Item>
                  <Item>Địa chỉ: <span>{gym.addresses.address}</span></Item>
                </RightMap>
              </FlexBox>}
              <Name>Nhận xét và đánh giá</Name>
              <ReviewTablet><ReviewInfo reviews={reviews}/></ReviewTablet>
              {profile && (!noReview && <ReviewForm onSubmit={handleAddReview}/>)}
              {filterReview.length > 0 ? <FilterReview>
                <StyledSelect
                  value={selectedFilter}
                  onChange={(e) => {
                    setSelectedFilter(e.target.value)
                    if (e.target.value === -1) {
                      return setFilterReview(reviews);
                    }
                    setFilterReview(reviews.filter(item => item.rating === e.target.value))
                  }}
                >
                  <MenuItem value={-1}>Lọc theo số sao</MenuItem>
                  {filterStars && filterStars.map((item) => {
                    return (
                      <MenuItem key={item} value={item}>{item} sao</MenuItem>
                    )
                  })}
                </StyledSelect>
              </FilterReview> : <><h3>Chưa có đánh giá nào</h3><br /></>}
              {filterReview && filterReview.map((item) => {
                return (<ReviewBox
                  handleAfterDeleleReply={handleAfterDeleleReply}
                  handleAfterAddReply={handleAfterAddReply}
                  openEditDialog={() => {
                    setReviewToEdit(item);
                  }}
                  reviewUser={item.author._id}
                  gym={gym}
                  author={profile}
                  deleteReview={() => handleDeleteReview(item._id)} 
                  key={item._id} 
                  review={item} 
                />)
              })}
            </Left>
            <Right>
              <ReviewInfo reviews={reviews}/>
            </Right>
          </Body>
        </Boxed>
      </Wrapper>
      {gym && relative.length > 0 && <>
          <Boxed>
            <Name>Phòng tập cũng ở {gym.addresses.district.name}</Name>
            <FlexBox1>
              {relative.map(item => {
                return (
                  <Element key={item._id} >
                    <GymItemV2 gym={item} />
                  </Element>
                )
              })}
            </FlexBox1>
          </Boxed>
        </>
      }
      
      {/* dialog edit review */}
      <Dialog
          open={reviewToEdit ? true : false}
          onClose={() => setReviewToEdit(null)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
          <WrapperDialog>
              <DialogTitle id="alert-dialog-title">Sửa đánh giá</DialogTitle>
              <DialogContent>
                  <ReviewForm cancel={() => setReviewToEdit(null)} review={reviewToEdit} onSubmit={handleEditReview}/>
              </DialogContent>
          </WrapperDialog>
      </Dialog>
    </>
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