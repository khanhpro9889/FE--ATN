import React, {useState} from 'react';
import './App.css';
import NavBar from './navigation/NavBar';
import Footer from './components/Footer';
import Wrapper from './components/Wrapper';
import ChatFrame from './components/ChatFrame';
import ChatBtn from './components/ChatBtn';
import Routes from './routers';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { connect } from 'react-redux';
import { close, open } from './store/ChatFrame/ChatFrameAction';
import 'animate.css/animate.css';
import {
  faEnvelope,
  faMobileAlt,
  faMapMarkerAlt,
  faStar,
  faPen,
  faAngleUp,
  faAngleDown,
  faBars,
  faChevronRight,
  faChevronDown,
  faChevronUp,
  faEyeSlash,
  faEye,
  faTimes,
  faDumbbell,
  faSearch,
  faHome,
  faSignOutAlt,
  faSignInAlt,
  faMedal,
  faPlusCircle,
  faListOl,
  faComments,
  faUpload,
  faCamera,
  faFolderOpen, 
  faTrash, 
  faMapMarked, 
  faPhone, 
  faSms, 
  faThumbsUp, 
  faReply, 
  faEllipsisV, 
  faDollarSign, 
  faInfoCircle, 
  faChevronLeft, 
  faPaperPlane, 
  faCheckCircle, 
  faBriefcase, 
  faUser,
  faHeart,
  faGlobeAsia,
  faClock,
  faBell,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons'
import { faStar as fasStar, faHeart as faHeart1 } from '@fortawesome/free-regular-svg-icons'
import ImageView from './components/ImageView';
import 'animate.css/animate.css';
import ScrollToTopAfterChangePage from './utils/router/ScrollToTopAfterChangePage';

library.add(
  faPen,
  fasStar,
  faEnvelope,
  faMobileAlt,
  faMapMarkerAlt,
  faStar,
  faAngleUp,
  faBars,
  faChevronRight,
  faAngleDown,
  faChevronDown,
  faChevronUp,
  faEyeSlash,
  faEye,
  faTimes,
  faDumbbell,
  faSearch,
  faHome,
  faSignOutAlt,
  faSignInAlt,
  faMedal,
  faPlusCircle,
  faListOl,
  fab,
  faComments,
  faUpload,
  faCamera,
  faFolderOpen,
  faTrash,
  faMapMarked,
  faPhone,
  faSms,
  faThumbsUp,
  faReply,
  faEllipsisV,
  faInfoCircle,
  faDollarSign,
  faChevronLeft,
  faPaperPlane,
  faCamera,
  faCheckCircle,
  faBriefcase,
  faUser,
  faHeart,
  faHeart1,
  faGlobeAsia,
  faClock,
  faEye,
  faBell,
  faTimesCircle
)


function App({open, openChatFrame, closeChatFrame, userProfile, conversation}) {
  const [src, setSrc] = useState(null);

  return (
      <>
        <ScrollToTopAfterChangePage>
          <Wrapper>
            <NavBar />
            <Routes />
            <Footer />
            {userProfile && open && <ChatFrame conversation={conversation} uid={userProfile._id} closeChatFrame={closeChatFrame} setSrc={setSrc}/>}
            {userProfile && !open && <ChatBtn uid={userProfile._id} openChatFrame={openChatFrame}/>}
            <ImageView src={src} setSrc={setSrc}/>
          </Wrapper>
        </ScrollToTopAfterChangePage>
      </>
  );
}

const mapStateToProps = (state) => {
  return {
      open: state.ChatFrameReducer.open,
      userProfile: state.ProfileReducer.userProfile,
      conversation: state.ChatFrameReducer.conversation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      openChatFrame: () => {
        dispatch(open());
      },
      closeChatFrame: () => {
        dispatch(close());
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
