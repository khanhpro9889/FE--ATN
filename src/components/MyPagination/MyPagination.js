import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { Wrapper } from './styles';

const MyPagination = ({totalPage, currentPage, onChange}) => {
    return (
        <Wrapper>
            <Pagination count={totalPage} page={currentPage} onChange={onChange}/>
        </Wrapper>
    );
};

export default MyPagination;