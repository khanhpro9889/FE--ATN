import React, { useState } from 'react';
import ReplyForm from '../ReplyForm';
import ReviewItem from '../ReviewItem/ReviewItem';
import { getRepliesByReview, addReply, deleteReply, updateReply } from '../../api/replyApi';
import { LoadingWrapper, WrapperDialog } from './styles';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FixedLoadingSpinner from '../../components/FixedLoadingSpinner';

const ReviewBox = ({
    review, 
    deleteReview, 
    author, 
    openEditDialog,
    gym, 
    reviewUser, 
    handleAfterAddReply,
    handleAfterDeleleReply
}) => {
    const [activeReply, setActiveReply] = useState(false);
    const [loading, setLoading] = useState(false);
    const [replies, setReplies] = useState([]);
    const [loading1, setLoading1] = useState(false);
    const [replyToEdit, setReplyToEdit] = useState(null);

    // useEffect(() => {
    //     getRepliesApi();
    // }, [review])

    const getRepliesApi = async () => {
        try {
            setLoading(true);
            const res = await getRepliesByReview(review._id);
            setReplies(res.replies);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const addReplyApi = async (value) => {
        try {
            setLoading1(true);
            const res = await addReply({...value, review: review._id, author: author._id, reviewUser, gym});
            if (res) {}
            handleAfterAddReply(review._id);
            getRepliesApi();
            setLoading1(false);
        } catch (error) {
            setLoading1(false);
            console.log(error);
        }
    }

    const handleEditReply = async (value, id) => {
        try {
            setLoading1(true);
            const res = await updateReply(id, {...value, review: review._id, author: author._id});
            if (res) {}
            getRepliesApi(review._id);
            setReplyToEdit(null);
            setLoading1(false);
        } catch (error) {
            setLoading1(false);
            console.log(error);
        }
    }

    const deleteReplyApi = async (id) => {
        try {
            setLoading1(true);
            const res = await deleteReply(id);
            setLoading1(false);
            if (res) {}
            handleAfterDeleleReply(review._id)
            const newReplies = replies.filter(item => item._id !== id);
            setReplies(newReplies);
        } catch (error) {
            setLoading1(false);
            console.log(error);
        }
    }

    return (
        <div>
            {loading1 && <FixedLoadingSpinner />}
            <ReviewItem 
                item={review} 
                del={deleteReview}
                isReply={false} 
                reply={() => {
                    getRepliesApi();
                    setActiveReply(!activeReply)
                }}
                openEditDialog={openEditDialog}
                //replies={replies}
                author={author}
                highlight={(author ? (author._id === review.author._id ? true : false) :false)}
            />
            {activeReply && (loading ? <LoadingWrapper>
                    <MiniLoadingSpinner />
                </LoadingWrapper> : (
                replies && replies.map(item => {
                    return (<ReviewItem 
                        author={author} 
                        key={item._id} 
                        isReply={true} 
                        item={item} 
                        del={() => deleteReplyApi(item._id)} 
                        openEditDialog={() => setReplyToEdit(item)}
                    />)
                }))
            )}
            {author && activeReply && 
                <ReplyForm onSubmit={addReplyApi} reply={() => setActiveReply(false)}/>
            }
                  {/* dialog edit reply */}
            <Dialog
                open={replyToEdit ? true : false}
                onClose={() => setReplyToEdit(null)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <WrapperDialog>
                    <DialogTitle id="alert-dialog-title">Sửa trả lời</DialogTitle>
                    <DialogContent>
                        <ReplyForm 
                            cancel={() => setReplyToEdit(null)} 
                            review={replyToEdit} 
                            onSubmit={handleEditReply}
                            replyToEdit={replyToEdit}
                        />
                    </DialogContent>
                </WrapperDialog>
            </Dialog>
        </div>
    );
};

export default ReviewBox;