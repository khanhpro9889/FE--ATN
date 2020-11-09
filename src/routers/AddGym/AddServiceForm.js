import React, {useState}from 'react';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import unitPricing from '../../constants/unitPricing';
import { useForm } from 'react-hook-form';
import { FlexBox, FormService, FormLeft, FormRight, Textarea, SubmitButton } from './styles';
import MenuItem from '@material-ui/core/MenuItem';
import { validateNumber } from '../../utils/form';

const AddServiceForm = ({onAddService}) => {
    const [selectedUnitPricing, setSelectedUnitPricing] = useState(unitPricing[0].name);
    const {
        register,
        handleSubmit,
        errors,
        setValue,
    } = useForm({
        mode: 'onBlur',
        nativeValidation: false
    })

    const onSubmit = (value) => {
        onAddService({...value, unitPricing: selectedUnitPricing});
        setValue('name', '', {shouldValidate: false});
        setValue('description', '', {shouldValidate: false});
        setValue('price', '', {shouldValidate: false});
        setSelectedUnitPricing(unitPricing[0].name);
    }

    const handleChangeUnitPricing = (e) => {
        setSelectedUnitPricing(e.target.value);
    }

    return (
        <FormService>
            <TextField
                type="text"
                name="name"
                autoComplete="off"
                label="Tên dịch vụ"
                margin="normal"
                inputRef={register({
                    required: true
                })}
                error={errors.name}
                helperText={(errors.name &&
                    errors.name.type === 'required' &&
                    'Tên dịch vụ không được bỏ trống')}
            />
            <label>Mô tả</label>
            <Textarea
                rowsMin={5}
                aria-label="content"
                // defaultValue={event.content || null}
                name="description"
                ref={register}
            />
            <FlexBox>
                <FormLeft>
                    <TextField
                        type="text"
                        name="price"
                        autoComplete="off"
                        label="Giá tiền"
                        margin="normal"
                        inputRef={register({
                            required: true,
                            validate: validateNumber
                        })}
                        error={errors.price}
                        helperText={(errors.price &&
                            errors.price.type === 'required' &&
                            'Giá tiền không được bỏ trống') ||
                            (errors.price &&
                                errors.price.type === 'validate' &&
                                'Giá tiền không hợp lệ')}
                    />
                </FormLeft>
                <FormRight>
                    <label>Đơn giá</label>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="district"
                        onChange={handleChangeUnitPricing}
                        value={selectedUnitPricing}
                    >
                        {unitPricing && unitPricing.map(item => {
                            return <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                        })}
                    </Select>
                </FormRight>
            </FlexBox>
            <SubmitButton text="Thêm" onClick={handleSubmit(onSubmit)}/>
            
        </FormService>
    );
};

export default AddServiceForm;