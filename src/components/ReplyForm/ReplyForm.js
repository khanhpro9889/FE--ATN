import React, { useEffect } from 'react';
import { 
    Textarea, 
    Form, 
    Button, 
    WrapperButton, 
} from './styles';
import { useForm } from 'react-hook-form';

const ReplyForm = ({reply, onSubmit, replyToEdit, cancel}) => {
    const {
        register,
        handleSubmit,
        setValue
    } = useForm({
        mode: 'onBlur',
        nativeValidation: false
    })

    const handleAddReply = (value) => {
        if (replyToEdit) {
            return onSubmit(value, replyToEdit._id);
        }
        onSubmit(value);
        setValue('message', '');
    }

    useEffect(() => {
        if (replyToEdit)
            setValue('message', replyToEdit.body, {shouldValidate: false});
    }, [replyToEdit, setValue])

    return (
        <Form isEdit={replyToEdit ? true : false}>
            <Textarea
                rowsMin={2}
                aria-label="content"
                // defaultValue={event.content || null}
                name="message"
                ref={register}
            />
            <WrapperButton>
                <Button onClick={() => !replyToEdit ? reply() : cancel()} text="Hủy"/>
                    <Button 
                        icon={['fas', 'pen']} 
                        onClick={handleSubmit(handleAddReply)} 
                        text={replyToEdit ? 'Sửa trả lời' : "Trả lời"} 
                    />
            </WrapperButton>
        </Form>
    );
};

export default ReplyForm;